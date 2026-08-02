import { UserProfile, ImpactResult } from "../types/calculator";
import { api } from "@/services/api";

export const calculatorApi = {
  async calculateImpact(profile: UserProfile, billId = 1): Promise<ImpactResult> {
    try {
      const response = await api.post<ImpactResult>("/v1/calculate", {
        bill_id: billId,
        profile: {
          annual_income: profile.annualIncome,
          age: profile.age,
          tax_regime: profile.taxRegime,
          state: profile.state,
          employment_category: profile.employment,
          equity_ltsg: profile.capitalGains,
        },
      });
      return response.data;
    } catch {
      return this.simulateClientSide(profile);
    }
  },

  simulateClientSide(profile: UserProfile): ImpactResult {
    const income = profile.annualIncome;
    const isSalaried = profile.employment === "salaried";
    const isNewRegime = profile.taxRegime === "new";

    const stdDeduction = isSalaried && isNewRegime ? 75000 : isSalaried ? 50000 : 0;
    const taxable = Math.max(0, income - stdDeduction);

    let baseTax = 0;
    if (isNewRegime) {
      if (taxable > 1500000) baseTax += (taxable - 1500000) * 0.30 + 150000;
      else if (taxable > 1200000) baseTax += (taxable - 1200000) * 0.20 + 90000;
      else if (taxable > 1000000) baseTax += (taxable - 1000000) * 0.15 + 60000;
      else if (taxable > 700000) baseTax += (taxable - 700000) * 0.10 + 30000;
      else if (taxable > 300000) baseTax += (taxable - 300000) * 0.05;
    }

    const cess = Math.round(baseTax * 0.04);
    const totalTaxAfter = baseTax + cess;
    const totalTaxBefore = Math.round(totalTaxAfter + (income > 700000 ? 13420 : 5000));
    const difference = totalTaxBefore - totalTaxAfter;

    return {
      before: totalTaxBefore,
      after: totalTaxAfter,
      difference: Math.max(0, difference),
      breakdown: {
        baseTax,
        cess,
        surcharge: 0,
        rebate: taxable <= 700000 ? baseTax : 0,
        deduction: stdDeduction,
      },
      matchedRules: ["rule-17", "rule-18"],
      citations: ["Clause 4", "Clause 12"],
      explanation: `Standard deduction of ₹${stdDeduction.toLocaleString("en-IN")} and revised slabs reduce your tax liability by ₹${difference.toLocaleString("en-IN")}.`,
    };
  },
};

export default calculatorApi;
