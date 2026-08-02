import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { usePDFContext } from "../../context/PDFContext";
import PDFLoading from "./PDFLoading";
import PDFError from "./PDFError";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export function PDFCanvas({ url }: { url: string }) {
  const { currentPage, zoom, rotation, setTotalPages, setLoading, setError } = usePDFContext();

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] w-full overflow-auto py-6">
      <Document
        file={url}
        onLoadSuccess={({ numPages }) => {
          setTotalPages(numPages);
          setLoading(false);
        }}
        onLoadError={(err) => {
          setError({ message: err.message, code: "LOAD_ERROR" });
          setLoading(false);
        }}
        loading={<PDFLoading />}
        error={<PDFError message="Failed to load PDF document from specified URL." />}
        className="shadow-2xl rounded-2xl overflow-hidden border border-slate-200"
      >
        <Page
          pageNumber={currentPage}
          scale={zoom}
          rotate={rotation}
          renderTextLayer={true}
          renderAnnotationLayer={false}
          className="bg-white"
        />
      </Document>
    </div>
  );
}

export default PDFCanvas;
