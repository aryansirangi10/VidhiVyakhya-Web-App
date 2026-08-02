import React from "react";
import { FileText, TrendingUp, Sparkles, AlertCircle } from "lucide-react";
import { ExecutiveSummary as SummaryType } from "../../types/dashboard";

export function ExecutiveSummary({ summary }: { summary: SummaryType }) {
  return (
    <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-2xl border border-slate-800 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-400 font-mono">
            Personal Command Center
          </span>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Welcome back, {summary.userName}
          </h2>
        </div>
        <span className="text-xs text-emerald-400 bg-slate-800 px-3 py-1.5 rounded-full font-mono border border-slate-700 font-bold">
          <Sparkles size={14} className="inline mr-1 text-brand-400" /> Live Ingestion Active
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
        <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60 space-y-1">
          <div className="text-slate-400 text-xs font-mono flex items-center gap-1.5">
            <FileText size={14} className="text-brand-400" /> Tracked Bills
          </div>
          <div className="text-2xl font-black text-white font-mono">{summary.billsTrackedCount}</div>
        </div>

        <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60 space-y-1">
          <div className="text-slate-400 text-xs font-mono flex items-center gap-1.5">
            <TrendingUp size={14} className="text-emerald-400" /> Annual Savings
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">
            ₹{summary.estimatedAnnualSavings.toLocaleString("en-IN")}
          </div>
        </div>

        <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60 space-y-1">
          <div className="text-slate-400 text-xs font-mono flex items-center gap-1.5">
            <AlertCircle size={14} className="text-amber-400" /> Weekly Updates
          </div>
          <div className="text-2xl font-black text-amber-400 font-mono">{summary.billsUpdatedThisWeek}</div>
        </div>

        <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60 space-y-1">
          <div className="text-slate-400 text-xs font-mono flex items-center gap-1.5">
            <Sparkles size={14} className="text-brand-400" /> Rules Changed
          </div>
          <div className="text-2xl font-black text-white font-mono">{summary.rulesChangedCount}</div>
        </div>
      </div>
    </div>
  );
}

export default ExecutiveSummary;
