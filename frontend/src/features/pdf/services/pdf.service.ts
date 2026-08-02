import { PDFDocument } from "../types/pdf";

export const MOCK_PDF_DOC: PDFDocument = {
  id: "pdf-finance-2024",
  title: "The Finance Bill, 2024 (Gazette of India)",
  url: "/documents/finance_bill_2024.pdf",
  pages: 412,
  checksum: "sha256:8f4b23a1c9e887d12f9e",
  language: "en",
  size: 14200000,
};

export const pdfService = {
  async getPDFDocument(id: string): Promise<PDFDocument> {
    return MOCK_PDF_DOC;
  },
};

export default pdfService;
