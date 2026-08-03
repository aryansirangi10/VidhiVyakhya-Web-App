import { api } from "../../../services/api";
import { PDFHighlight, PDFBookmark, PDFComment } from "../types/pdf";

export const pdfApi = {
  async getHighlights(docId: string): Promise<PDFHighlight[]> {
    try {
      const res = await api.get<PDFHighlight[]>(`/v1/pdf/highlights/${docId}`);
      return res.data;
    } catch {
      return [
        {
          clause_id: "Clause 4",
          page: 14,
          bbox: [100, 150, 450, 200],
          confidence: 0.98,
          rule_name: "Standard Deduction Increase",
          impact: 5200,
          text: "Standard deduction under Section 16(ia) is increased to ₹75,000.",
        },
        {
          clause_id: "Clause 12",
          page: 32,
          bbox: [120, 220, 480, 280],
          confidence: 0.96,
          rule_name: "Section 115BAC Revised Slabs",
          impact: 13250,
          text: "Revised tax slab rate brackets applied under New Tax Regime.",
        },
      ];
    }
  },
};

export default pdfApi;
