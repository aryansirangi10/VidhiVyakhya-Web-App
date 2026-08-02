import pytest
from app.auth.password import password_service
from app.auth.jwt import jwt_service
from app.auth.encryption import profile_encryption
from app.auth.service import auth_service

def test_password_hashing():
    pwd = "SecretPassword123!"
    hashed = password_service.hash_password(pwd)
    assert password_service.verify_password(pwd, hashed) is True
    assert password_service.verify_password("WrongPassword", hashed) is False

def test_jwt_issuance():
    token = jwt_service.create_access_token({"sub": "1", "email": "test@example.com"})
    payload = jwt_service.decode_token(token)
    assert payload is not None
    assert payload["email"] == "test@example.com"

def test_profile_encryption():
    income = 1500000.0
    encrypted = profile_encryption.encrypt_val(income)
    assert encrypted.startswith("enc_gcm_")
    decrypted = profile_encryption.decrypt_val(encrypted)
    assert decrypted == income

def test_auth_registration_and_login():
    user = auth_service.register_user("teststage8@example.com", "Password123!")
    assert user["email"] == "teststage8@example.com"
    tokens = auth_service.login_user("teststage8@example.com", "Password123!")
    assert tokens.access_token is not None
