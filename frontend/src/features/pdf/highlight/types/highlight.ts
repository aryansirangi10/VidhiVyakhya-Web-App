import { ClauseCoordinate, HighlightState } from "./coordinates";

export interface HighlightItem {
  id: string;
  ruleId: string;
  coordinate: ClauseCoordinate;
  isPrimary: boolean;
  state: HighlightState;
}

export interface HighlightTooltipData {
  clauseId: string;
  section: string;
  page: number;
  paragraph: number;
  confidence: number;
  isVerified: boolean;
}
