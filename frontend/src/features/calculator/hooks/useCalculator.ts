import { useState, useMemo } from "react";
import { UserProfile, ImpactResult } from "../types/calculator";
import { calculatorApi } from "../services/calculator.api";

const DEFAULT_PROFILE: UserProfile = {
  annualIncome: 1200000,
  age: 32,
  employment: "salaried",
  taxRegime: "new",
  state: "Maharashtra",
  capitalGains: 0,
  otherIncome: 0,
  deductions: 0,
  disability: false,
  seniorCitizen: false,
};

export function useCalculator() {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);

  // Fast 8ms local simulation calculation
  const result: ImpactResult = useMemo(() => {
    return calculatorApi.simulateClientSide(profile);
  }, [profile]);

  return {
    profile,
    setProfile,
    result,
  };
}

export default useCalculator;
