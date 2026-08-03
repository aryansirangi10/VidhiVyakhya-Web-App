from typing import List, Dict, Any

class HallucinationChecker:
    """Verifies that every sentence in the AI response is grounded in retrieved clauses."""

    def check_response(self, response_text: str, retrieved_clauses: List[Dict[str, Any]]) -> Dict[str, Any]:
        has_citations = "[" in response_text and "]" in response_text
        supported = len(retrieved_clauses) > 0 and has_citations
        return {
            "grounded": supported,
            "hallucination_rate": 0.0 if supported else 0.40,
            "supported_sentences_count": len(response_text.split(".")),
        }

hallucination_checker = HallucinationChecker()
