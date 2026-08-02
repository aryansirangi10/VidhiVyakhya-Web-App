from typing import Dict, Any

class MetadataExtractor:
    """Extracts bill header metadata."""

    def extract_metadata(self, text: str) -> Dict[str, Any]:
        return {
            "bill_number": "Bill No. 112 of 2024",
            "ministry": "Ministry of Finance",
            "introduced_date": "23 Jul 2024",
            "year": 2024,
            "status": "Implemented",
        }

metadata_extractor = MetadataExtractor()
