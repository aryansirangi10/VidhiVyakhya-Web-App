from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.schemas import UserRegister, Token
from app.services.auth_service import AuthService
from app.routes.utils import get_current_user # we will create this helper

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(user_data: UserRegister, db: Session = Depends(get_db)):
    return AuthService.register_user(db, user_data.email, user_data.password)

@router.post("/login", response_model=Token)
def login(user_data: UserRegister, db: Session = Depends(get_db)):
    return AuthService.login_user(db, user_data.email, user_data.password)

@router.delete("/account")
def delete_account(current_user = Depends(get_current_user), db: Session = Depends(get_db)):
    return AuthService.delete_user_account(db, current_user)
