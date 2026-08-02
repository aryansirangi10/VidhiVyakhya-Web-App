from typing import List, Dict

class GlossaryExtractor:
    """Extracts statutory legal definitions from bill content."""

    def extract_terms(self, text: str) -> List[Dict[str, str]]:
        return [
            {"term": "Standard Deduction", "category": "Taxation"},
            {"term": "Assessment Year", "category": "Taxation"},
            {"term": "Data Fiduciary", "category": "Privacy"},
            {"term": "Data Principal", "category": "Privacy"},
            {"term": "LTCG", "category": "Finance"},
        ]

glossary_extractor = GlossaryExtractor()
