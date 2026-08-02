import os
import re
from typing import List, Optional
from sqlalchemy.orm import Session
from fastapi import UploadFile, HTTPException

from app.repositories.bill_repo import BillRepository
from app.extractor import extract_rules
from app.models.models import Bill

UPLOADS_DIR = "/app/uploads"

class BillService:
    @staticmethod
    def list_all(db: Session) -> List[dict]:
        bills = BillRepository.get_all(db)
        return [
            {
                "id": b.id,
                "title": b.title,
                "summary": b.summary,
                "source_url": b.source_url,
                "pdf_path": b.pdf_path,
                "status": b.status,
                "current_stage": b.current_stage,
                "reading_time": b.reading_time,
                "category": b.category
            }
            for b in bills
        ]

    @staticmethod
    def get_by_id(db: Session, bill_id: int) -> dict:
        bill = BillRepository.get_by_id(db, bill_id)
        if not bill:
            raise HTTPException(status_code=404, detail="Bill not found.")
        
        return {
            "id": bill.id,
            "title": bill.title,
            "summary": bill.summary,
            "source_url": bill.source_url,
            "pdf_path": bill.pdf_path,
            "status": bill.status,
            "current_stage": bill.current_stage,
            "reading_time": bill.reading_time,
            "category": bill.category,
            "rules": [
                {
                    "id": r.id,
                    "clause_number": r.clause_number,
                    "clause_text": r.clause_text,
                    "rule_type": r.rule_type,
                    "source_span": r.source_span,
                    "confidence": r.confidence,
                    "reviewed": r.reviewed,
                    "reviewed_by": r.reviewed_by,
                    "reviewed_at": r.reviewed_at,
                    "rule_version": r.rule_version,
                    "is_demo_rule": r.is_demo_rule
                }
                for r in bill.rules
            ]
        }

    @staticmethod
    def get_timeline(db: Session, bill_id: int) -> List[dict]:
        bill = BillRepository.get_by_id(db, bill_id)
        if not bill:
            raise HTTPException(status_code=404, detail="Bill not found.")
        
        # Build stages map dynamically based on status/current_stage
        stages = ["Introduced", "Lok Sabha", "Rajya Sabha", "President Assent", "Implemented"]
        completed_stages = []
        
        status_lower = bill.status.lower()
        stage_lower = bill.current_stage.lower()
        
        # Determine how far the bill has progressed
        current_idx = 0
        if status_lower == "implemented":
            current_idx = 4
        elif "president" in stage_lower or status_lower == "assented":
            current_idx = 3
        elif "rajya" in stage_lower:
            current_idx = 2
        elif "lok" in stage_lower:
            current_idx = 1
            
        result = []
        for idx, stage in enumerate(stages):
            completed = idx < current_idx or status_lower == "implemented"
            is_current = idx == current_idx and status_lower != "implemented"
            
            date_str = None
            if idx == 0 and bill.introduced_date:
                date_str = bill.introduced_date
            elif idx == 4 and bill.effective_date:
                date_str = bill.effective_date
                
            result.append({
                "stage": stage,
                "completed": completed,
                "current": is_current,
                "date": date_str
            })
            
        return result

    @staticmethod
    def get_metadata(db: Session, bill_id: int) -> dict:
        bill = BillRepository.get_by_id(db, bill_id)
        if not bill:
            raise HTTPException(status_code=404, detail="Bill not found.")
            
        return {
            "bill_number": bill.bill_number or f"Bill No. {bill.id}",
            "category": bill.category,
            "pages": bill.pages,
            "reading_time": bill.reading_time,
            "ministry": bill.ministry,
            "sponsor": bill.sponsor,
            "parliamentary_session": bill.parliamentary_session,
            "document_language": bill.document_language,
            "amendment_count": bill.amendment_count,
            "pdf_size": bill.pdf_size,
            "status": bill.status,
            "introduced_date": bill.introduced_date,
            "effective_date": bill.effective_date
        }

    @staticmethod
    def upload_bill(db: Session, title: str, summary: str, source_url: Optional[str], file: UploadFile, api_key: Optional[str]) -> dict:
        file_uuid = os.urandom(8).hex()
        clean_filename = re.sub(r'[^a-zA-Z0-9_\-\.]', '', file.filename)
        safe_filename = f"{file_uuid}_{clean_filename}"

        if not safe_filename.endswith(".pdf"):
            safe_filename += ".pdf"
            
        target_path = os.path.join(UPLOADS_DIR, safe_filename)
        
        try:
            with open(target_path, "wb") as f:
                f.write(file.file.read())
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to write file: {e}")
            
        # Get PDF size formatted
        size_bytes = os.path.getsize(target_path)
        size_mb = size_bytes / (1024 * 1024)
        pdf_size_str = f"{size_mb:.1f} MB"
        
        # Ingest/extract rules
        try:
            rules_list = extract_rules(target_path, file.filename, api_key)
        except Exception as e:
            if os.path.exists(target_path):
                os.remove(target_path)
            raise HTTPException(status_code=500, detail=f"LLM rules extraction failed: {e}")
            
        # Create bill record
        bill_data = {
            "title": title,
            "summary": summary,
            "source_url": source_url,
            "pdf_path": safe_filename,
            "status": "Introduced",
            "current_stage": "Lok Sabha",
            "introduced_date": "2026-08-01",
            "reading_time": max(2, len(rules_list)),
            "pages": 1,
            "ministry": "Finance",
            "category": "Taxation",
            "pdf_size": pdf_size_str
        }
        
        bill = BillRepository.create_bill(db, bill_data)
        
        # Save rules with deduplication
        inserted_count = 0
        for r in rules_list:
            rule_entry = BillRepository.add_rule_to_bill(db, bill.id, r)
            if rule_entry:
                inserted_count += 1
                
        return {
            "id": bill.id,
            "title": bill.title,
            "summary": bill.summary,
            "pdf_path": bill.pdf_path,
            "rules_extracted_count": len(rules_list),
            "rules_inserted_count": inserted_count
        }
