import React from "react";
import { Sparkles, FileText } from "lucide-react";
import { useActiveClause } from "../../hooks/useActiveClause";

export function ActiveClauseIndicator() {
  const { activeClause } = useActiveClause();

  if (!activeClause) return null;

  return (
    <div className="flex items-center justify-between rounded-xl bg-brand-900 px-4 py-2.5 text-white shadow-lg border border-brand-700 animate-pulse">
      <div className="flex items-center gap-2 text-xs font-mono font-bold">
        <Sparkles size={16} className="text-amber-400" />
        <span>Active Focus: {activeClause.clauseId} (Page {activeClause.page})</span>
      </div>
      <span className="text-[11px] font-semibold text-emerald-400 bg-slate-800 px-2 py-0.5 rounded-full">
        {(activeClause.confidence * 100).toFixed(0)}% Grounded
      </span>
    </div>
  );
}

export default ActiveClauseIndicator;
