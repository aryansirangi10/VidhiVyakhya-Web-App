import React, { createContext, useContext, useState, ReactNode } from "react";
import { PDFDocument, PDFError } from "../types/pdf";
import { clamp } from "../utils/pdfHelpers";

export interface PDFContextType {
  document: PDFDocument | null;
  currentPage: number;
  totalPages: number;
  zoom: number;
  rotation: number;
  loading: boolean;
  error: PDFError | null;
  isFullscreen: boolean;
  setDocument: (doc: PDFDocument | null) => void;
  setTotalPages: (pages: number) => void;
  setPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  setZoom: (zoom: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  rotate: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: PDFError | null) => void;
  toggleFullscreen: () => void;
}

const PDFContext = createContext<PDFContextType | undefined>(undefined);

export function PDFProvider({ children }: { children: ReactNode }) {
  const [doc, setDoc] = useState<PDFDocument | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [zoom, setZoomState] = useState(1.0);
  const [rotation, setRotationState] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<PDFError | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const setPage = (page: number) => {
    setCurrentPage(clamp(page, 1, totalPages || 1));
  };

  const nextPage = () => setPage(currentPage + 1);
  const prevPage = () => setPage(currentPage - 1);

  const setZoom = (z: number) => setZoomState(clamp(z, 0.5, 3.0));
  const zoomIn = () => setZoom(zoom + 0.25);
  const zoomOut = () => setZoom(zoom - 0.25);

  const rotate = () => setRotationState((prev) => (prev + 90) % 360);

  const toggleFullscreen = () => setIsFullscreen((prev) => !prev);

  return (
    <PDFContext.Provider
      value={{
        document: doc,
        currentPage,
        totalPages,
        zoom,
        rotation,
        loading,
        error,
        isFullscreen,
        setDocument: setDoc,
        setTotalPages,
        setPage,
        nextPage,
        prevPage,
        setZoom,
        zoomIn,
        zoomOut,
        rotate,
        setLoading,
        setError,
        toggleFullscreen,
      }}
    >
      {children}
    </PDFContext.Provider>
  );
}

export function usePDFContext() {
  const context = useContext(PDFContext);
  if (!context) {
    throw new Error("usePDFContext must be used within a PDFProvider");
  }
  return context;
}
