import { ClauseCoordinate } from "../types/coordinates";

export const coordinateService = {
  isValid(coord?: ClauseCoordinate | null): boolean {
    return !!coord && coord.x >= 0 && coord.y >= 0 && coord.width > 0 && coord.height > 0;
  },
};

export default coordinateService;
