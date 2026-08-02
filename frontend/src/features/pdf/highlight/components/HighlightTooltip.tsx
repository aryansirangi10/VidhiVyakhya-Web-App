import React from "react";
import { ShieldCheck, FileText } from "lucide-react";
import { HighlightTooltipData } from "../types/highlight";

export function HighlightTooltip({ data }: { data: HighlightTooltipData }) {
  return (
    <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-1.5 text-white shadow-xl text-xs font-mono border border-slate-700 whitespace-nowrap pointer-events-none">
      <FileText size={14} className="text-brand-400" />
      <span>{data.clauseId} • {data.section} (Page {data.page})</span>
      <span className="text-[10px] text-emerald-400 bg-slate-800 px-1.5 py-0.5 rounded-full font-bold">
        <ShieldCheck size={10} className="inline mr-0.5" />
        {(data.confidence * 100).toFixed(0)}%
      </span>
    </div>
  );
}

export default HighlightTooltip;
