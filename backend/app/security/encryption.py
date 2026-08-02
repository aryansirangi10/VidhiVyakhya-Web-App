import os
import base64
from datetime import datetime, timedelta
from typing import Optional
from jose import jwt
from passlib.context import CryptContext
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives import padding
from cryptography.hazmat.backends import default_backend

# Encryption & JWT Constants
ENCRYPTION_KEY = os.getenv("ENCRYPTION_KEY", "c3VwZXJzZWNyZXRlbmNyeXB0aW9ua2V5MzJieXRlczE=")
SECRET_KEY = os.getenv("JWT_SECRET", "supersecretjwtkeyforvidhibillsprotection")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 1440

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class AESCipher:
    def __init__(self, base64_key: str):
        self.key = base64.b64decode(base64_key)
        if len(self.key) != 32:
            raise ValueError(f"AES key must be exactly 32 bytes. Decoded key length: {len(self.key)} bytes.")

    def encrypt(self, plaintext: str) -> str:
        if not plaintext:
            return ""
        iv = os.urandom(16)
        cipher = Cipher(algorithms.AES(self.key), modes.CBC(iv), backend=default_backend())
        encryptor = cipher.encryptor()
        padder = padding.PKCS7(128).padder()
        padded_data = padder.update(plaintext.encode("utf-8")) + padder.finalize()
        ciphertext = encryptor.update(padded_data) + encryptor.finalize()
        return base64.b64encode(iv + ciphertext).decode("utf-8")

    def decrypt(self, ciphertext_b64: str) -> str:
        if not ciphertext_b64:
            return ""
        try:
            raw_data = base64.b64decode(ciphertext_b64)
            iv = raw_data[:16]
            ciphertext = raw_data[16:]
            cipher = Cipher(algorithms.AES(self.key), modes.CBC(iv), backend=default_backend())
            decryptor = cipher.decryptor()
            decrypted_padded = decryptor.update(ciphertext) + decryptor.finalize()
            unpadder = padding.PKCS7(128).unpadder()
            decrypted_data = unpadder.update(decrypted_padded) + unpadder.finalize()
            return decrypted_data.decode("utf-8")
        except Exception:
            return ""

# Global instantiations
cipher = AESCipher(ENCRYPTION_KEY)

def encrypt_data(plaintext: str) -> str:
    return cipher.encrypt(plaintext)

def decrypt_data(ciphertext: str) -> str:
    return cipher.decrypt(ciphertext)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def decode_access_token(token: str) -> Optional[dict]:
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except Exception:
        return None
