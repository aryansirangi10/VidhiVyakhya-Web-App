import React from "react";
import { Info, ShieldCheck } from "lucide-react";
import { ImpactResult } from "../../types/calculator";

export function ExplanationPanel({ result }: { result: ImpactResult }) {
  return (
    <div className="rounded-2xl bg-amber-500/10 border border-amber-500/30 p-5 space-y-3">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700">
        <Info size={16} /> Grounded Legal Explanation
      </div>
      <p className="text-xs text-slate-700 leading-relaxed font-mono">
        {result.explanation}
      </p>
      <div className="flex flex-wrap gap-2 pt-1 text-[10px] font-mono text-slate-500">
        <span className="flex items-center gap-1 font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
          <ShieldCheck size={12} /> 100% Deterministic Engine
        </span>
        {result.citations.map((c, idx) => (
          <span key={idx} className="bg-slate-200 px-2 py-0.5 rounded text-slate-700 font-bold">
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ExplanationPanel;
