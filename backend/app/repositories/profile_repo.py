from typing import List, Optional
from datetime import datetime
from sqlalchemy.orm import Session
from app.models.models import User, Profile, Simulation

class ProfileRepository:
    @staticmethod
    def get_user_by_email(db: Session, email: str) -> Optional[User]:
        return db.query(User).filter(User.email == email).first()

    @staticmethod
    def create_user(db: Session, user_data: dict) -> User:
        user = User(**user_data)
        db.add(user)
        db.commit()
        db.refresh(user)
        return user

    @staticmethod
    def delete_user(db: Session, user: User):
        db.delete(user)
        db.commit()

    @staticmethod
    def get_profiles_by_user(db: Session, user_id: int) -> List[Profile]:
        return db.query(Profile).filter(Profile.user_id == user_id).all()

    @staticmethod
    def get_profile_by_id(db: Session, profile_id: int, user_id: int) -> Optional[Profile]:
        return db.query(Profile).filter(Profile.id == profile_id, Profile.user_id == user_id).first()

    @staticmethod
    def create_profile(db: Session, user_id: int, name: str, data: dict, display_name: Optional[str] = None, avatar: Optional[str] = None, color: Optional[str] = None, default_profile: bool = False) -> Profile:
        profile = Profile(
            user_id=user_id,
            name=name,
            display_name=display_name or name,
            avatar=avatar,
            color=color,
            default_profile=default_profile
        )
        profile.set_profile_data(data)
        db.add(profile)
        db.commit()
        db.refresh(profile)
        return profile

    @staticmethod
    def delete_profile(db: Session, profile: Profile):
        db.delete(profile)
        db.commit()

    @staticmethod
    def get_history_by_profiles(db: Session, profile_ids: List[int]) -> List[Simulation]:
        return db.query(Simulation).filter(Simulation.profile_id.in_(profile_ids)).order_by(Simulation.created_at.desc()).all()

    @staticmethod
    def save_simulation(db: Session, profile_id: int, bill_id: int, impact: float, explanation: str, details: dict) -> Simulation:
        # Idempotency check: Upsert simulation
        existing_sim = db.query(Simulation).filter(
            Simulation.profile_id == profile_id,
            Simulation.bill_id == bill_id
        ).first()

        if existing_sim:
            existing_sim.calculated_impact = impact
            existing_sim.explanation = explanation
            existing_sim.details_json = details
            existing_sim.created_at = datetime.utcnow()
            db.commit()
            db.refresh(existing_sim)
            return existing_sim
        else:
            new_sim = Simulation(
                profile_id=profile_id,
                bill_id=bill_id,
                calculated_impact=impact,
                explanation=explanation,
                details_json=details
            )
            db.add(new_sim)
            db.commit()
            db.refresh(new_sim)
            return new_sim

