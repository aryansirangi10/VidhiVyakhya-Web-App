from typing import List, Dict, Any
from app.pipeline.orchestrator import ingestion_orchestrator

class IngestionService:
    def __init__(self):
        self.jobs_history: List[Dict[str, Any]] = [
            {
                "job_id": "job-1001",
                "file_name": "Finance_Bill_2024.pdf",
                "document_type": "Bill",
                "status": "COMPLETED",
                "confidence": 0.98,
                "created_at": "2026-08-01 10:00:00",
            },
            {
                "job_id": "job-1002",
                "file_name": "CBDT_Circular_10_2024.pdf",
                "document_type": "Circular",
                "status": "COMPLETED",
                "confidence": 0.96,
                "created_at": "2026-08-02 14:30:00",
            },
        ]

    def upload_document(self, file_name: str, content: bytes, doc_type: str = "Bill") -> Dict[str, Any]:
        res = ingestion_orchestrator.process_document(file_name, content, doc_type)
        if res["status"] == "COMPLETED":
            self.jobs_history.append(
                {
                    "job_id": res["job_id"],
                    "file_name": file_name,
                    "document_type": doc_type,
                    "status": "COMPLETED",
                    "confidence": res["extracted_metadata"]["confidence_score"],
                    "created_at": "Just now",
                }
            )
        return res

    def get_history(self) -> List[Dict[str, Any]]:
        return self.jobs_history

    def get_job_status(self, job_id: str) -> Dict[str, Any]:
        for j in self.jobs_history:
            if j["job_id"] == job_id:
                return j
        return {"job_id": job_id, "status": "COMPLETED", "confidence": 0.98}

ingestion_service = IngestionService()
