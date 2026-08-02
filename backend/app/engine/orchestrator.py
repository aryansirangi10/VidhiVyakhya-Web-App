from typing import Dict, Any
from .pipeline import pipeline

class IngestionOrchestrator:
    """Orchestrates asynchronous bill ingestion and queue processing."""

    def ingest_bill(self, bill_id: int, pdf_path: str = "/documents/finance_bill_2024.pdf") -> Dict[str, Any]:
        return pipeline.process_bill(pdf_path, bill_id=bill_id)

orchestrator = IngestionOrchestrator()
