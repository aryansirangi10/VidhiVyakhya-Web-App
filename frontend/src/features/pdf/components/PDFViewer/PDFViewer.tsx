import React, { useEffect } from "react";
import { PDFProvider, usePDFContext } from "../../Context/PDFContext";
import Toolbar from "../Toolbar/Toolbar";
import PDFCanvas from "./PDFCanvas";
import PDFEmpty from "./PDFEmpty";

export interface PDFViewerProps {
  url?: string;
}

function InnerPDFViewer({ url }: PDFViewerProps) {
  const { setPage, nextPage, prevPage, zoomIn, zoomOut, totalPages } = usePDFContext();

  // Keyboard Shortcuts: ← (prev), → (next), Ctrl+ (zoom in), Ctrl- (zoom out), Home (first), End (last)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === "INPUT") return;

      if (e.key === "ArrowLeft") {
        prevPage();
      } else if (e.key === "ArrowRight") {
        nextPage();
      } else if (e.key === "Home") {
        setPage(1);
      } else if (e.key === "End") {
        setPage(totalPages);
      } else if ((e.ctrlKey || e.metaKey) && (e.key === "=" || e.key === "+")) {
        e.preventDefault();
        zoomIn();
      } else if ((e.ctrlKey || e.metaKey) && e.key === "-") {
        e.preventDefault();
        zoomOut();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextPage, prevPage, setPage, totalPages, zoomIn, zoomOut]);

  if (!url) return <PDFEmpty />;

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <Toolbar />
      <div className="flex-1 rounded-3xl bg-slate-200/50 p-4 border border-slate-200 overflow-auto">
        <PDFCanvas url={url} />
      </div>
    </div>
  );
}

export function PDFViewer(props: PDFViewerProps) {
  return (
    <PDFProvider>
      <InnerPDFViewer {...props} />
    </PDFProvider>
  );
}

export default PDFViewer;
