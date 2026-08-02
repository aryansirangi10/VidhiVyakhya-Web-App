import { usePDFContext } from "../Context/PDFContext";

export function useRotation() {
  const { rotation, rotate } = usePDFContext();
  return { rotation, rotate };
}

export default useRotation;
