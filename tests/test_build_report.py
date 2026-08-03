import importlib.util
import os
import tempfile
import unittest
from datetime import date
from pathlib import Path
from unittest import mock


SCRIPT_PATH = Path(__file__).resolve().parents[1] / "scripts" / "build_report.py"
SPEC = importlib.util.spec_from_file_location("build_report", SCRIPT_PATH)
report = importlib.util.module_from_spec(SPEC)
assert SPEC and SPEC.loader
SPEC.loader.exec_module(report)


class BuildReportTests(unittest.TestCase):
    def fake_metrika_get(self, _token, params, attempts=3):
        del attempts
        metrics = params["metrics"]
        dimensions = params.get("dimensions", "")

        if metrics.startswith("ym:s:visits"):
            self.assertEqual(
                params["filters"],
                f"{report.VISIT_ORDER_DIMENSION}=='{report.CAMPAIGN_ID}'",
            )
            if params.get("dimensions") == report.VISIT_DATE_DIMENSION:
                return {
                    "data": [
                        {
                            "dimensions": [{"name": "2026-08-04"}],
                            "metrics": [3, 3, 33.3, 1.0, 60, 1, 0, 1, 0, 0],
                        },
                        {
                            "dimensions": [{"name": "2026-08-05"}],
                            "metrics": [5, 4, 20.0, 1.8, 108, 1, 1, 0, 0, 0],
                        },
                    ],
                }
            return {"totals": [8, 7, 25.0, 1.5, 90, 2, 1, 1, 0, 0]}

        self.assertEqual(params["direct_client_logins"], report.CLIENT_LOGIN)
        self.assertEqual(
            params["filters"],
            f"{report.AD_ORDER_DIMENSION}=='{report.CAMPAIGN_ID}'",
        )
        self.assertIn(report.AD_ORDER_DIMENSION, dimensions)

        if report.AD_QUERY_DIMENSION in dimensions:
            return {
                "data": [
                    {
                        "dimensions": [
                            {"id": report.CAMPAIGN_ID, "name": report.CAMPAIGN_NAME},
                            {"name": "каркас бнс купить"},
                            {"name": "каркас бнс"},
                        ],
                        "metrics": [3, 150.0],
                    },
                    {
                        "dimensions": [
                            {"id": "999", "name": "Другая кампания"},
                            {"name": "чужой запрос"},
                            {"name": "чужой ключ"},
                        ],
                        "metrics": [20, 900.0],
                    },
                ],
            }

        d_from = params["date1"]
        d_to = params["date2"]
        if d_from == "2026-07-07" and d_to == "2026-08-05":
            return {"totals": [10, 500.0]}
        if d_from == "2026-08-03" and d_to == "2026-08-05":
            return {"totals": [4, 180.0]}
        if d_from == d_to == "2026-08-04":
            return {"totals": [1, 60.0]}
        if d_from == d_to == "2026-08-05":
            return {"totals": [2, 80.0]}
        return {"totals": [0, 0.0]}

    def test_collects_only_campaign_metrics_and_primary_leads(self):
        with mock.patch.object(report, "metrika_get", side_effect=self.fake_metrika_get):
            data = report.collect_report("token", date(2026, 8, 5))

        self.assertEqual(data["meta"]["campaign_id"], 712813448)
        self.assertEqual(data["totals"]["spend"], 500.0)
        self.assertEqual(data["totals"]["clicks"], 10)
        self.assertEqual(data["totals"]["cpc"], 50.0)
        self.assertIsNone(data["totals"]["impressions"])
        self.assertIsNone(data["totals"]["ctr"])

        # Лиды — только успешная форма; клики по каналам считаются отдельно.
        self.assertEqual(data["totals"]["leads_total"], 2)
        self.assertEqual(data["totals"]["contact_actions_total"], 2)
        self.assertEqual(data["totals"]["conversion_rate"], 25.0)
        self.assertEqual(data["totals"]["cpl"], 250.0)

        self.assertEqual(data["weekly"], {"spend": 180.0, "clicks": 4})
        self.assertEqual(len(data["daily"]), 30)
        active_days = [row for row in data["daily"] if row["clicks"]]
        self.assertEqual([row["date"] for row in active_days], ["2026-08-04", "2026-08-05"])
        self.assertEqual(active_days[0]["visits"], 3)
        self.assertEqual(active_days[0]["leads"], 1)
        self.assertEqual(active_days[0]["contact_actions"], 1)

        self.assertEqual(len(data["queries"]), 2)
        self.assertEqual(data["queries"][0]["query"], "каркас бнс купить")
        self.assertEqual(data["queries"][0]["date"], "2026-08-04")

    def test_missing_token_keeps_existing_report_untouched(self):
        with tempfile.TemporaryDirectory() as tmp_dir:
            output = Path(tmp_dir) / "data.json"
            output.write_text("sentinel", encoding="utf-8")
            with (
                mock.patch.dict(os.environ, {"YANDEX_METRIKA_TOKEN": ""}),
                mock.patch.object(report, "OUT_PATH", str(output)),
            ):
                result = report.main()

            self.assertEqual(result, 1)
            self.assertEqual(output.read_text(encoding="utf-8"), "sentinel")


if __name__ == "__main__":
    unittest.main()
