export interface ProfileData {
  annual_income: number;
  age: number;
  tax_regime: 'new' | 'old' | string;
  state: string;
  employment_category: 'salaried' | 'business' | string;
  equity_ltsg?: number;
}

export interface Profile {
  id: number;
  name: string;
  profile_data: ProfileData;
  display_name?: string;
  avatar?: string;
  color?: string;
  default_profile?: boolean;
}

export interface ProfileCreateInput {
  name: string;
  profile_data: ProfileData;
  display_name?: string;
  avatar?: string;
  color?: string;
  default_profile?: boolean;
}
