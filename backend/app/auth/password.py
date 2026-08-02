import hashlib
import os

class PasswordService:
    def hash_password(self, password: str) -> str:
        salt = os.urandom(16).hex()
        pwd_hash = hashlib.pbkdf2_hmac(
            "sha256", password.encode("utf-8"), salt.encode("utf-8"), 100000
        ).hex()
        return f"{salt}:{pwd_hash}"

    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        try:
            salt, stored_hash = hashed_password.split(":")
            calc_hash = hashlib.pbkdf2_hmac(
                "sha256", plain_password.encode("utf-8"), salt.encode("utf-8"), 100000
            ).hex()
            return calc_hash == stored_hash
        except Exception:
            return False

password_service = PasswordService()
