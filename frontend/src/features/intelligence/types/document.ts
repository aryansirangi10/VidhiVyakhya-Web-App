export type DocumentType = "Bill" | "Act" | "Rule" | "Circular" | "Gazette" | "Judgment";

export interface StatutoryDocument {
  id: number;
  title: string;
  document_type: DocumentType;
  ministry: string;
  category: string;
  status: string;
  bill_number: string;
  introduced_date: string;
  published_date: string;
  language: string;
  pages: number;
  reading_time: number;
  summary: string;
  confidence: number;
  bookmarks_count: number;
  views_count: number;
}
