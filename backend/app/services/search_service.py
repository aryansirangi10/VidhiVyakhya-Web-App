from typing import List, Dict, Any

class GlobalSearchService:
    def search_all(self, query: str) -> Dict[str, Any]:
        q = query.lower()
        return {
            "bills": [
                {"id": 1, "title": "Finance Bill 2024", "relevance": 0.98}
            ],
            "rules": [
                {"id": "rule-17", "title": "Standard Deduction Increase", "clause": "Clause 4"}
            ],
            "glossary": [
                {"term": "Standard Deduction", "definition": "Flat deduction allowed from gross salary"}
            ],
        }

    def get_suggestions(self, prefix: str) -> List[str]:
        return ["standard deduction", "115BAC new tax regime", "LTCG capital gains"]

global_search_service = GlobalSearchService()
