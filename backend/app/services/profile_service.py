from typing import List, Optional
from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.repositories.profile_repo import ProfileRepository
from app.repositories.bill_repo import BillRepository
from app.evaluator import evaluate_bill_impact
from app.schemas.schemas import ProfileCreateSchema

class ProfileService:
    @staticmethod
    def get_profiles(db: Session, user_id: int) -> List[dict]:
        profiles = ProfileRepository.get_profiles_by_user(db, user_id)
        return [
            {
                "id": p.id,
                "name": p.name,
                "display_name": p.display_name or p.name,
                "avatar": p.avatar,
                "color": p.color,
                "default_profile": p.default_profile,
                "profile_data": p.get_profile_data()
            }
            for p in profiles
        ]

    @staticmethod
    def create_profile(db: Session, user_id: int, p_in: ProfileCreateSchema) -> dict:
        profile = ProfileRepository.create_profile(
            db=db,
            user_id=user_id,
            name=p_in.name,
            data=p_in.profile_data.model_dump(),
            display_name=p_in.display_name,
            avatar=p_in.avatar,
            color=p_in.color,
            default_profile=p_in.default_profile
        )
        return {
            "id": profile.id,
            "name": profile.name,
            "display_name": profile.display_name,
            "avatar": profile.avatar,
            "color": profile.color,
            "default_profile": profile.default_profile,
            "profile_data": profile.get_profile_data()
        }

    @staticmethod
    def delete_profile(db: Session, user_id: int, profile_id: int) -> dict:
        profile = ProfileRepository.get_profile_by_id(db, profile_id, user_id)
        if not profile:
            raise HTTPException(status_code=404, detail="Profile not found.")
        ProfileRepository.delete_profile(db, profile)
        return {"message": "Profile deleted successfully."}

    @staticmethod
    def list_history(db: Session, user_id: int, profile_id: Optional[int] = None) -> List[dict]:
        profiles = ProfileRepository.get_profiles_by_user(db, user_id)
        profile_ids = [p.id for p in profiles]
        
        if profile_id:
            if profile_id not in profile_ids:
                raise HTTPException(status_code=403, detail="Access denied to this profile.")
            active_ids = [profile_id]
        else:
            active_ids = profile_ids

        simulations = ProfileRepository.get_history_by_profiles(db, active_ids)
        return [
            {
                "id": s.id,
                "profile_id": s.profile_id,
                "bill_id": s.bill_id,
                "bill_title": s.bill.title,
                "calculated_impact": s.calculated_impact,
                "explanation": s.explanation,
                "details_json": s.details_json,
                "created_at": s.created_at
            }
            for s in simulations
        ]

    @staticmethod
    def save_history(db: Session, user_id: int, profile_id: int, bill_id: int, impact: float, explanation: str, details: dict) -> dict:
        profile = ProfileRepository.get_profile_by_id(db, profile_id, user_id)
        if not profile:
            raise HTTPException(status_code=400, detail="Invalid profile for current user.")
        
        sim = ProfileRepository.save_simulation(db, profile_id, bill_id, impact, explanation, details)
        return {"message": "History saved successfully.", "id": sim.id}

    @staticmethod
    def compare_profiles(db: Session, user_id: int, bill_id: int) -> List[dict]:
        # 1. Fetch bill and rules
        bill = BillRepository.get_by_id(db, bill_id)
        if not bill:
            raise HTTPException(status_code=404, detail="Bill not found.")
            
        rules = bill.rules
        
        # 2. Fetch profiles
        profiles = ProfileRepository.get_profiles_by_user(db, user_id)
        
        results = []
        for p in profiles:
            p_data = p.get_profile_data()
            if not p_data:
                continue
                
            # Evaluate impact
            eval_res = evaluate_bill_impact(p_data, rules)
            
            results.append({
                "profile_id": p.id,
                "name": p.name,
                "display_name": p.display_name or p.name,
                "avatar": p.avatar,
                "color": p.color,
                "impact": eval_res["total_impact"],
                "explanation": eval_res["explanation"],
                "confidence": 1.0 if not rules else sum(r.confidence for r in rules)/len(rules)
            })
            
        return results
