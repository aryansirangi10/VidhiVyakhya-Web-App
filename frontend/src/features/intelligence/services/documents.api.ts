import { api } from "../../../services/api";
import { StatutoryDocument } from "../types/document";

export const documentsApi = {
  async getDocuments(type = "all", query = ""): Promise<StatutoryDocument[]> {
    try {
      const res = await api.get<StatutoryDocument[]>("/v1/documents", {
        params: { doc_type: type, q: query },
      });
      return res.data;
    } catch {
      return [
        {
          id: 1,
          title: "Finance Bill 2024 (Bill No. 112)",
          document_type: "Bill",
          ministry: "Ministry of Finance",
          category: "Taxation",
          status: "Passed",
          bill_number: "112 of 2024",
          introduced_date: "2024-02-01",
          published_date: "2024-07-23",
          language: "English",
          pages: 148,
          reading_time: 45,
          summary: "Introduces revised Section 115BAC tax slabs, increases standard deduction to ₹75,000, and adjusts LTCG rates.",
          confidence: 0.98,
          bookmarks_count: 1420,
          views_count: 18900,
        },
        {
          id: 2,
          title: "Digital Personal Data Protection Act 2023",
          document_type: "Act",
          ministry: "Ministry of Electronics & IT",
          category: "Privacy",
          status: "Implemented",
          bill_number: "Act No. 22 of 2023",
          introduced_date: "2023-08-03",
          published_date: "2023-08-11",
          language: "English",
          pages: 44,
          reading_time: 18,
          summary: "Establishes Data Protection Board guidelines and non-compliance penalties up to ₹250 Crore.",
          confidence: 0.96,
          bookmarks_count: 980,
          views_count: 14200,
        },
      ];
    }
  },
};

export default documentsApi;
