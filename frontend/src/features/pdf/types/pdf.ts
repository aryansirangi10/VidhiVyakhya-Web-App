export interface PDFDocument {
  id: string;
  title: string;
  url: string;
  pages: number;
  checksum: string;
  language: "en" | "hi";
  size: number;
}

export interface PDFPage {
  pageNumber: number;
  width: number;
  height: number;
  rotation: number;
}

export interface PDFViewport {
  scale: number;
  rotation: number;
}

export interface PDFError {
  message: string;
  code: string;
}
