import { calculateCapitalGains } from '../taxCalculator';

export const capitalGainsEvaluator = {
  id: "capitalGains",
  canEvaluate(ruleType) {
    return ruleType === "capital_gains";
  },
  evaluate(rule, profile) {
    const { equity_ltsg } = profile;
    if (!equity_ltsg || equity_ltsg <= 0) return null;
    
    const formula = rule.formula_json || {};
    const oldRate = formula.old_rate || 0.10;
    const newRate = formula.new_rate || 0.125;
    const oldEx = formula.old_exemption || 100000;
    const newEx = formula.new_exemption || 125000;
    
    const res = calculateCapitalGains(equity_ltsg, oldRate, newRate, oldEx, newEx);
    if (res.netDiff === 0) return null;
    
    const isCost = res.netDiff < 0;
    const absDiff = Math.abs(res.netDiff);
    
    return {
      rule_id: rule.id,
      rule_type: rule.rule_type,
      clause_number: rule.clause_number,
      impact: res.netDiff, // negative if cost increases
      old_value: `LTCG Rate: ${(oldRate * 100).toFixed(1)}% (Exemption Limit: ₹${oldEx.toLocaleString('en-IN')})`,
      new_value: `LTCG Rate: ${(newRate * 100).toFixed(1)}% (Exemption Limit: ₹${newEx.toLocaleString('en-IN')})`,
      trace_statement: isCost
        ? `LTCG rate increase to ${(newRate * 100).toFixed(1)}% added a net tax cost of ₹${absDiff.toLocaleString('en-IN')}`
        : `LTCG exemption expansion saved ₹${absDiff.toLocaleString('en-IN')} on capital gains`
    };
  }
};
