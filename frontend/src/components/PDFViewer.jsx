import React, { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, AlertCircle } from "lucide-react";

// Configure local CDN worker source for pdf.js to prevent bundler errors
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.370/pdf.worker.min.mjs`;

export default function PDFViewer({ pdfUrl, highlight }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  
  const [pdf, setPdf] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1.2);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [renderTask, setRenderTask] = useState(null);

  // Load PDF document
  useEffect(() => {
    if (!pdfUrl) return;
    setLoading(true);
    setError(null);
    setPdf(null);
    setCurrentPage(1);

    const loadingTask = pdfjsLib.getDocument(pdfUrl);
    loadingTask.promise.then(
      (loadedPdf) => {
        setPdf(loadedPdf);
        setPageCount(loadedPdf.numPages);
        setLoading(false);
      },
      (err) => {
        console.error("Error loading PDF: ", err);
        setError("Failed to load PDF preview. Verify that the file is available.");
        setLoading(false);
      }
    );

    return () => {
      loadingTask.destroy();
    };
  }, [pdfUrl]);

  // Sync to citation highlight page
  useEffect(() => {
    if (highlight && highlight.page && pdf) {
      setCurrentPage(highlight.page);
      
      // Smooth scroll the container back to top so the user sees the page highlight
      if (containerRef.current) {
        containerRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [highlight, pdf]);

  // Render current page to canvas
  useEffect(() => {
    if (!pdf) return;

    // Cancel active render task if page or scale changes
    if (renderTask) {
      renderTask.cancel();
    }

    pdf.getPage(currentPage).then((page) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext("2d");
      const viewport = page.getViewport({ scale });

      canvas.width = viewport.width;
      canvas.height = viewport.height;
      setCanvasSize({ width: viewport.width, height: viewport.height });

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      const task = page.render(renderContext);
      setRenderTask(task);

      task.promise.then(
        () => {
          setRenderTask(null);
        },
        (err) => {
          if (err.name !== "RenderingCancelledException") {
            console.error("Render task failed: ", err);
          }
        }
      );
    });
  }, [pdf, currentPage, scale]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleZoomIn = () => setScale((s) => Math.min(s + 0.2, 2.0));
  const handleZoomOut = () => setScale((s) => Math.max(s - 0.2, 0.8));

  // Compute CSS styles for the highlight overlay box
  const getHighlightStyle = () => {
    if (!highlight || highlight.page !== currentPage || canvasSize.width === 0) {
      return null;
    }

    // Default dimensions in database rules are mapped to Letter size standard (612x792)
    const baseWidth = highlight.page_width || 612.0;
    const baseHeight = highlight.page_height || 792.0;

    const scaleX = canvasSize.width / baseWidth;
    const scaleY = canvasSize.height / baseHeight;

    return {
      position: "absolute",
      left: `${highlight.x0 * scaleX}px`,
      top: `${highlight.top * scaleY}px`,
      width: `${(highlight.x1 - highlight.x0) * scaleX}px`,
      height: `${(highlight.bottom - highlight.top) * scaleY}px`,
      pointerEvents: "none",
    };
  };

  const highlightStyle = getHighlightStyle();

  return (
    <div ref={containerRef} className="border border-slate-200 bg-slate-50 flex flex-col items-center">
      {/* Viewer toolbar */}
      <div className="w-full flex items-center justify-between px-4 py-2 bg-white border-b border-slate-200 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage <= 1 || loading}
            className="p-1 hover:bg-slate-100 disabled:opacity-30 border border-slate-200"
          >
            <ChevronLeft size={16} />
          </button>
          <span>
            Page {currentPage} of {pageCount || "?"}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage >= pageCount || loading}
            className="p-1 hover:bg-slate-100 disabled:opacity-30 border border-slate-200"
          >
            <ChevronRight size={16} />
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomOut}
            disabled={loading}
            className="p-1 hover:bg-slate-100 border border-slate-200"
            title="Zoom Out"
          >
            <ZoomOut size={14} />
          </button>
          <span className="text-[10px] w-8 text-center">{Math.round(scale * 100)}%</span>
          <button
            onClick={handleZoomIn}
            disabled={loading}
            className="p-1 hover:bg-slate-100 border border-slate-200"
            title="Zoom In"
          >
            <ZoomIn size={14} />
          </button>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="w-full h-96 flex flex-col items-center justify-center gap-2 bg-white">
          <div className="w-8 h-8 border-t-2 border-brand animate-spin rounded-full"></div>
          <span className="text-xs text-slate-500 font-medium">Loading document...</span>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="w-full p-8 flex items-center gap-3 bg-red-50 text-red-800 text-sm border-b border-red-100">
          <AlertCircle size={20} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* PDF Page Canvas */}
      {!loading && !error && pdf && (
        <div className="relative overflow-auto p-4 max-w-full flex justify-center bg-slate-100 w-full min-h-[400px]">
          <div className="relative shadow-sm border border-slate-200 bg-white">
            <canvas ref={canvasRef} />
            
            {/* Draw Citation Highlight overlay */}
            {highlightStyle && (
              <div
                style={highlightStyle}
                className="highlight-pulse border-2 border-brand-light bg-indigo-500/25 rounded"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
