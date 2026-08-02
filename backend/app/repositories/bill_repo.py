import hashlib
from typing import List, Optional
from sqlalchemy.orm import Session
from app.models.models import Bill, Rule

class BillRepository:
    @staticmethod
    def get_all(db: Session) -> List[Bill]:
        return db.query(Bill).order_by(Bill.created_at.desc()).all()

    @staticmethod
    def get_by_id(db: Session, bill_id: int) -> Optional[Bill]:
        return db.query(Bill).filter(Bill.id == bill_id).first()

    @staticmethod
    def get_by_pdf_path(db: Session, pdf_path: str) -> Optional[Bill]:
        return db.query(Bill).filter(Bill.pdf_path == pdf_path).first()

    @staticmethod
    def create_bill(db: Session, bill_data: dict) -> Bill:
        bill = Bill(**bill_data)
        db.add(bill)
        db.commit()
        db.refresh(bill)
        return bill

    @staticmethod
    def calculate_rule_checksum(bill_id: int, clause_number: str, clause_text: str) -> str:
        unique_str = f"{bill_id}_{clause_number.strip().lower()}_{clause_text.strip()}"
        return hashlib.sha256(unique_str.encode("utf-8")).hexdigest()

    @staticmethod
    def add_rule_to_bill(db: Session, bill_id: int, rule_data: dict) -> Optional[Rule]:
        checksum = BillRepository.calculate_rule_checksum(
            bill_id, rule_data.get("clause_number", ""), rule_data.get("clause_text", "")
        )
        
        # Check if checksum already exists (de-duplication)
        existing_rule = db.query(Rule).filter(Rule.checksum == checksum).first()
        if existing_rule:
            return existing_rule

        rule = Rule(
            bill_id=bill_id,
            clause_number=rule_data.get("clause_number", "General"),
            clause_text=rule_data.get("clause_text", ""),
            rule_type=rule_data.get("rule_type", "other"),
            condition_json=rule_data.get("condition_json", {}),
            formula_json=rule_data.get("formula_json", {}),
            source_span=rule_data.get("source_span", {}),
            confidence=rule_data.get("confidence", 0.5),
            reviewed=rule_data.get("reviewed", False),
            reviewed_by=rule_data.get("reviewed_by"),
            reviewed_at=rule_data.get("reviewed_at"),
            rule_version=rule_data.get("rule_version", 1),
            is_demo_rule=rule_data.get("is_demo_rule", False),
            page=rule_data.get("page", 1),
            paragraph=rule_data.get("paragraph"),
            checksum=checksum
        )
        db.add(rule)
        db.commit()
        db.refresh(rule)
        return rule
