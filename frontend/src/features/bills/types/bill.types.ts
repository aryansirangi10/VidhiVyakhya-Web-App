export type BillStatus =
  | "Introduced"
  | "Committee"
  | "Lok Sabha"
  | "Rajya Sabha"
  | "Assented"
  | "Implemented";

export interface Bill {
  id: number;
  title: string;
  shortTitle: string;
  billNumber: string;
  year: number;
  category: string;
  status: BillStatus;
  summary: string;
  ministry: string;
  introducedDate: string;
  effectiveDate?: string;
  readingTime: number;
  pages: number;
  language: "English" | "Hindi";
  pdfUrl: string;
  thumbnail: string;
  confidence: number;
  ruleCount: number;
  clauseCount: number;
  impactCategories: string[];
}

export interface BillFilterState {
  searchQuery: string;
  category: string;
  status: string;
  ministry: string;
  year: string;
  sortBy: "newest" | "oldest" | "confidence" | "popular" | "alphabetical";
}

export interface AnonymousProfile {
  income: number;
  age: number;
  employmentType: "salaried" | "business" | "professional" | "freelance";
  taxRegime: "new" | "old";
  state: string;
}
