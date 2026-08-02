export const privacyEvaluator = {
  id: "privacyCompliance",
  canEvaluate(ruleType) {
    return ruleType === "dpdp_compliance";
  },
  evaluate(rule, profile) {
    const { employment_category } = profile;
    const cond = rule.condition_json || {};
    
    // Checks if the user is a business/employer affected by DPDP penalties
    if (cond.employment_category && cond.employment_category !== employment_category) {
      return null;
    }
    
    const formula = rule.formula_json || {};
    const maxPenalty = formula.max_penalty_crores || 250;
    
    return {
      rule_id: rule.id,
      rule_type: rule.rule_type,
      clause_number: rule.clause_number,
      impact: 0.0, // no direct rupee tax savings/costs
      old_value: "No standardized data privacy penalty structures",
      new_value: `Fines up to ₹${maxPenalty} Cr for security safeguard failures`,
      trace_statement: `Compliance Risk Warning: New penalty guidelines up to ₹${maxPenalty} Cr for business data processing failures`
    };
  }
};
export default privacyEvaluator;
