from typing import Dict, Any
from app.analytics.trend_service import trend_service
from app.analytics.recommendation_service import recommendation_service

class DashboardService:
    def get_dashboard(self, user_id: int = 1) -> Dict[str, Any]:
        return {
            "summary": {
                "user_name": "Aryan",
                "bills_tracked_count": 14,
                "estimated_annual_savings": 18450.0,
                "bills_updated_this_week": 3,
                "rules_changed_count": 7,
            },
            "savings_trend": trend_service.get_savings_trend(user_id),
            "recent_activity": [
                {"id": "act-1", "action": "Calculated Impact", "target": "Finance Bill 2024", "timestamp": "2h ago"},
                {"id": "act-2", "action": "Saved Profile", "target": "Primary Citizen", "timestamp": "Yesterday"},
                {"id": "act-3", "action": "Added Topic", "target": "Income Tax", "timestamp": "3 days ago"},
            ],
            "recommendations": recommendation_service.get_recommendations(user_id),
            "watchlist_topics": ["Income Tax", "GST", "Privacy", "Digital India"],
        }

dashboard_service = DashboardService()
