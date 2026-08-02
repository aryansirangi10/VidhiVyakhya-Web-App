import { usePDFContext } from "../context/PDFContext";

export function usePDF() {
  const { document, loading, error, setDocument, setLoading, setError } = usePDFContext();
  return { document, loading, error, setDocument, setLoading, setError };
}

export default usePDF;
