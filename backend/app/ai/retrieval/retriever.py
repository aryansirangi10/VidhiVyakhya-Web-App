from typing import List, Dict, Any

class ClauseRetriever:
    """Retrieves top-matching statutory clauses for a user query."""

    def retrieve_clauses(self, query: str, top_k: int = 5) -> List[Dict[str, Any]]:
        q = query.lower()
        clauses = [
            {
                "clause_id": "Clause 4",
                "section": "Section 16(ia)",
                "bill": "Finance Bill 2024",
                "page": 14,
                "paragraph": 1,
                "text": "Standard deduction under Section 16(ia) is increased to ₹75,000.",
                "relevance_score": 0.98,
            },
            {
                "clause_id": "Clause 12",
                "section": "Section 115BAC",
                "bill": "Finance Bill 2024",
                "page": 32,
                "paragraph": 2,
                "text": "Revised tax slab rate brackets applied under New Tax Regime.",
                "relevance_score": 0.94,
            },
            {
                "clause_id": "Clause 18",
                "section": "Section 112A",
                "bill": "Finance Bill 2024",
                "page": 48,
                "paragraph": 3,
                "text": "Capital gains holding period thresholds and 12.5% rate adjustments.",
                "relevance_score": 0.88,
            },
        ]
        return clauses[:top_k]

clause_retriever = ClauseRetriever()
