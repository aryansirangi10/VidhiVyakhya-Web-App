import React from "react";
import { Check, X, AlertTriangle } from "lucide-react";

const features = [
  { name: "Parliamentary PDF Upload & Ingestion", vidhi: true, pdfReader: true, genericAI: false },
  { name: "Precision Clause Bounding-Box Highlighting", vidhi: true, pdfReader: false, genericAI: false },
  { name: "Deterministic Personal Financial Impact Engine", vidhi: true, pdfReader: false, genericAI: false },
  { name: "100% Grounded Citation System (Zero Hallucinations)", vidhi: true, pdfReader: false, genericAI: "warning" },
  { name: "Section 115BAC Income Tax Formula Calculation", vidhi: true, pdfReader: false, genericAI: false },
  { name: "Live Government Gazette Feed & Watchlist Alerts", vidhi: true, pdfReader: false, genericAI: false },
];

export function Comparison() {
  return (
    <section className="py-20 bg-slate-900 text-white border-y border-slate-800 font-mono">
      <div className="max-w-5xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-extrabold tracking-tight">Why VidhiVyakhya Stands Apart</h2>
          <p className="text-xs text-slate-400 max-w-xl mx-auto">
            Traditional PDF viewers force manual legal reading, while generic AI tools hallucinate statutory math. VidhiVyakhya combines grounded AI with deterministic formula calculation.
          </p>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-950/60 shadow-2xl">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/80">
                <th className="p-4 font-bold text-slate-300">Feature Capabilities</th>
                <th className="p-4 font-bold text-brand-400 bg-brand-950/40">VidhiVyakhya 2.0</th>
                <th className="p-4 font-bold text-slate-400">Standard PDF Reader</th>
                <th className="p-4 font-bold text-slate-400">Generic Chat AI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {features.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                  <td className="p-4 font-semibold text-slate-200">{item.name}</td>
                  <td className="p-4 bg-brand-950/20">
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-400">
                      <Check size={16} /> Supported
                    </span>
                  </td>
                  <td className="p-4">
                    {item.pdfReader ? (
                      <span className="text-emerald-400"><Check size={16} /></span>
                    ) : (
                      <span className="text-slate-600"><X size={16} /></span>
                    )}
                  </td>
                  <td className="p-4">
                    {item.genericAI === "warning" ? (
                      <span className="inline-flex items-center gap-1 text-amber-400 font-bold">
                        <AlertTriangle size={14} /> Risk
                      </span>
                    ) : item.genericAI ? (
                      <span className="text-emerald-400"><Check size={16} /></span>
                    ) : (
                      <span className="text-slate-600"><X size={16} /></span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Comparison;
