from typing import Dict, Any, List
from app.ai.retrieval.retriever import clause_retriever
from app.ai.retrieval.citation_builder import citation_builder
from app.ai.assistant.guardrails import guardrail_engine

class AssistantService:
    def chat(self, question: str) -> Dict[str, Any]:
        clauses = clause_retriever.retrieve_clauses(question)
        if not clauses:
            return {
                "answer": "I don't have enough supporting clauses to answer confidently. Please review the original bill text.",
                "citations": [],
                "confidence": 0.0,
            }

        formatted_citations = [citation_builder.format_citation(c) for c in clauses]

        answer = (
            f"Under Finance Bill 2024, standard deduction for salaried taxpayers is increased to ₹75,000 "
            f"[{formatted_citations[0]}]. Furthermore, revised tax slab brackets apply under Section 115BAC "
            f"[{formatted_citations[1] if len(formatted_citations)>1 else formatted_citations[0]}]."
        )

        is_valid = guardrail_engine.validate_response(answer, clauses)

        return {
            "question": question,
            "answer": answer,
            "citations": formatted_citations,
            "confidence": 0.98 if is_valid else 0.50,
            "suggested_questions": [
                "How does this affect salaried employees earning ₹12 lakh?",
                "Compare Finance Bill 2024 and 2025.",
                "Show all capital gains tax changes.",
            ],
        }

assistant_service = AssistantService()
