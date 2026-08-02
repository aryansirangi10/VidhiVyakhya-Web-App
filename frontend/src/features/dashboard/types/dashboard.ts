export interface ExecutiveSummary {
  userName: string;
  billsTrackedCount: number;
  estimatedAnnualSavings: number;
  billsUpdatedThisWeek: number;
  rulesChangedCount: number;
}

export interface SavingsPoint {
  month: string;
  savings: number;
}

export interface DashboardData {
  summary: ExecutiveSummary;
  savingsTrend: SavingsPoint[];
  watchlistTopics: string[];
}
