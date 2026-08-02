export interface ActiveClause {
  clauseId: string;
  page: number;
  paragraph: number;
  ruleId: string;
  confidence: number;
  summary: string;
}

export interface RuleLocation {
  id: string;
  ruleId: string;
  clauseId: string;
  page: number;
  paragraph: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  confidence: number;
  summary: string;
}

export interface RuleItem {
  id: string;
  ruleNumber: string;
  title: string;
  summary: string;
  category: string;
  affectedUsers: string[];
  impact: string;
  clause: string;
  confidence: number;
  isHumanReviewed: boolean;
  page: number;
  paragraph: number;
}
