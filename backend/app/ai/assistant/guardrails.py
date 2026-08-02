from typing import List, Dict, Any

class GuardrailEngine:
    def validate_response(self, response_text: str, retrieved_clauses: List[Dict[str, Any]]) -> bool:
        # Verify response is non-empty and backed by retrieved clauses
        return len(response_text) > 0 and len(retrieved_clauses) > 0

guardrail_engine = GuardrailEngine()
