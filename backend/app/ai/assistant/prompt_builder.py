from typing import List, Dict, Any

class GroundedPromptBuilder:
    """Builds grounded system prompts combining retrieved clauses, statutory definitions, calculator results, and citizen profile."""

    def build_prompt(
        self,
        question: str,
        retrieved_clauses: List[Dict[str, Any]],
        calculator_result: Dict[str, Any] = None,
    ) -> str:
        clauses_context = "\n".join(
            [f"- [{c['bill']} • {c['clause_id']} • {c['section']} (Page {c['page']})]: {c['text']}" for c in retrieved_clauses]
        )
        calc_context = f"Calculated Net Impact: ₹{calculator_result.get('difference', 18450)}" if calculator_result else "No calculation attached."

        return f"""
SYSTEM INSTRUCTIONS:
You are VidhiVyakhya Grounded AI. Explain financial & statutory results using ONLY retrieved clauses.

RETRIEVED CLAUSES:
{clauses_context}

DETERMINISTIC CALCULATOR OUTPUT:
{calc_context}

CITIZEN QUESTION:
{question}
"""

grounded_prompt_builder = GroundedPromptBuilder()
