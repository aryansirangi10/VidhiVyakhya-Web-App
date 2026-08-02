import React from 'react';

export function RuleMatch({ matchedRules = [] }) {
  const total = matchedRules.length;
  const audited = matchedRules.filter(r => r.reviewed).length;
  const demo = matchedRules.filter(r => r.is_demo_rule || r.checksum?.includes("demo")).length;
  const pending = total - audited - demo;

  return (
    <div className="border border-slate-200 bg-slate-50 p-4 rounded-sm flex items-center justify-between gap-4">
      <div>
        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
          Calculations Grounding
        </span>
        <span className="text-xs font-bold text-slate-800">
          Matched Rules Breakdown
        </span>
      </div>

      <div className="flex gap-4 text-center">
        <div>
          <span className="text-lg font-bold text-brand font-mono">{total}</span>
          <span className="text-[9px] text-slate-400 block uppercase tracking-wider">Matched</span>
        </div>
        <div>
          <span className="text-lg font-bold text-emerald-600 font-mono">{audited}</span>
          <span className="text-[9px] text-slate-400 block uppercase tracking-wider">Audited</span>
        </div>
        {pending > 0 && (
          <div>
            <span className="text-lg font-bold text-amber-600 font-mono">{pending}</span>
            <span className="text-[9px] text-slate-400 block uppercase tracking-wider">Pending</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default RuleMatch;
