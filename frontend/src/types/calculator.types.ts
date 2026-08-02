import { Rule } from './bill.types';
import { ProfileData } from './profile.types';

export interface TriggeredRule extends Rule {
  impact: number;
  explanation: string;
}

export interface CalculationResult {
  bill_id: number;
  title: string;
  total_impact: number;
  explanation: string;
  triggered_rules: TriggeredRule[];
}

export interface CalculationInput {
  bill_id: number;
  profile: ProfileData;
}
