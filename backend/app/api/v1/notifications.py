from fastapi import APIRouter
from app.services.notification_service import notification_service

router = APIRouter(prefix="/api/v1/notifications", tags=["Notifications Engine"])

@router.get("")
def list_notifications():
    return notification_service.get_notifications()

@router.patch("/{notification_id}")
def mark_read(notification_id: str):
    return {"status": "SUCCESS", "id": notification_id, "read": True}
