from pydantic import BaseModel
from typing import List, Dict, Any, Optional

class ExecutiveSummaryDTO(BaseModel):
    user_name: str
    bills_tracked_count: int
    estimated_annual_savings: float
    bills_updated_this_week: int
    rules_changed_count: int

class SavingsTrendPoint(BaseModel):
    month: str
    savings: float

class ActivityItem(BaseModel):
    id: str
    action: str
    target: str
    timestamp: str

class RecommendationItem(BaseModel):
    id: int
    title: str
    category: str
    reason: str

class DashboardDTO(BaseModel):
    summary: ExecutiveSummaryDTO
    savings_trend: List[SavingsTrendPoint]
    recent_activity: List[ActivityItem]
    recommendations: List[RecommendationItem]
    watchlist_topics: List[str]
