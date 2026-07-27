#!/usr/bin/env python3
"""
Собирает отчёт по кампании БНС из Яндекс Директа и Яндекс Метрики
и пишет public/report/data.json.

Запускается из GitHub Actions по расписанию.
Токены берутся из переменных окружения (GitHub Secrets):
    YANDEX_DIRECT_TOKEN   — OAuth-токен с доступом к API Директа
    YANDEX_METRIKA_TOKEN  — OAuth-токен с доступом к API Метрики
                            (может быть тем же самым, если у приложения обе роли)

Скрипт устойчив к сбоям: если один источник недоступен, отчёт всё равно
собирается из второго, а в notes попадает пометка о проблеме.
"""

from __future__ import annotations

import csv
import io
import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import date, datetime, timedelta, timezone

# ─────────────────────────── настройки ───────────────────────────

CAMPAIGN_ID = "712813448"
CAMPAIGN_NAME = "БНС | Краснодарский край | Поиск | ЕПК"
COUNTER_ID = "110755114"
CLIENT_LOGIN = "radzun-da"

BUDGET_WEEK = 10000
CPC_CAP = 220
GEO = "Краснодарский край"
SCHEDULE = "Круглосуточно, 7 дней в неделю"

GOALS = [
    (584981732, "Успешная заявка"),
    (584982228, "Клик по телефону"),
    (584982462, "Переход в Telegram"),
    (584982463, "Переход в WhatsApp"),
    (585122111, "Переход в MAX"),
]

DAYS_BACK = 30
OUT_PATH = os.environ.get("OUT_PATH", "public/report/data.json")

MSK = timezone(timedelta(hours=3))

DIRECT_URL = "https://api.direct.yandex.com/json/v5/reports"
METRIKA_URL = "https://api-metrika.yandex.net/stat/v1/data"

notes: list[str] = []


def log(msg: str) -> None:
    print(f"[report] {msg}", file=sys.stderr)


# ─────────────────────────── Яндекс Директ ───────────────────────────


def direct_report(token: str, body: dict, attempts: int = 12) -> list[dict]:
    """Запрос к Reports API. Отчёт может ставиться в очередь — ждём готовности."""
    payload = json.dumps(body, ensure_ascii=False).encode("utf-8")
    headers = {
        "Authorization": f"Bearer {token}",
        "Client-Login": CLIENT_LOGIN,
        "Accept-Language": "ru",
        "Content-Type": "application/json; charset=utf-8",
        "processingMode": "auto",
        "returnMoneyInMicros": "false",
        "skipReportHeader": "true",
        "skipColumnHeader": "false",
        "skipReportSummary": "true",
    }

    for attempt in range(attempts):
        req = urllib.request.Request(DIRECT_URL, data=payload, headers=headers, method="POST")
        try:
            with urllib.request.urlopen(req, timeout=60) as resp:
                status = resp.status
                raw = resp.read().decode("utf-8")
        except urllib.error.HTTPError as e:
            detail = e.read().decode("utf-8", "replace")[:400]
            raise RuntimeError(f"Директ вернул HTTP {e.code}: {detail}") from None

        if status in (201, 202):
            wait = min(2 ** attempt, 20)
            log(f"отчёт в очереди (HTTP {status}), ждём {wait} с")
            time.sleep(wait)
            continue

        rows = list(csv.DictReader(io.StringIO(raw), delimiter="\t"))
        return [r for r in rows if any((v or "").strip() for v in r.values())]

    raise RuntimeError("Директ не отдал отчёт: превышено время ожидания очереди")


def fetch_direct(token: str, d_from: str, d_to: str) -> tuple[list[dict], list[dict]]:
    base_criteria = {
        "DateFrom": d_from,
        "DateTo": d_to,
        "Filter": [{"Field": "CampaignId", "Operator": "EQUALS", "Values": [CAMPAIGN_ID]}],
    }
    stamp = int(time.time())

    daily = direct_report(token, {
        "params": {
            "SelectionCriteria": base_criteria,
            "FieldNames": ["Date", "Impressions", "Clicks", "Cost"],
            "ReportName": f"bns_daily_{stamp}",
            "ReportType": "CUSTOM_REPORT",
            "DateRangeType": "CUSTOM_DATE",
            "Format": "TSV",
            "IncludeVAT": "YES",
        }
    })

    try:
        queries = direct_report(token, {
            "params": {
                "SelectionCriteria": base_criteria,
                "FieldNames": ["Query", "Criterion", "Impressions", "Clicks", "Cost"],
                "ReportName": f"bns_queries_{stamp}",
                "ReportType": "SEARCH_QUERY_PERFORMANCE_REPORT",
                "DateRangeType": "CUSTOM_DATE",
                "Format": "TSV",
                "IncludeVAT": "YES",
            }
        })
    except Exception as e:  # отчёт по запросам не критичен
        log(f"отчёт по поисковым запросам недоступен: {e}")
        notes.append("Отчёт по поисковым запросам временно недоступен.")
        queries = []

    return daily, queries


# ─────────────────────────── Яндекс Метрика ───────────────────────────


def metrika_get(token: str, params: dict) -> dict:
    url = METRIKA_URL + "?" + urllib.parse.urlencode(params, doseq=True)
    req = urllib.request.Request(url, headers={"Authorization": f"OAuth {token}"})
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        detail = e.read().decode("utf-8", "replace")[:400]
        raise RuntimeError(f"Метрика вернула HTTP {e.code}: {detail}") from None


def totals_of(resp: dict, count: int) -> list[float]:
    """Достаёт totals из ответа Метрики.

    Stat API отдаёт totals ПЛОСКИМ списком чисел: [5, 5, 100.0, 1.0, 0.0].
    На всякий случай поддерживаем и вложенный вариант [[...]] — встречается
    в отдельных ответах, — и добиваем нулями, если метрик пришло меньше.
    """
    t = resp.get("totals") or []
    if t and isinstance(t[0], (list, tuple)):
        t = t[0]
    vals = [float(v or 0) for v in t]
    vals += [0.0] * (count - len(vals))
    return vals[:count]


def fetch_metrika(token: str, d_from: str, d_to: str) -> tuple[dict, dict]:
    """Возвращает (мониторинг счётчика целиком, достижения целей с трафика Директа)."""
    site = metrika_get(token, {
        "ids": COUNTER_ID,
        "metrics": ",".join([
            "ym:s:visits",
            "ym:s:users",
            "ym:s:bounceRate",
            "ym:s:pageDepth",
            "ym:s:avgVisitDurationSeconds",
        ]),
        "date1": d_from,
        "date2": d_to,
        "accuracy": "full",
    })
    s = totals_of(site, 5)
    monitor = {
        "visits": int(s[0]),
        "users": int(s[1]),
        "bounce_rate": round(s[2], 1),
        "page_depth": round(s[3], 2),
        "avg_duration_sec": int(s[4]),
    }

    # Цели считаем только по рекламному трафику. Если фильтр по какой-то причине
    # не отработает, мониторинг счётчика всё равно уже собран и не потеряется.
    goal_metrics = [f"ym:s:goal{gid}reaches" for gid, _ in GOALS]
    ads = {"visits": 0, "bounce_rate": None, "goals": {gid: 0 for gid, _ in GOALS}}
    try:
        direct = metrika_get(token, {
            "ids": COUNTER_ID,
            "metrics": ",".join(["ym:s:visits", "ym:s:bounceRate", *goal_metrics]),
            "filters": "ym:s:lastsignTrafficSource=='ad'",
            "date1": d_from,
            "date2": d_to,
            "accuracy": "full",
        })
        dt = totals_of(direct, 2 + len(GOALS))
        ads = {
            "visits": int(dt[0]),
            "bounce_rate": round(dt[1], 1),
            "goals": {gid: int(dt[2 + i]) for i, (gid, _) in enumerate(GOALS)},
        }
    except Exception as e:
        log(f"срез по рекламному трафику не собрался: {e}")
        notes.append(f"Цели по рекламному трафику не собрались: {e}")

    return monitor, ads


# ─────────────────────────── сборка ───────────────────────────


def to_float(v) -> float:
    try:
        return float(str(v).replace(",", ".").replace(" ", "").replace("\xa0", ""))
    except (TypeError, ValueError):
        return 0.0


def to_int(v) -> int:
    try:
        return int(to_float(v))
    except (TypeError, ValueError):
        return 0


def main() -> int:
    direct_token = os.environ.get("YANDEX_DIRECT_TOKEN", "").strip()
    metrika_token = os.environ.get("YANDEX_METRIKA_TOKEN", "").strip()

    today = datetime.now(MSK).date()
    d_from = (today - timedelta(days=DAYS_BACK - 1)).isoformat()
    d_to = today.isoformat()

    daily_rows: list[dict] = []
    query_rows: list[dict] = []
    if direct_token:
        try:
            daily_rows, query_rows = fetch_direct(direct_token, d_from, d_to)
            log(f"Директ: {len(daily_rows)} дней, {len(query_rows)} запросов")
        except Exception as e:
            log(f"Директ недоступен: {e}")
            notes.append(f"Данные Директа не обновились: {e}")
    else:
        notes.append("Не задан YANDEX_DIRECT_TOKEN — данные Директа пропущены.")

    monitor: dict = {}
    ads: dict = {}
    if metrika_token:
        try:
            monitor, ads = fetch_metrika(metrika_token, d_from, d_to)
            log(f"Метрика: {monitor.get('visits')} визитов всего")
        except Exception as e:
            log(f"Метрика недоступна: {e}")
            notes.append(f"Данные Метрики не обновились: {e}")
    else:
        notes.append("Не задан YANDEX_METRIKA_TOKEN — данные Метрики пропущены.")

    daily = []
    for r in daily_rows:
        daily.append({
            "date": r.get("Date", ""),
            "spend": round(to_float(r.get("Cost")), 2),
            "impressions": to_int(r.get("Impressions")),
            "clicks": to_int(r.get("Clicks")),
            "leads": 0,
        })
    daily.sort(key=lambda x: x["date"])

    spend = round(sum(d["spend"] for d in daily), 2)
    impressions = sum(d["impressions"] for d in daily)
    clicks = sum(d["clicks"] for d in daily)
    ctr = round(clicks / impressions * 100, 2) if impressions else 0.0
    cpc = round(spend / clicks, 2) if clicks else None

    goal_counts = ads.get("goals", {})
    goals = []
    for gid, name in GOALS:
        cnt = int(goal_counts.get(gid, 0))
        goals.append({
            "id": gid,
            "name": name,
            "count": cnt,
            "cpl": round(spend / cnt, 2) if cnt else None,
        })
    leads_total = sum(g["count"] for g in goals)

    queries = []
    for r in sorted(query_rows, key=lambda x: to_int(x.get("Clicks")), reverse=True)[:40]:
        queries.append({
            "query": r.get("Query", ""),
            "keyword": r.get("Criterion", ""),
            "impressions": to_int(r.get("Impressions")),
            "clicks": to_int(r.get("Clicks")),
            "spend": round(to_float(r.get("Cost")), 2),
            "leads": 0,
        })

    if clicks < 30:
        notes.append(
            f"Накоплено {clicks} кликов. Для выводов о масштабировании нужно не менее 30 — "
            "пока это наблюдения, а не статистика."
        )

    data = {
        "meta": {
            "campaign_id": int(CAMPAIGN_ID),
            "campaign_name": CAMPAIGN_NAME,
            "counter_id": int(COUNTER_ID),
            "updated_at": datetime.now(MSK).isoformat(timespec="seconds"),
            "period_from": d_from,
            "period_to": d_to,
            "budget_week": BUDGET_WEEK,
            "cpc_cap": CPC_CAP,
            "schedule": SCHEDULE,
            "geo": GEO,
            "status": "Идут показы",
        },
        "totals": {
            "spend": spend,
            "impressions": impressions,
            "clicks": clicks,
            "ctr": ctr,
            "cpc": cpc,
            "leads_total": leads_total,
            "cpl": round(spend / leads_total, 2) if leads_total else None,
            "bounce_rate": ads.get("bounce_rate"),
        },
        "metrika": monitor or None,
        "goals": goals,
        "daily": daily,
        "queries": queries,
        "notes": notes,
    }

    os.makedirs(os.path.dirname(OUT_PATH), exist_ok=True)
    with open(OUT_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write("\n")

    log(f"записан {OUT_PATH}: расход {spend} ₽, кликов {clicks}, обращений {leads_total}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
