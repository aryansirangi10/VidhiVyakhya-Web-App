import { usePDFContext } from "../context/PDFContext";

export function useRotation() {
  const { rotation, rotate } = usePDFContext();
  return { rotation, rotate };
}

export default useRotation;
