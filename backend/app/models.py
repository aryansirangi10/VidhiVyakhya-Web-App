import os
import base64
import json
from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, Boolean, Float, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives import padding
from cryptography.hazmat.backends import default_backend

from app.database import Base

ENCRYPTION_KEY = os.getenv("ENCRYPTION_KEY", "c3VwZXJzZWNyZXRlbmNyeXB0aW9ua2V5MzJieXRlczE=")


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
            # Fallback in case of decryption failure or key mismatch
            return ""

# Initialize global cipher
cipher = AESCipher(ENCRYPTION_KEY)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    profiles = relationship("Profile", back_populates="user", cascade="all, delete-orphan")

class Profile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=True)
    name = Column(String, nullable=False)
    # Encrypted data containing income, age, state, tax_regime, employment_category as JSON
    encrypted_data = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="profiles")
    simulations = relationship("Simulation", back_populates="profile", cascade="all, delete-orphan")

    def set_profile_data(self, profile_dict: dict):
        plaintext = json.dumps(profile_dict)
        self.encrypted_data = cipher.encrypt(plaintext)

    def get_profile_data(self) -> dict:
        if not self.encrypted_data:
            return {}
        decrypted = cipher.decrypt(self.encrypted_data)
        if not decrypted:
            return {}
        return json.loads(decrypted)

class Bill(Base):
    __tablename__ = "bills"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    summary = Column(Text, nullable=False)
    source_url = Column(String, nullable=True)
    pdf_path = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    rules = relationship("Rule", back_populates="bill", cascade="all, delete-orphan")
    simulations = relationship("Simulation", back_populates="bill", cascade="all, delete-orphan")

class Rule(Base):
    __tablename__ = "rules"

    id = Column(Integer, primary_key=True, index=True)
    bill_id = Column(Integer, ForeignKey("bills.id", ondelete="CASCADE"), nullable=False)
    clause_number = Column(String, nullable=False)
    clause_text = Column(Text, nullable=False)
    rule_type = Column(String, nullable=False)  # e.g., "tax_slab", "deduction", "penalty"
    condition_json = Column(JSON, nullable=False)  # e.g., {"tax_regime": "new"}
    formula_json = Column(JSON, nullable=False)  # e.g., {"deduction_amount": 75000}
    source_span = Column(JSON, nullable=False)  # e.g., {"page": 2, "bbox": [50, 100, 500, 200], "snippet": "..."}
    confidence = Column(Float, default=1.0)
    reviewed = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    bill = relationship("Bill", back_populates="rules")

class Simulation(Base):
    __tablename__ = "simulations"

    id = Column(Integer, primary_key=True, index=True)
    profile_id = Column(Integer, ForeignKey("profiles.id", ondelete="SET NULL"), nullable=True)
    bill_id = Column(Integer, ForeignKey("bills.id", ondelete="CASCADE"), nullable=False)
    calculated_impact = Column(Float, nullable=False)  # Rupee value. Positive = Saving, Negative = Cost
    explanation = Column(Text, nullable=False)
    details_json = Column(JSON, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    profile = relationship("Profile", back_populates="simulations")
    bill = relationship("Bill", back_populates="simulations")
