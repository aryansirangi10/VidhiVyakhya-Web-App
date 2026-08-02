import { ClauseCoordinate } from "../types/coordinates";

export const MOCK_COORDINATES: Record<string, ClauseCoordinate> = {
  "c4": {
    clauseId: "Clause 4",
    page: 14,
    paragraph: 2,
    x: 183,
    y: 642,
    width: 284,
    height: 81,
    confidence: 0.98,
    checksum: "sha256:clause4",
  },
  "c12": {
    clauseId: "Clause 12",
    page: 32,
    paragraph: 4,
    x: 120,
    y: 340,
    width: 310,
    height: 95,
    confidence: 0.99,
    checksum: "sha256:clause12",
  },
};

export const highlightService = {
  async getClauseCoordinate(clauseId: string): Promise<ClauseCoordinate | null> {
    return MOCK_COORDINATES[clauseId.toLowerCase().replace(/\s+/g, "")] || MOCK_COORDINATES["c4"];
  },
};

export default highlightService;
