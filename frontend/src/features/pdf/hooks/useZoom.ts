import { usePDFContext } from "../context/PDFContext";

export function useZoom() {
  const { zoom, setZoom, zoomIn, zoomOut } = usePDFContext();
  return { zoom, setZoom, zoomIn, zoomOut };
}

export default useZoom;
