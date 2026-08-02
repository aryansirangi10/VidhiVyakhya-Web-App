import React from "react";
import { GitCompare, Plus, Minus, Edit3, ArrowRight } from "lucide-react";

export function CompareBillsPage() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-6 space-y-8 font-mono">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold">
          <GitCompare size={14} /> Legislative Diff & Version Comparison
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900">Compare Parliamentary Versions</h1>
        <p className="text-xs text-slate-500">Side-by-side transition matrix between Finance Bill 2024 and Finance Bill 2025.</p>
      </div>

      <div className="rounded-3xl bg-white p-6 border border-slate-200 shadow-sm space-y-6">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Base Legislation</span>
            <h3 className="text-sm font-bold text-slate-900">Finance Bill 2024</h3>
          </div>
          <div className="p-4 rounded-2xl bg-brand-50 border border-brand-200 space-y-1">
            <span className="text-[10px] text-brand-700 font-bold uppercase">Proposed Legislation</span>
            <h3 className="text-sm font-bold text-brand-900">Finance Bill 2025</h3>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Statutory Formula Changes</h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900">
              <span className="flex items-center gap-2 font-bold"><Plus size={16} /> Added Standard Deduction</span>
              <span>Increased from ₹50,000 to ₹75,000 (+₹25,000)</span>
            </div>
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900">
              <span className="flex items-center gap-2 font-bold"><Edit3 size={16} /> Modified LTCG Tax Rate</span>
              <span>Adjusted from 10.0% to 12.5% (+2.5%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompareBillsPage;
