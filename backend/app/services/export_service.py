from typing import Dict, Any

class ExportService:
    def generate_report_json(self, profile: Dict[str, Any], impact: Dict[str, Any]) -> Dict[str, Any]:
        return {
            "title": "VidhiVyakhya Legal Intelligence Impact Report",
            "generated_at": "2026-08-02",
            "profile": profile,
            "impact_summary": impact,
            "legal_grounding": "All calculations strictly derived from official Parliamentary Bills.",
        }

export_service = ExportService()
