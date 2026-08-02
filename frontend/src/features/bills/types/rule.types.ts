export interface Rule {
  id: string;
  ruleNumber: string;
  condition: string;
  effect: string;
  sourceClause: string;
  confidence: number;
  isHumanReviewed: boolean;
  status: "Human Reviewed" | "Verified" | "Pending Review" | "AI Generated";
}

export interface TimelineEvent {
  id: string;
  stage: string;
  date: string;
  description: string;
  reference: string;
  isCompleted: boolean;
}
