#!/usr/bin/env python3
"""HTTP lead receiver that forwards validated website requests to Telegram."""

from __future__ import annotations

import cgi
import json
import logging
import mimetypes
import os
import threading
import time
import urllib.error
import urllib.request
import uuid
from collections import defaultdict, deque
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


HOST = os.getenv("HOST", "127.0.0.1")
PORT = int(os.getenv("PORT", "8787"))
BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "").strip()
CHAT_ID = os.getenv("TELEGRAM_CHAT_ID", "").strip()
DRY_RUN = os.getenv("DRY_RUN", "1").lower() in {"1", "true", "yes"}
MAX_REQUEST_BYTES = int(os.getenv("MAX_REQUEST_BYTES", str(20 * 1024 * 1024)))
MAX_FILE_BYTES = int(os.getenv("MAX_FILE_BYTES", str(15 * 1024 * 1024)))
ALLOWED_ORIGINS = {
    origin.strip()
    for origin in os.getenv(
        "ALLOWED_ORIGINS",
        "https://karkas-invest.ru,https://www.karkas-invest.ru",
    ).split(",")
    if origin.strip()
}

RATE_LIMIT_WINDOW = 10 * 60
RATE_LIMIT_REQUESTS = 5
RATE_LIMITS: dict[str, deque[float]] = defaultdict(deque)
RATE_LIMIT_LOCK = threading.Lock()

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(message)s",
)


def text_field(form: cgi.FieldStorage, name: str, limit: int = 2000) -> str:
    if name not in form:
        return ""
    item = form[name]
    if isinstance(item, list):
        item = item[0]
    value = item.value if getattr(item, "value", None) is not None else ""
    return str(value).strip()[:limit]


def client_is_rate_limited(client_ip: str) -> bool:
    now = time.monotonic()
    with RATE_LIMIT_LOCK:
        requests = RATE_LIMITS[client_ip]
        while requests and now - requests[0] > RATE_LIMIT_WINDOW:
            requests.popleft()
        if len(requests) >= RATE_LIMIT_REQUESTS:
            return True
        requests.append(now)
        return False


def telegram_request(method: str, data: bytes, content_type: str) -> None:
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/{method}"
    request = urllib.request.Request(
        url,
        data=data,
        method="POST",
        headers={"Content-Type": content_type, "Accept": "application/json"},
    )
    with urllib.request.urlopen(request, timeout=20) as response:
        payload = json.loads(response.read().decode("utf-8"))
    if not payload.get("ok"):
        raise RuntimeError("Telegram API rejected the request")


def send_text(message: str) -> None:
    payload = json.dumps({"chat_id": CHAT_ID, "text": message}).encode("utf-8")
    telegram_request("sendMessage", payload, "application/json")


def send_document(message: str, filename: str, contents: bytes, mime_type: str) -> None:
    boundary = f"----karkas-{uuid.uuid4().hex}"
    parts: list[bytes] = []

    for name, value in {"chat_id": CHAT_ID, "caption": message[:1024]}.items():
        parts.extend(
            [
                f"--{boundary}\r\n".encode(),
                f'Content-Disposition: form-data; name="{name}"\r\n\r\n'.encode(),
                str(value).encode("utf-8"),
                b"\r\n",
            ]
        )

    safe_filename = Path(filename).name.replace('"', "") or "drawing"
    parts.extend(
        [
            f"--{boundary}\r\n".encode(),
            (
                'Content-Disposition: form-data; name="document"; '
                f'filename="{safe_filename}"\r\n'
            ).encode("utf-8"),
            f"Content-Type: {mime_type}\r\n\r\n".encode(),
            contents,
            b"\r\n",
            f"--{boundary}--\r\n".encode(),
        ]
    )
    telegram_request(
        "sendDocument",
        b"".join(parts),
        f"multipart/form-data; boundary={boundary}",
    )


def format_lead(form: cgi.FieldStorage) -> str:
    fields = [
        ("Новая заявка с сайта", ""),
        ("Имя", text_field(form, "name", 160)),
        ("Компания", text_field(form, "company", 200)),
        ("Телефон", text_field(form, "phone", 80)),
        ("Направление", text_field(form, "service", 240)),
        ("Задача", text_field(form, "details", 2500)),
        ("Страница", text_field(form, "page_url", 500)),
        ("Источник", text_field(form, "utm_source", 180)),
        ("Кампания", text_field(form, "utm_campaign", 240)),
        ("Запрос", text_field(form, "utm_term", 240)),
        ("yclid", text_field(form, "yclid", 200)),
    ]
    lines = [fields[0][0]]
    lines.extend(f"{label}: {value}" for label, value in fields[1:] if value)
    return "\n".join(lines)


class LeadHandler(BaseHTTPRequestHandler):
    server_version = "KarkasLeadReceiver/1.0"

    def log_message(self, message: str, *args: object) -> None:
        logging.info("%s %s", self.address_string(), message % args)

    def origin_is_allowed(self) -> bool:
        origin = self.headers.get("Origin", "")
        return not origin or origin in ALLOWED_ORIGINS

    def send_json(self, status: int, payload: dict[str, object]) -> None:
        data = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Cache-Control", "no-store")
        origin = self.headers.get("Origin", "")
        if origin in ALLOWED_ORIGINS:
            self.send_header("Access-Control-Allow-Origin", origin)
            self.send_header("Vary", "Origin")
        self.end_headers()
        self.wfile.write(data)

    def do_OPTIONS(self) -> None:
        if not self.origin_is_allowed():
            self.send_json(403, {"success": False, "message": "Origin is not allowed"})
            return
        self.send_response(204)
        origin = self.headers.get("Origin", "")
        if origin in ALLOWED_ORIGINS:
            self.send_header("Access-Control-Allow-Origin", origin)
            self.send_header("Vary", "Origin")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Accept")
        self.send_header("Access-Control-Max-Age", "86400")
        self.end_headers()

    def do_GET(self) -> None:
        if self.path != "/health":
            self.send_json(404, {"success": False})
            return
        self.send_json(
            200,
            {
                "status": "ok",
                "telegram_configured": bool(BOT_TOKEN and CHAT_ID),
                "dry_run": DRY_RUN,
            },
        )

    def do_POST(self) -> None:
        if self.path != "/api/leads":
            self.send_json(404, {"success": False})
            return
        if not self.origin_is_allowed():
            self.send_json(403, {"success": False, "message": "Origin is not allowed"})
            return

        client_ip = self.headers.get("X-Forwarded-For", self.client_address[0]).split(",")[0].strip()
        if client_is_rate_limited(client_ip):
            self.send_json(429, {"success": False, "message": "Слишком много запросов"})
            return

        content_length = int(self.headers.get("Content-Length", "0") or 0)
        if content_length <= 0 or content_length > MAX_REQUEST_BYTES:
            self.send_json(413, {"success": False, "message": "Некорректный размер заявки"})
            return
        if not self.headers.get("Content-Type", "").startswith("multipart/form-data"):
            self.send_json(415, {"success": False, "message": "Ожидается multipart/form-data"})
            return

        form = cgi.FieldStorage(
            fp=self.rfile,
            headers=self.headers,
            environ={
                "REQUEST_METHOD": "POST",
                "CONTENT_TYPE": self.headers.get("Content-Type", ""),
                "CONTENT_LENGTH": str(content_length),
            },
            keep_blank_values=True,
        )

        if text_field(form, "website", 100):
            self.send_json(400, {"success": False})
            return

        required = {
            "name": text_field(form, "name", 160),
            "phone": text_field(form, "phone", 80),
            "service": text_field(form, "service", 240),
            "consent": text_field(form, "consent", 20),
        }
        if not all(required.values()):
            self.send_json(422, {"success": False, "message": "Заполните обязательные поля"})
            return

        if DRY_RUN or not BOT_TOKEN or not CHAT_ID:
            self.send_json(
                503,
                {"success": False, "message": "Доставка заявки временно не настроена"},
            )
            return

        message = format_lead(form)
        try:
            drawing = form["drawing"] if "drawing" in form else None
            if isinstance(drawing, list):
                drawing = drawing[0]
            if drawing is not None and getattr(drawing, "filename", ""):
                contents = drawing.file.read(MAX_FILE_BYTES + 1)
                if len(contents) > MAX_FILE_BYTES:
                    self.send_json(413, {"success": False, "message": "Файл больше 15 МБ"})
                    return
                mime_type = drawing.type or mimetypes.guess_type(drawing.filename)[0] or "application/octet-stream"
                send_document(message, drawing.filename, contents, mime_type)
            else:
                send_text(message)
        except (urllib.error.URLError, TimeoutError, RuntimeError, ValueError):
            logging.error("Telegram delivery failed without logging lead contents or credentials")
            self.send_json(502, {"success": False, "message": "Telegram временно недоступен"})
            return

        self.send_json(200, {"success": True})


if __name__ == "__main__":
    logging.info(
        "Starting lead receiver on %s:%s (dry_run=%s, telegram_configured=%s)",
        HOST,
        PORT,
        DRY_RUN,
        bool(BOT_TOKEN and CHAT_ID),
    )
    ThreadingHTTPServer((HOST, PORT), LeadHandler).serve_forever()
