export interface PDFDocument {
  id: string;
  title: string;
  numPages?: number;
  pages?: number;
  checksum?: string;
  language?: string;
  size?: number;
  url: string;
}

export interface PDFError {
  message: string;
  code?: string;
}

export interface PDFHighlight {
  clause_id: string;
  page: number;
  bbox: number[];
  confidence: number;
  rule_name: string;
  impact: number;
  text: string;
}

export interface PDFBookmark {
  id: string;
  page: number;
  clause_id: string;
  title: string;
}

export interface PDFComment {
  id: string;
  clause_id: string;
  author: string;
  text: string;
}
