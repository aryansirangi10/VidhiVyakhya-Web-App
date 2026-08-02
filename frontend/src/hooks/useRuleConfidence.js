import { useMemo } from 'react';

/**
 * Maps database indicators to color badges and descriptions
 * @param {Object} rule - Rule database properties
 */
export function useRuleConfidence(rule) {
  return useMemo(() => {
    if (!rule) {
      return {
        badgeColor: "bg-slate-100 text-slate-600 border-slate-200",
        indicatorColor: "bg-slate-400",
        label: "Unknown Rule",
        percentage: 0
      };
    }

    const confPercent = Math.round((rule.confidence || 0) * 100);

    // 1. Check if demo rule
    if (rule.is_demo_rule || rule.checksum?.includes("demo")) {
      return {
        badgeColor: "bg-slate-50 text-slate-600 border-slate-200",
        indicatorColor: "bg-slate-400",
        label: "Demo Dataset",
        percentage: confPercent
      };
    }

    // 2. Check if Human Reviewed
    if (rule.reviewed) {
      return {
        badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
        indicatorColor: "bg-emerald-500",
        label: "Human Reviewed",
        percentage: confPercent
      };
    }

    // 3. AI Extracted
    if (confPercent >= 90) {
      return {
        badgeColor: "bg-indigo-50 text-indigo-800 border-indigo-200",
        indicatorColor: "bg-indigo-500",
        label: "AI Verified",
        percentage: confPercent
      };
    }

    // 4. Awaiting Review (low confidence or non-reviewed)
    return {
      badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
      indicatorColor: "bg-amber-500",
      label: "Awaiting Review",
      percentage: confPercent
    };
  }, [rule]);
}

export default useRuleConfidence;
