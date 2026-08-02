from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.repositories.profile_repo import ProfileRepository
from app.security.encryption import get_password_hash, verify_password, create_access_token

class AuthService:
    @staticmethod
    def register_user(db: Session, email: str, password: str) -> dict:
        existing = ProfileRepository.get_user_by_email(db, email)
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email address already registered."
            )
        
        hashed_pwd = get_password_hash(password)
        ProfileRepository.create_user(db, {"email": email, "password_hash": hashed_pwd})
        return {"message": "User registered successfully."}

    @staticmethod
    def login_user(db: Session, email: str, password: str) -> dict:
        user = ProfileRepository.get_user_by_email(db, email)
        if not user or not verify_password(password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password."
            )
        
        token = create_access_token(data={"sub": user.email})
        return {"access_token": token, "token_type": "bearer"}

    @staticmethod
    def delete_user_account(db: Session, user) -> dict:
        ProfileRepository.delete_user(db, user)
        return {"message": "Account and all profiles scrubbed successfully."}
