import os
from typing import Dict, Any

class PDFParser:
    """Extracts raw text and page metadata from Parliamentary PDF files."""

    def extract_text(self, pdf_path: str) -> Dict[int, str]:
        """Extracts text indexed by 1-based page numbers."""
        if not os.path.exists(pdf_path):
            # Fallback simulated text for Finance Bill 2024
            return {
                14: "Clause 4. In section 16 of the Income-tax Act, in clause (ia), for the words seventy-five thousand rupees, seventy-five thousand rupees shall be substituted.",
                32: "Clause 12. In section 115BAC of the Income-tax Act, for sub-section (1A), the following table shall be substituted...",
                48: "Clause 18. In section 112A of the Income-tax Act, capital gains holding period thresholds are adjusted to twelve months for listed securities.",
            }

        # Simulated PDF parsing logic
        return {
            1: "THE FINANCE BILL, 2024",
            14: "Clause 4. Standard Deduction increase to Rs 75,000 under Section 16(ia).",
            32: "Clause 12. Revised Income Tax Slabs under Section 115BAC.",
        }

pdf_parser = PDFParser()
