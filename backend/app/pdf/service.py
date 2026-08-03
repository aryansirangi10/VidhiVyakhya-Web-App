from typing import List, Dict, Any

class PDFIntelligenceService:
    def __init__(self):
        self.highlights = [
            {
                "clause_id": "Clause 4",
                "page": 14,
                "bbox": [100, 150, 450, 200],
                "confidence": 0.98,
                "rule_name": "Standard Deduction Increase",
                "impact": 5200,
                "text": "Standard deduction under Section 16(ia) is increased to ₹75,000.",
            },
            {
                "clause_id": "Clause 12",
                "page": 32,
                "bbox": [120, 220, 480, 280],
                "confidence": 0.96,
                "rule_name": "Section 115BAC Revised Slabs",
                "impact": 13250,
                "text": "Revised tax slab rate brackets applied under New Tax Regime.",
            },
        ]
        self.bookmarks: List[Dict[str, Any]] = [
            {"id": "b-1", "page": 14, "clause_id": "Clause 4", "title": "Standard Deduction Clause"},
        ]
        self.comments: List[Dict[str, Any]] = [
            {"id": "c-1", "clause_id": "Clause 4", "author": "Aryan", "text": "Applies to salaried employees in New Tax Regime."},
        ]

    def get_highlights(self, doc_id: str) -> List[Dict[str, Any]]:
        return self.highlights

    def get_bookmarks(self, doc_id: str) -> List[Dict[str, Any]]:
        return self.bookmarks

    def add_bookmark(self, doc_id: str, page: int, clause_id: str, title: str) -> Dict[str, Any]:
        bm = {"id": f"b-{len(self.bookmarks)+1}", "page": page, "clause_id": clause_id, "title": title}
        self.bookmarks.append(bm)
        return bm

    def add_comment(self, doc_id: str, clause_id: str, text: str) -> Dict[str, Any]:
        cmt = {"id": f"c-{len(self.comments)+1}", "clause_id": clause_id, "author": "Verified Citizen", "text": text}
        self.comments.append(cmt)
        return cmt

    def search_pdf(self, query: str) -> List[Dict[str, Any]]:
        q = query.lower()
        return [h for h in self.highlights if q in h["text"].lower() or q in h["clause_id"].lower()]

pdf_intelligence_service = PDFIntelligenceService()
