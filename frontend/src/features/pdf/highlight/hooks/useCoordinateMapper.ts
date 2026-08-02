import { useMemo } from "react";
import { ClauseCoordinate } from "../types/coordinates";
import { scaleCoordinates } from "../utils/pdfCoordinates";

export function useCoordinateMapper(coord: ClauseCoordinate | null, zoom: number) {
  return useMemo(() => {
    if (!coord) return null;
    return scaleCoordinates(coord, zoom);
  }, [coord, zoom]);
}

export default useCoordinateMapper;
