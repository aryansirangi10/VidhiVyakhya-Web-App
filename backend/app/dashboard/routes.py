from fastapi import APIRouter
from .service import dashboard_service

router = APIRouter(prefix="/api/v1/dashboard", tags=["Dashboard & Intelligence"])

@router.get("")
def get_full_dashboard():
    return dashboard_service.get_dashboard()

@router.get("/summary")
def get_summary():
    return dashboard_service.get_dashboard()["summary"]

@router.get("/history")
def get_history():
    return [
        {"bill": "Finance Bill 2024", "impact": 13420, "status": "Positive"},
        {"bill": "Capital Gains Amendment", "impact": -4200, "status": "Cost"},
        {"bill": "GST Amendment", "impact": 980, "status": "Positive"},
    ]

@router.get("/analytics")
def get_analytics():
    return {
        "bills_viewed": 32,
        "calculations": 58,
        "profiles": 4,
        "tracked_topics": 6,
        "average_savings": 14200,
    }

@router.get("/watchlist")
def get_watchlist():
    return dashboard_service.get_dashboard()["watchlist_topics"]

@router.get("/recommendations")
def get_recommendations():
    return dashboard_service.get_dashboard()["recommendations"]

@router.get("/activity")
def get_activity():
    return dashboard_service.get_dashboard()["recent_activity"]
