import React from "react";
import { Activity, ShieldCheck, Clock, CheckCircle2, AlertOctagon } from "lucide-react";
import StatWidget from "../../../components/widgets/StatWidget";

export function AIEvaluationPage() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-6 space-y-8 font-mono">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
          <Activity size={14} /> AI Quality & Hallucination Observatory
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900">AI Model Grounding Metrics</h1>
        <p className="text-xs text-slate-500">Live monitoring of statutory retrieval latency, sentence-level hallucination rates, and citation coverage.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatWidget title="Grounding Score" value="98.7%" change="+0.4%" isPositive icon={<ShieldCheck size={20} />} />
        <StatWidget title="Hallucination Rate" value="0.0%" change="Clean" isPositive icon={<CheckCircle2 size={20} />} />
        <StatWidget title="Citation Coverage" value="100%" change="Strict" isPositive icon={<Activity size={20} />} />
        <StatWidget title="Avg AI Latency" value="1.4s" change="-200ms" isPositive icon={<Clock size={20} />} />
      </div>

      <div className="rounded-3xl bg-slate-900 text-white p-6 border border-slate-800 space-y-4 shadow-xl">
        <h3 className="text-xs font-bold uppercase tracking-wider text-brand-400">Benchmark Model Audit Log</h3>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between p-3 rounded-2xl bg-slate-950 border border-slate-800">
            <span>Query: "Section 115BAC Slabs"</span>
            <span className="text-emerald-400 font-bold">Grounded • 1.2s • 100% Citations</span>
          </div>
          <div className="flex justify-between p-3 rounded-2xl bg-slate-950 border border-slate-800">
            <span>Query: "Standard Deduction Clause"</span>
            <span className="text-emerald-400 font-bold">Grounded • 1.4s • 100% Citations</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIEvaluationPage;
