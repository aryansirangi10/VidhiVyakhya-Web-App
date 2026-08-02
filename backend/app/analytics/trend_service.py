from typing import List, Dict, Any

class TrendService:
    def get_savings_trend(self, user_id: int = 1) -> List[Dict[str, Any]]:
        return [
            {"month": "Jan", "savings": 8000},
            {"month": "Feb", "savings": 10500},
            {"month": "Mar", "savings": 12000},
            {"month": "Apr", "savings": 15000},
            {"month": "May", "savings": 18450},
        ]

trend_service = TrendService()
