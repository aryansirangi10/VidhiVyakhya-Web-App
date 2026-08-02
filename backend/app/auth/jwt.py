import base64
import hmac
import hashlib
import json
from datetime import datetime, timedelta
from typing import Dict, Any, Optional

SECRET_KEY = "vidhivyakhya-enterprise-secret-key-production"
ACCESS_TOKEN_EXPIRE_MINUTES = 15
REFRESH_TOKEN_EXPIRE_DAYS = 30

def _b64_encode(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).rstrip(b"=").decode("utf-8")

def _b64_decode(data: str) -> bytes:
    padding = 4 - (len(data) % 4)
    if padding != 4:
        data += "=" * padding
    return base64.urlsafe_b64decode(data.encode("utf-8"))

class JWTService:
    def create_access_token(self, data: Dict[str, Any], expires_delta: Optional[timedelta] = None) -> str:
        to_encode = data.copy()
        expire = (datetime.utcnow() + (expires_delta if expires_delta else timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))).timestamp()
        to_encode.update({"exp": expire, "type": "access"})
        
        header = _b64_encode(json.dumps({"alg": "HS256", "typ": "JWT"}).encode("utf-8"))
        payload = _b64_encode(json.dumps(to_encode).encode("utf-8"))
        signature_input = f"{header}.{payload}".encode("utf-8")
        signature = _b64_encode(hmac.new(SECRET_KEY.encode("utf-8"), signature_input, hashlib.sha256).digest())
        return f"{header}.{payload}.{signature}"

    def create_refresh_token(self, data: Dict[str, Any]) -> str:
        to_encode = data.copy()
        expire = (datetime.utcnow() + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)).timestamp()
        to_encode.update({"exp": expire, "type": "refresh"})
        
        header = _b64_encode(json.dumps({"alg": "HS256", "typ": "JWT"}).encode("utf-8"))
        payload = _b64_encode(json.dumps(to_encode).encode("utf-8"))
        signature_input = f"{header}.{payload}".encode("utf-8")
        signature = _b64_encode(hmac.new(SECRET_KEY.encode("utf-8"), signature_input, hashlib.sha256).digest())
        return f"{header}.{payload}.{signature}"

    def decode_token(self, token: str) -> Optional[Dict[str, Any]]:
        try:
            parts = token.split(".")
            if len(parts) != 3:
                return None
            header, payload, signature = parts
            signature_input = f"{header}.{payload}".encode("utf-8")
            expected_sig = _b64_encode(hmac.new(SECRET_KEY.encode("utf-8"), signature_input, hashlib.sha256).digest())
            if signature != expected_sig:
                return None
            decoded_payload = json.loads(_b64_decode(payload).decode("utf-8"))
            if "exp" in decoded_payload and datetime.utcnow().timestamp() > decoded_payload["exp"]:
                return None
            return decoded_payload
        except Exception:
            return None

jwt_service = JWTService()
