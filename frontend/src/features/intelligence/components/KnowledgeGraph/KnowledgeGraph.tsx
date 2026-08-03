import React, { useState } from "react";
import { Network, FileText, Scale, Building2, Landmark, ArrowRight, ShieldCheck } from "lucide-react";

interface Node {
  id: string;
  label: string;
  type: "Bill" | "Act" | "Circular" | "Judgment" | "Rule";
  details: string;
}

interface Edge {
  from: string;
  to: string;
  relation: "amends" | "clarifies" | "references" | "interprets";
}

const nodes: Node[] = [
  { id: "1", label: "Finance Bill 2024", type: "Bill", details: "Bill No. 112 of 2024" },
  { id: "2", label: "Income Tax Act 1961", type: "Act", details: "Section 16(ia) & Section 115BAC" },
  { id: "3", label: "CBDT Circular 10/2024", type: "Circular", details: "TDS & Standard Deduction Clarification" },
  { id: "4", label: "Supreme Court Precedent 2023", type: "Judgment", details: "Statutory Interpretation Guidelines" },
];

const edges: Edge[] = [
  { from: "1", to: "2", relation: "amends" },
  { from: "1", to: "3", relation: "clarifies" },
  { from: "2", to: "4", relation: "interprets" },
];

export function KnowledgeGraph() {
  const [selectedNode, setSelectedNode] = useState<Node>(nodes[0]);

  return (
    <div className="rounded-3xl bg-slate-900 text-white p-6 border border-slate-800 space-y-6 font-mono shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 text-brand-400 font-bold text-xs">
          <Network size={18} /> Legislative Knowledge Graph Explorer
        </div>
        <span className="text-[10px] bg-brand-950 text-brand-300 border border-brand-800 px-2 py-0.5 rounded font-bold">
          Graph Relations Active
        </span>
      </div>

      {/* GRAPH VISUAL NODES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {nodes.map((node) => {
          const isSelected = selectedNode.id === node.id;
          return (
            <button
              key={node.id}
              onClick={() => setSelectedNode(node)}
              className={`p-4 rounded-2xl border text-left space-y-2 transition-all ${
                isSelected
                  ? "bg-brand-600/20 border-brand-500 shadow-lg text-white"
                  : "bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700"
              }`}
            >
              <div className="flex justify-between items-center text-[10px] font-bold">
                <span className="text-brand-400 uppercase">{node.type}</span>
                {isSelected && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />}
              </div>
              <h4 className="text-xs font-bold leading-snug">{node.label}</h4>
              <p className="text-[10px] text-slate-400 truncate">{node.details}</p>
            </button>
          );
        })}
      </div>

      {/* NODE RELATIONSHIPS DETAIL */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
        <span className="text-[10px] font-bold text-slate-400 uppercase">Selected Entity Dependencies</span>
        <div className="space-y-1.5 text-slate-300">
          <p className="flex items-center gap-2">
            <strong className="text-brand-400">{selectedNode.label}</strong>
            <ArrowRight size={14} className="text-slate-500" />
            <span>Connected to Income Tax Act 1961 (amends Section 16(ia))</span>
          </p>
          <p className="text-[11px] text-slate-400">
            Grounding Confidence: <strong className="text-emerald-400">98.7% Verified</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default KnowledgeGraph;
