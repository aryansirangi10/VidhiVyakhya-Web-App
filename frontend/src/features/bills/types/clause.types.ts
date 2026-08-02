export interface Clause {
  id: string;
  clauseNumber: string;
  section: string;
  title: string;
  summary: string;
  affectedUsers: string[];
  category: string;
  confidence: number;
  rawText: string;
  pageNumber: number;
  pdfBoundingBox?: { x: number; y: number; width: number; height: number };
}
