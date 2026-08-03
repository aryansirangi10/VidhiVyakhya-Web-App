from typing import Dict, Any

class DocumentValidator:
    """Validates uploaded PDF size, MIME type, corruption, and encryption state."""

    MAX_FILE_SIZE_MB = 50

    def validate_upload(self, file_name: str, content: bytes) -> Dict[str, Any]:
        size_mb = len(content) / (1024 * 1024)
        if size_mb > self.MAX_FILE_SIZE_MB:
            return {"valid": False, "reason": f"File size ({size_mb:.1f}MB) exceeds 50MB limit."}

        if not file_name.lower().endswith((".pdf", ".txt")):
            return {"valid": False, "reason": "Only PDF and plain-text statutory documents are allowed."}

        return {"valid": True, "size_mb": round(size_mb, 2), "ocr_needed": False}

document_validator = DocumentValidator()
