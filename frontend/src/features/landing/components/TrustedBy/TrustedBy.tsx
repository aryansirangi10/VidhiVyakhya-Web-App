import React from "react";
import { Building2, Landmark, Scale, FileText, ShieldAlert } from "lucide-react";

const sources = [
  { name: "Parliament of India", icon: <Landmark size={18} /> },
  { name: "PRS Legislative Research", icon: <Scale size={18} /> },
  { name: "Gazette of India", icon: <FileText size={18} /> },
  { name: "CBDT & Income Tax Dept", icon: <Building2 size={18} /> },
  { name: "Reserve Bank of India (RBI)", icon: <ShieldAlert size={18} /> },
];

export function TrustedBy() {
  return (
    <div className="py-12 border-y border-slate-200 bg-white/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 space-y-6 text-center">
        <p className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
          Grounded In Official Government Data Sources
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-80 hover:opacity-100 transition-opacity">
          {sources.map((src, idx) => (
            <div key={idx} className="flex items-center gap-2 text-slate-700 font-mono text-xs font-bold">
              <span className="text-brand-600">{src.icon}</span>
              <span>{src.name}</span>
            </div>
          ))}
        </div>
        <p className="text-[11px] font-mono text-slate-400 italic">
          * Uses publicly available government gazettes and parliamentary publications as primary sources.
        </p>
      </div>
    </div>
  );
}

export default TrustedBy;
