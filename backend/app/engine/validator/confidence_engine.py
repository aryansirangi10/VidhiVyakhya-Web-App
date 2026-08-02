class ConfidenceEngine:
    """Calculates weighted confidence score from LLM extraction, schema match, citation match, and review status."""

    def compute_score(
        self,
        llm_score: float = 0.93,
        schema_valid: bool = True,
        citation_matched: bool = True,
        is_reviewed: bool = True,
    ) -> float:
        schema_score = 1.0 if schema_valid else 0.0
        citation_score = 1.0 if citation_matched else 0.5
        review_score = 1.0 if is_reviewed else 0.85

        # Weighted calculation
        final_score = (
            (llm_score * 0.35) +
            (schema_score * 0.25) +
            (citation_score * 0.25) +
            (review_score * 0.15)
        )
        return round(final_score, 2)

confidence_engine = ConfidenceEngine()
