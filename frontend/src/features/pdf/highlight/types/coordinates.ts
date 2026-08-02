export interface ClauseCoordinate {
  clauseId: string;
  page: number;
  paragraph: number;
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
  checksum: string;
}

export type HighlightState = "normal" | "hovered" | "selected" | "active" | "previouslyViewed";
