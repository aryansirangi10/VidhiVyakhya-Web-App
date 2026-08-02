import { usePDFContext } from "../context/PDFContext";

export function usePage() {
  const { currentPage, totalPages, setPage, nextPage, prevPage, setTotalPages } = usePDFContext();
  return { currentPage, totalPages, setPage, nextPage, prevPage, setTotalPages };
}

export default usePage;
