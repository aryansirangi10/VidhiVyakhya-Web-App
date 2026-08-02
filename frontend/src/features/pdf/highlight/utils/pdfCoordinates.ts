import { ClauseCoordinate } from "../types/coordinates";

export interface ScaledRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

export function scaleCoordinates(
  coord: ClauseCoordinate,
  zoom: number,
  pageWidth = 600
): ScaledRect {
  const scale = (pageWidth / 600) * zoom;
  return {
    left: coord.x * scale,
    top: coord.y * scale,
    width: coord.width * scale,
    height: coord.height * scale,
  };
}
