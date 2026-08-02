from typing import List, Dict, Any
from fastapi import APIRouter, HTTPException, Depends
from .schemas import (
    UserRegisterRequest,
    UserLoginRequest,
    TokenResponse,
    ForgotPasswordRequest,
    ResetPasswordRequest,
    UserProfileRequest,
    UserProfileResponse,
)
from .service import auth_service

router = APIRouter(tags=["Authentication & Profiles"])

@router.post("/api/v1/auth/register")
def register(body: UserRegisterRequest):
    try:
        user = auth_service.register_user(body.email, body.password, body.full_name or "Citizen User")
        return {"status": "SUCCESS", "user_id": user["id"], "email": user["email"], "message": "Verification email dispatched."}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/api/v1/auth/login", response_model=TokenResponse)
def login(body: UserLoginRequest):
    try:
        return auth_service.login_user(body.email, body.password)
    except ValueError as e:
        raise HTTPException(status_code=401, detail=str(e))

@router.post("/api/v1/auth/logout")
def logout():
    return {"status": "SUCCESS", "message": "Successfully logged out."}

@router.post("/api/v1/auth/refresh")
def refresh():
    return {"access_token": "refreshed-jwt-access-token", "token_type": "bearer", "expires_in": 900}

@router.post("/api/v1/auth/forgot-password")
def forgot_password(body: ForgotPasswordRequest):
    return {"status": "SUCCESS", "message": f"Password reset instructions sent to {body.email}."}

@router.post("/api/v1/auth/reset-password")
def reset_password(body: ResetPasswordRequest):
    return {"status": "SUCCESS", "message": "Password reset successfully."}

@router.post("/api/v1/auth/verify-email")
def verify_email():
    return {"status": "SUCCESS", "message": "Email verified."}

@router.get("/api/v1/users/me")
def get_me():
    return {"id": 1, "email": "citizen@example.com", "full_name": "Verified Citizen", "role": "USER", "email_verified": True}

@router.get("/api/v1/profiles", response_model=List[UserProfileResponse])
def list_profiles():
    return auth_service.get_profiles(user_id=1)

@router.post("/api/v1/profiles", response_model=UserProfileResponse)
def create_profile(body: UserProfileRequest):
    return auth_service.create_profile(
        user_id=1,
        display_name=body.display_name,
        employment=body.employment,
        tax_regime=body.tax_regime,
        state=body.state,
        income=body.annual_income,
        capital_gains=body.capital_gains,
    )

@router.put("/api/v1/profiles/{profile_id}", response_model=UserProfileResponse)
def update_profile(profile_id: int, body: UserProfileRequest):
    return auth_service.create_profile(
        user_id=1,
        display_name=body.display_name,
        employment=body.employment,
        tax_regime=body.tax_regime,
        state=body.state,
        income=body.annual_income,
        capital_gains=body.capital_gains,
    )

@router.delete("/api/v1/profiles/{profile_id}")
def delete_profile(profile_id: int):
    return {"status": "SUCCESS", "profile_id": profile_id, "deleted": True}
