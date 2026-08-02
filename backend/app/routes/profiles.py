from typing import Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.schemas import ProfileCreateSchema, SaveHistoryRequest
from app.services.profile_service import ProfileService
from app.routes.utils import get_current_user

# Router for Profiles CRUD & Comparisons
profiles_router = APIRouter(prefix="/api/profiles", tags=["Profiles"])

# Router for History Simulation Logs
history_router = APIRouter(prefix="/api/history", tags=["History Timeline"])

@profiles_router.get("")
def list_profiles(current_user = Depends(get_current_user), db: Session = Depends(get_db)):
    return ProfileService.get_profiles(db, current_user.id)

@profiles_router.post("")
def create_profile(profile_in: ProfileCreateSchema, current_user = Depends(get_current_user), db: Session = Depends(get_db)):
    return ProfileService.create_profile(db, current_user.id, profile_in)

@profiles_router.delete("/{profile_id}")
def delete_profile(profile_id: int, current_user = Depends(get_current_user), db: Session = Depends(get_db)):
    return ProfileService.delete_profile(db, current_user.id, profile_id)

@profiles_router.get("/compare")
def compare_profiles(
    bill_id: int = Query(...),
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return ProfileService.compare_profiles(db, current_user.id, bill_id)

@history_router.get("")
def list_history(
    profile_id: Optional[int] = Query(None),
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return ProfileService.list_history(db, current_user.id, profile_id)

@history_router.post("")
def save_history(
    body: SaveHistoryRequest,
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return ProfileService.save_history(
        db=db,
        user_id=current_user.id,
        profile_id=body.profile_id,
        bill_id=body.bill_id,
        impact=body.calculated_impact,
        explanation=body.explanation,
        details=body.details_json
    )
