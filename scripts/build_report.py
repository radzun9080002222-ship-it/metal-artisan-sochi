#!/usr/bin/env python3
"""Собирает закрытый отчёт по одной кампании БНС через API Метрики.

Direct Reports API для приложения недоступен, поэтому рекламные расходы и
клики берутся из отчёта Метрики «Директ, расходы». Визиты и цели дополнительно
фильтруются по тому же ID кампании. При сбое основного источника файл отчёта не
перезаписывается: на сайте остаётся последний успешный снимок.
"""

from __future__ import annotations

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

PRIMARY_GOAL_ID = 584981732
GOALS = [
    (PRIMARY_GOAL_ID, "Успешная заявка", "lead"),
    (584982228, "Клик по телефону", "contact"),
    (584982462, "Переход в Telegram", "contact"),
    (584982463, "Переход в WhatsApp", "contact"),
    (585122111, "Переход в MAX", "contact"),
]

DAYS_BACK = 30
OUT_PATH = os.environ.get("OUT_PATH", "public/report/data.json")

MSK = timezone(timedelta(hours=3))
METRIKA_URL = "https://api-metrika.yandex.net/stat/v1/data"

AD_ORDER_DIMENSION = "ym:ad:directOrder"
AD_QUERY_DIMENSION = "ym:ad:directSearchPhrase"
AD_CRITERION_DIMENSION = "ym:ad:directPhraseOrCond"
VISIT_ORDER_DIMENSION = "ym:s:lastsignDirectClickOrder"
AD_METRICS = "ym:ad:clicks,ym:ad:RUBConvertedAdCost"


def log(msg: str) -> None:
    print(f"[report] {msg}", file=sys.stderr)


def metrika_get(token: str, params: dict, attempts: int = 3) -> dict:
    """Выполняет запрос к Stat API с коротким retry для временных ошибок."""
    url = METRIKA_URL + "?" + urllib.parse.urlencode(params, doseq=True)
    req = urllib.request.Request(url, headers={"Authorization": f"OAuth {token}"})

    for attempt in range(attempts):
        try:
            with urllib.request.urlopen(req, timeout=60) as resp:
                return json.loads(resp.read().decode("utf-8"))
        except urllib.error.HTTPError as exc:
            detail = exc.read().decode("utf-8", "replace")[:400]
            if exc.code not in (429, 500, 502, 503, 504) or attempt == attempts - 1:
                raise RuntimeError(f"Метрика вернула HTTP {exc.code}: {detail}") from None
            wait = min(2 ** attempt, 4)
            log(f"Метрика временно недоступна (HTTP {exc.code}), повтор через {wait} с")
            time.sleep(wait)
        except urllib.error.URLError as exc:
            if attempt == attempts - 1:
                raise RuntimeError(f"Метрика недоступна: {exc.reason}") from None
            wait = min(2 ** attempt, 4)
            log(f"Сетевая ошибка Метрики, повтор через {wait} с")
            time.sleep(wait)

    raise RuntimeError("Метрика не ответила после повторных запросов")


def totals_of(resp: dict, count: int) -> list[float]:
    """Возвращает плоский список totals требуемой длины."""
    totals = resp.get("totals") or []
    if totals and isinstance(totals[0], (list, tuple)):
        totals = totals[0]
    values = [float(value or 0) for value in totals]
    values += [0.0] * (count - len(values))
    return values[:count]


def dimension_value(row: dict, index: int, prefer_id: bool = False) -> str:
    """Достаёт значение группировки из строки ответа Метрики."""
    dimensions = row.get("dimensions") or []
    if index >= len(dimensions):
        return ""
    dimension = dimensions[index]
    if isinstance(dimension, dict):
        if prefer_id and dimension.get("id") is not None:
            return str(dimension["id"])
        return str(dimension.get("name") or dimension.get("id") or "")
    return str(dimension or "")


def ad_params(d_from: str, d_to: str, dimensions: str = AD_ORDER_DIMENSION) -> dict:
    """Общие параметры отчёта «Директ, расходы» для одной кампании."""
    return {
        "ids": COUNTER_ID,
        "direct_client_logins": CLIENT_LOGIN,
        "metrics": AD_METRICS,
        "dimensions": dimensions,
        "filters": f"{AD_ORDER_DIMENSION}=='{CAMPAIGN_ID}'",
        "date1": d_from,
        "date2": d_to,
        "currency": "RUB",
        "accuracy": "full",
        "lang": "ru",
        "limit": 100,
    }


def fetch_ad_totals(token: str, d_from: str, d_to: str) -> dict:
    """Возвращает клики и расход только кампании БНС за период."""
    response = metrika_get(token, ad_params(d_from, d_to))
    clicks, spend = totals_of(response, 2)
    return {"clicks": int(clicks), "spend": round(spend, 2)}


def fetch_campaign_visits(token: str, d_from: str, d_to: str) -> dict:
    """Возвращает визиты, поведение и цели только кампании БНС."""
    goal_metrics = [f"ym:s:goal{goal_id}reaches" for goal_id, _, _ in GOALS]
    metrics = [
        "ym:s:visits",
        "ym:s:users",
        "ym:s:bounceRate",
        "ym:s:pageDepth",
        "ym:s:avgVisitDurationSeconds",
        *goal_metrics,
    ]
    response = metrika_get(token, {
        "ids": COUNTER_ID,
        "metrics": ",".join(metrics),
        "filters": f"{VISIT_ORDER_DIMENSION}=='{CAMPAIGN_ID}'",
        "date1": d_from,
        "date2": d_to,
        "accuracy": "full",
        "lang": "ru",
    })
    values = totals_of(response, len(metrics))
    return {
        "visits": int(values[0]),
        "users": int(values[1]),
        "bounce_rate": round(values[2], 1),
        "page_depth": round(values[3], 2),
        "avg_duration_sec": int(values[4]),
        "goals": {
            goal_id: int(values[5 + index])
            for index, (goal_id, _, _) in enumerate(GOALS)
        },
    }


def fetch_queries(token: str, d_from: str, d_to: str) -> list[dict]:
    """Возвращает поисковые фразы кампании с кликами и расходом."""
    dimensions = ",".join([
        AD_ORDER_DIMENSION,
        AD_QUERY_DIMENSION,
        AD_CRITERION_DIMENSION,
    ])
    params = ad_params(d_from, d_to, dimensions)
    params.update({"sort": "-ym:ad:clicks", "limit": 40})
    response = metrika_get(token, params)

    queries = []
    for row in response.get("data") or []:
        order_id = dimension_value(row, 0, prefer_id=True)
        if order_id and order_id != CAMPAIGN_ID:
            continue
        query = dimension_value(row, 1).strip()
        if not query:
            continue
        metrics = row.get("metrics") or []
        clicks = int(float(metrics[0] or 0)) if metrics else 0
        spend = round(float(metrics[1] or 0), 2) if len(metrics) > 1 else 0.0
        queries.append({
            "query": query,
            "keyword": dimension_value(row, 2).strip(),
            "impressions": None,
            "clicks": clicks,
            "spend": spend,
            "leads": None,
        })

    return queries


def fetch_daily(token: str, d_from: date, d_to: date) -> list[dict]:
    """Собирает дневную динамику отдельными короткими запросами.

    В наборе группировок «Директ, расходы» нет надёжной группировки по дате,
    поэтому для 30-дневного окна выполняется один запрос на каждый день.
    """
    daily = []
    current = d_from
    while current <= d_to:
        day = current.isoformat()
        totals = fetch_ad_totals(token, day, day)
        if totals["clicks"] or totals["spend"]:
            daily.append({
                "date": day,
                "spend": totals["spend"],
                "impressions": None,
                "clicks": totals["clicks"],
                "leads": None,
            })
        current += timedelta(days=1)
    return daily


def collect_report(token: str, today: date) -> dict:
    """Собирает готовую структуру data.json из API Метрики."""
    d_from_date = today - timedelta(days=DAYS_BACK - 1)
    d_from = d_from_date.isoformat()
    d_to = today.isoformat()
    week_from = today - timedelta(days=today.weekday())

    period = fetch_ad_totals(token, d_from, d_to)
    weekly = fetch_ad_totals(token, week_from.isoformat(), d_to)
    monitor = fetch_campaign_visits(token, d_from, d_to)

    notes = [
        "Расходы и клики получены из отчёта Метрики «Директ, расходы» строго по кампании БНС.",
        "Показы и CTR без доступа к Direct API недоступны и в отчёте не рассчитываются.",
    ]

    try:
        queries = fetch_queries(token, d_from, d_to)
    except Exception as exc:
        log(f"поисковые фразы не собраны: {exc}")
        notes.append("Поисковые фразы временно не обновились.")
        queries = []

    try:
        daily = fetch_daily(token, d_from_date, today)
    except Exception as exc:
        log(f"дневная динамика не собрана: {exc}")
        notes.append("Дневная динамика временно не обновилась.")
        daily = []

    spend = period["spend"]
    clicks = period["clicks"]
    cpc = round(spend / clicks, 2) if clicks else None
    goal_counts = monitor["goals"]

    goals = []
    for goal_id, name, kind in GOALS:
        count = int(goal_counts.get(goal_id, 0))
        goals.append({
            "id": goal_id,
            "name": name,
            "kind": kind,
            "count": count,
            "cpl": round(spend / count, 2) if count else None,
        })

    leads_total = int(goal_counts.get(PRIMARY_GOAL_ID, 0))
    contact_actions_total = sum(goal["count"] for goal in goals if goal["kind"] == "contact")
    conversion_rate = (
        round(leads_total / monitor["visits"] * 100, 2)
        if monitor["visits"]
        else 0.0
    )

    if clicks < 30:
        notes.append(
            f"Накоплено {clicks} кликов. Для выводов о масштабировании нужно не менее 30 — "
            "пока это наблюдения, а не статистика."
        )

    status = "Данные актуальны" if clicks or spend else "Нет переходов за период"
    return {
        "meta": {
            "campaign_id": int(CAMPAIGN_ID),
            "campaign_name": CAMPAIGN_NAME,
            "counter_id": int(COUNTER_ID),
            "updated_at": datetime.now(MSK).isoformat(timespec="seconds"),
            "period_from": d_from,
            "period_to": d_to,
            "week_from": week_from.isoformat(),
            "budget_week": BUDGET_WEEK,
            "cpc_cap": CPC_CAP,
            "schedule": SCHEDULE,
            "geo": GEO,
            "status": status,
            "data_source": "Яндекс Метрика · Директ, расходы",
        },
        "totals": {
            "spend": spend,
            "impressions": None,
            "clicks": clicks,
            "ctr": None,
            "cpc": cpc,
            "leads_total": leads_total,
            "contact_actions_total": contact_actions_total,
            "conversion_rate": conversion_rate,
            "cpl": round(spend / leads_total, 2) if leads_total else None,
            "bounce_rate": monitor["bounce_rate"],
        },
        "weekly": {
            "spend": weekly["spend"],
            "clicks": weekly["clicks"],
        },
        "metrika": {
            "visits": monitor["visits"],
            "users": monitor["users"],
            "bounce_rate": monitor["bounce_rate"],
            "page_depth": monitor["page_depth"],
            "avg_duration_sec": monitor["avg_duration_sec"],
        },
        "goals": goals,
        "daily": daily,
        "queries": queries,
        "notes": notes,
    }


def main() -> int:
    token = os.environ.get("YANDEX_METRIKA_TOKEN", "").strip()
    if not token:
        log("не задан YANDEX_METRIKA_TOKEN; существующий отчёт оставлен без изменений")
        return 1

    today = datetime.now(MSK).date()
    try:
        data = collect_report(token, today)
    except Exception as exc:
        log(f"основные данные Метрики не собраны: {exc}")
        log("существующий отчёт оставлен без изменений")
        return 1

    os.makedirs(os.path.dirname(OUT_PATH), exist_ok=True)
    with open(OUT_PATH, "w", encoding="utf-8") as output:
        json.dump(data, output, ensure_ascii=False, indent=2)
        output.write("\n")

    totals = data["totals"]
    log(
        f"записан {OUT_PATH}: расход {totals['spend']} ₽, "
        f"кликов {totals['clicks']}, заявок {totals['leads_total']}"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
