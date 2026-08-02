import { evaluateRules } from './ruleEngine';

/**
 * orchestrates rule engine outputs, visual breakdowns, and step-by-step trace statements.
 */
export function evaluateImpact(rules, profile) {
  // 1. Run matching rules
  const matchedRules = evaluateRules(rules, profile);
  
  // 2. Sum impact
  let totalImpact = 0;
  let hasComplianceAlert = false;
  
  const trace = [];
  matchedRules.forEach(rule => {
    totalImpact += rule.impact;
    if (rule.rule_type === "dpdp_compliance") {
      hasComplianceAlert = true;
    }
    if (rule.trace_statement) {
      trace.push(rule.trace_statement);
    }
  });

  // 3. Compute base tax and cess breakdown (Cess is 4% of direct income tax in India)
  // net_impact = base_tax * 1.04
  // base_tax = net_impact / 1.04
  // cess = net_impact - base_tax
  let taxPortion = 0;
  let cessPortion = 0;
  let surchargePortion = 0; // Simple surcharge tracking

  if (totalImpact !== 0) {
    taxPortion = Math.round(totalImpact / 1.04);
    cessPortion = Math.round(totalImpact - taxPortion);
  }

  // 4. Build standard trace explanations
  if (matchedRules.length === 0) {
    trace.push("No relevant regulatory clauses or tax modifications matched this profile.");
  } else {
    trace.unshift(`Successfully matched ${matchedRules.length} legislative clauses for this profile.`);
    trace.push(`Cumulative Net Outcome: ${totalImpact >= 0 ? '+' : ''}₹${totalImpact.toLocaleString('en-IN')}`);
  }

  return {
    impact: totalImpact,
    matchedRules,
    hasComplianceAlert,
    breakdown: {
      tax: taxPortion,
      cess: cessPortion,
      surcharge: surchargePortion
    },
    trace
  };
}
export default evaluateImpact;
