from typing import List, Dict, Any

class RecommendationService:
    def get_recommendations(self, user_id: int = 1) -> List[Dict[str, Any]]:
        return [
            {
                "id": 1,
                "title": "Budget Amendment 2025",
                "category": "Income Tax",
                "reason": "Related to your tracked topic 'Income Tax'",
            },
            {
                "id": 2,
                "title": "DPDP Compliance Rules 2024",
                "category": "Privacy",
                "reason": "Impacts digital data principals and businesses",
            },
        ]

recommendation_service = RecommendationService()
