import { ClauseCoordinate } from "../types/coordinates";

const cache = new Map<string, ClauseCoordinate>();

export const cacheService = {
  get(key: string): ClauseCoordinate | undefined {
    return cache.get(key);
  },
  set(key: string, value: ClauseCoordinate): void {
    cache.set(key, value);
  },
};

export default cacheService;
