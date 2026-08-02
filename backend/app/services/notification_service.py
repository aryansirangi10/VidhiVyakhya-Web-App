from typing import List, Dict, Any

class NotificationService:
    def get_notifications(self, user_id: int = 1) -> List[Dict[str, Any]]:
        return [
            {
                "id": "n-1",
                "title": "Finance Bill Updated",
                "message": "Your estimated annual savings increased by ₹2,400.",
                "timestamp": "2h ago",
                "read": False,
            },
            {
                "id": "n-2",
                "title": "Capital Gains Amendment",
                "message": "New rule published for Section 112A equity holding threshold.",
                "timestamp": "Yesterday",
                "read": True,
            },
        ]

notification_service = NotificationService()
