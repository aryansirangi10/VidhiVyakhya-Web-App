export interface UserProfile {
  annualIncome: number;
  age: number;
  employment: "salaried" | "business" | "professional" | "freelance";
  taxRegime: "new" | "old";
  state: string;
  capitalGains: number;
  otherIncome: number;
  deductions: number;
  disability: boolean;
  seniorCitizen: boolean;
}

export interface TaxBreakdown {
  baseTax: number;
  cess: number;
  surcharge: number;
  rebate: number;
  deduction: number;
}

export interface ImpactResult {
  before: number;
  after: number;
  difference: number;
  breakdown: TaxBreakdown;
  matchedRules: string[];
  citations: string[];
  explanation: string;
}
