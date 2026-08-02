import { calculateSlabsDiff, calculateStandardDeduction, getMarginalRate } from '../taxCalculator';

export const incomeTaxEvaluator = {
  id: "incomeTax",
  canEvaluate(ruleType) {
    return ruleType === "tax_slab" || ruleType === "standard_deduction";
  },
  evaluate(rule, profile) {
    const { annual_income, tax_regime, employment_category } = profile;
    const cond = rule.condition_json || {};
    
    // Check regime match
    if (cond.tax_regime && cond.tax_regime !== tax_regime) {
      return null;
    }
    
    if (rule.rule_type === "standard_deduction") {
      // Check employment categories match
      if (cond.employment_category && cond.employment_category !== employment_category) {
        return null;
      }
      
      const formula = rule.formula_json || {};
      const oldD = formula.old_deduction || 50000;
      const newD = formula.new_deduction || 75000;
      
      // Determine marginal tax rate based on current income (using standard fallback new slabs)
      const mockSlabs = [
        [300000, 0.0],
        [700000, 0.05],
        [1000000, 0.10],
        [1200000, 0.15],
        [1500000, 0.20],
        [null, 0.30]
      ];
      const rate = getMarginalRate(annual_income, mockSlabs);
      const res = calculateStandardDeduction(employment_category, oldD, newD, rate);
      
      if (res.savings === 0) return null;
      
      return {
        rule_id: rule.id,
        rule_type: rule.rule_type,
        clause_number: rule.clause_number,
        impact: res.savings,
        old_value: `Standard Deduction: ₹${oldD.toLocaleString('en-IN')}`,
        new_value: `Standard Deduction: ₹${newD.toLocaleString('en-IN')}`,
        trace_statement: `Applied Standard Deduction saving of ₹${res.savings.toLocaleString('en-IN')} based on a marginal rate of ${(rate * 100).toFixed(1)}%`
      };
    }
    
    if (rule.rule_type === "tax_slab") {
      const formula = rule.formula_json || {};
      const oldSlabs = formula.old_slabs;
      const newSlabs = formula.new_slabs;
      
      if (!oldSlabs || !newSlabs) return null;
      
      const res = calculateSlabsDiff(annual_income, oldSlabs, newSlabs);
      if (res.netDiff === 0) return null;
      
      return {
        rule_id: rule.id,
        rule_type: rule.rule_type,
        clause_number: rule.clause_number,
        impact: res.netDiff,
        old_value: "Older tax slabs (5% starts from ₹3,00,000 to ₹6,00,000)",
        new_value: "Revised tax slabs (5% expanded from ₹3,00,000 to ₹7,00,000)",
        trace_statement: `Tax Slabs Adjustment: Saved ₹${res.netDiff.toLocaleString('en-IN')} (including 4% Cess) under revised bracket slabs`
      };
    }
    
    return null;
  }
};
