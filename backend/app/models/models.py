import json
from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, Boolean, Float, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship

from app.database import Base
from app.security.encryption import encrypt_data, decrypt_data

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
    # Encrypted data containing income, age, state, tax_regime, employment_category, equity_ltsg as JSON
    encrypted_data = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Phase 4 visual additions
    display_name = Column(String, nullable=True)
    avatar = Column(String, nullable=True)
    color = Column(String, nullable=True)
    default_profile = Column(Boolean, default=False)

    user = relationship("User", back_populates="profiles")
    simulations = relationship("Simulation", back_populates="profile", cascade="all, delete-orphan")

    def set_profile_data(self, profile_dict: dict):
        plaintext = json.dumps(profile_dict)
        self.encrypted_data = encrypt_data(plaintext)

    def get_profile_data(self) -> dict:
        if not self.encrypted_data:
            return {}
        decrypted = decrypt_data(self.encrypted_data)
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

    # Phase 4 timeline and rich metadata
    status = Column(String, default="Introduced")
    current_stage = Column(String, default="Lok Sabha")
    introduced_date = Column(String, nullable=True)
    effective_date = Column(String, nullable=True)
    last_updated = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    reading_time = Column(Integer, default=3) # in minutes
    pages = Column(Integer, default=1)
    ministry = Column(String, default="Finance")
    bill_number = Column(String, nullable=True)
    category = Column(String, default="Income Tax")
    pdf_size = Column(String, default="1.2 MB")
    
    sponsor = Column(String, default="Minister of Finance")
    parliamentary_session = Column(String, default="Monsoon Session")
    document_language = Column(String, default="English")
    amendment_count = Column(Integer, default=0)

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
    source_span = Column(JSON, nullable=False)  # e.g., {"page": 2, "x0": ...}
    confidence = Column(Float, default=1.0)
    
    # Phase 4 audit additions
    reviewed = Column(Boolean, default=False)
    reviewed_by = Column(String, nullable=True)
    reviewed_at = Column(DateTime, nullable=True)
    rule_version = Column(Integer, default=1)
    is_demo_rule = Column(Boolean, default=False)
    
    page = Column(Integer, default=1)
    paragraph = Column(String, nullable=True)
    checksum = Column(String, unique=True, index=True, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)

    bill = relationship("Bill", back_populates="rules")

class Simulation(Base):
    __tablename__ = "simulations"

    id = Column(Integer, primary_key=True, index=True)
    profile_id = Column(Integer, ForeignKey("profiles.id", ondelete="SET NULL"), nullable=True)
    bill_id = Column(Integer, ForeignKey("bills.id", ondelete="CASCADE"), nullable=False)
    calculated_impact = Column(Float, nullable=False)
    explanation = Column(Text, nullable=False)
    details_json = Column(JSON, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    profile = relationship("Profile", back_populates="simulations")
    bill = relationship("Bill", back_populates="simulations")
