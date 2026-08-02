import { useMemo } from 'react';
import { evaluateImpact } from '../engine/impactEvaluator';

/**
 * useImpactSimulator - Evaluates a financial profile against a list of rules locally
 * @param {Object} profile - Profile configuration
 * @param {Array} rules - Rules list extracted for the active bill
 */
export function useImpactSimulator(profile, rules) {
  return useMemo(() => {
    if (!profile || !rules || rules.length === 0) {
      return {
        impact: 0,
        matchedRules: [],
        hasComplianceAlert: false,
        breakdown: { tax: 0, cess: 0, surcharge: 0 },
        trace: ["Enter your profile details to evaluate personal impact."]
      };
    }
    
    return evaluateImpact(rules, profile);
  }, [profile, rules]);
}

export default useImpactSimulator;
