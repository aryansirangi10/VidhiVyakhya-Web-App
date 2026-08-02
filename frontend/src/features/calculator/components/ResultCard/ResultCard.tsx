import React from "react";
import { TrendingDown, Sparkles } from "lucide-react";
import { ImpactResult } from "../../types/calculator";
import { formatCurrency } from "../../utils/formatter";

export function ResultCard({ result }: { result: ImpactResult }) {
  return (
    <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-2xl space-y-6 border border-slate-800 relative overflow-hidden">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-400 flex items-center gap-1.5 font-mono">
          <Sparkles size={14} /> Estimated Personal Savings
        </span>
        <span className="text-xs text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2.5 py-1 rounded-full font-bold">
          <TrendingDown size={14} className="inline mr-1" />
          Tax Reduced
        </span>
      </div>

      <div className="space-y-1">
        <div className="text-4xl font-black text-emerald-400 font-mono tracking-tight">
          +{formatCurrency(result.difference)}
        </div>
        <p className="text-xs text-slate-400 font-medium">Net annual financial benefit under Finance Bill 2024</p>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800 text-xs font-mono">
        <div className="bg-slate-800/60 p-3 rounded-2xl border border-slate-700/50">
          <div className="text-slate-400 text-[10px]">Previous Tax</div>
          <div className="text-slate-200 font-bold text-sm">{formatCurrency(result.before)}</div>
        </div>
        <div className="bg-slate-800/60 p-3 rounded-2xl border border-slate-700/50">
          <div className="text-slate-400 text-[10px]">New Tax Liability</div>
          <div className="text-emerald-400 font-bold text-sm">{formatCurrency(result.after)}</div>
        </div>
      </div>
    </div>
  );
}

export default ResultCard;
