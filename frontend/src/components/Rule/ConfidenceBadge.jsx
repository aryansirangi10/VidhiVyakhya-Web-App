import React from 'react';
import { useRuleConfidence } from '../../hooks/useRuleConfidence';

export function ConfidenceBadge({ rule }) {
  const { badgeColor, indicatorColor, label, percentage } = useRuleConfidence(rule);

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-wider border ${badgeColor}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${indicatorColor}`}></span>
      {label} {percentage > 0 && `(${percentage}%)`}
    </span>
  );
}

export default ConfidenceBadge;
