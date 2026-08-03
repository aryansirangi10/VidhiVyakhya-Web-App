import React, { useState, useEffect } from "react";
import {
  FileText,
  Search,
  Bookmark,
  GitCompare,
  Sparkles,
  Calculator,
  Share2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  ShieldCheck,
  CheckCircle2,
  ListTree,
  MessageSquare,
  Network,
} from "lucide-react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { PDFHighlight } from "../types/pdf";
import { pdfApi } from "../services/pdf.api";

export function PDFWorkspacePage() {
  const [highlights, setHighlights] = useState<PDFHighlight[]>([]);
  const [activeClause, setActiveClause] = useState<PDFHighlight | null>(null);
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [activeLeftTab, setActiveLeftTab] = useState<"outline" | "search" | "bookmarks" | "graph">("outline");
  const [searchQuery, setSearchQuery] = useState("");
  const [zoomLevel, setZoomLevel] = useState(100);

  useEffect(() => {
    pdfApi.getHighlights("1").then((data) => {
      setHighlights(data);
      if (data.length > 0) setActiveClause(data[0]);
    });
  }, []);

  return (
    <div className="flex h-screen w-full bg-slate-950 text-white font-mono overflow-hidden selection:bg-brand-500 selection:text-white">
      {/* 1. LEFT SIDEBAR NAVIGATION (280px) */}
      <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col h-full shrink-0 select-none">
        {/* TOP TABS */}
        <div className="flex border-b border-slate-800 p-2 gap-1 text-[11px] font-bold">
          <button
            onClick={() => setActiveLeftTab("outline")}
            className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1 transition-all ${
              activeLeftTab === "outline" ? "bg-brand-600 text-white shadow-md" : "text-slate-400 hover:bg-slate-800"
            }`}
          >
            <ListTree size={14} /> Outline
          </button>
          <button
            onClick={() => setActiveLeftTab("search")}
            className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1 transition-all ${
              activeLeftTab === "search" ? "bg-brand-600 text-white shadow-md" : "text-slate-400 hover:bg-slate-800"
            }`}
          >
            <Search size={14} /> Search
          </button>
          <button
            onClick={() => setActiveLeftTab("graph")}
            className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1 transition-all ${
              activeLeftTab === "graph" ? "bg-brand-600 text-white shadow-md" : "text-slate-400 hover:bg-slate-800"
            }`}
          >
            <Network size={14} /> Graph
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs scrollbar-thin">
          {activeLeftTab === "outline" && (
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold uppercase text-slate-400">Chapters & Clauses</h4>
              <div className="space-y-1 text-slate-300">
                <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/60 font-bold">
                  Chapter I — Preliminary
                </div>
                <div
                  onClick={() => setActiveClause(highlights[0])}
                  className="p-2.5 rounded-xl hover:bg-slate-800 cursor-pointer border border-transparent hover:border-slate-700 flex items-center justify-between text-emerald-400 font-bold"
                >
                  <span>Clause 4 — Sec 16(ia)</span>
                  <span className="text-[9px] bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded">₹75k</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/60 font-bold">
                  Chapter II — Direct Taxes
                </div>
                <div
                  onClick={() => setActiveClause(highlights[1])}
                  className="p-2.5 rounded-xl hover:bg-slate-800 cursor-pointer border border-transparent hover:border-slate-700 flex items-center justify-between text-brand-300 font-bold"
                >
                  <span>Clause 12 — Sec 115BAC</span>
                  <span className="text-[9px] bg-brand-950 text-brand-300 px-1.5 py-0.5 rounded">Slabs</span>
                </div>
              </div>
            </div>
          )}

          {activeLeftTab === "graph" && (
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold uppercase text-slate-400">Statutory Graph Precedents</h4>
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-[11px]">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <FileText size={12} /> Clause 4 (Finance Bill 2024)
                </div>
                <div className="pl-3 border-l-2 border-slate-800 space-y-1 text-slate-400">
                  <p>↳ amends Income Tax Act 1961</p>
                  <p>↳ clarifies CBDT Circular 10/2024</p>
                  <p>↳ cited in SC Case 2023</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* 2. CENTER CANVAS WORKSPACE */}
      <main className="flex-1 flex flex-col h-full min-w-0 bg-slate-950 relative">
        {/* TOOLBAR */}
        <header className="h-12 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between text-xs select-none shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-200">Finance Bill 2024 (Official PDF)</span>
            <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800 font-bold">
              98% Grounded
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCompareMode(!isCompareMode)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all ${
                isCompareMode
                  ? "bg-brand-600 text-white border-brand-500"
                  : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
              }`}
            >
              <GitCompare size={14} /> Split Compare Mode
            </button>
            <div className="h-4 w-[1px] bg-slate-800" />
            <button onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))} className="p-1 text-slate-400 hover:text-white">
              <ZoomOut size={16} />
            </button>
            <span className="text-[10px] font-bold text-slate-400">{zoomLevel}%</span>
            <button onClick={() => setZoomLevel(Math.min(200, zoomLevel + 10))} className="p-1 text-slate-400 hover:text-white">
              <ZoomIn size={16} />
            </button>
          </div>
        </header>

        {/* FLOATING PERSONAL IMPACT BADGE */}
        <div className="absolute top-16 left-6 z-30 bg-slate-900/90 border border-emerald-500/40 text-emerald-400 px-4 py-2 rounded-2xl shadow-xl backdrop-blur-md flex items-center gap-3 text-xs font-mono">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Clauses affecting your profile: <strong className="text-white">7</strong></span>
          <span className="border-l border-slate-800 pl-3 font-bold text-white">Net Savings: +₹18,450</span>
        </div>

        {/* CANVAS CANVAS AREA (SINGLE OR SPLIT) */}
        <div className="flex-1 overflow-auto p-8 flex justify-center gap-6 scrollbar-thin">
          {/* PRIMARY PDF CANVAS */}
          <div
            className="bg-white text-slate-900 rounded-2xl shadow-2xl p-10 max-w-2xl w-full min-h-[900px] relative space-y-6 text-xs leading-relaxed font-serif transition-transform"
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: "top center" }}
          >
            <div className="border-b pb-4 text-center space-y-1">
              <h2 className="text-base font-bold font-sans">AS INTRODUCED IN LOK SABHA</h2>
              <p className="text-[10px] text-slate-500 font-sans">Bill No. 112 of 2024</p>
            </div>

            <div className="space-y-4">
              <p>
                <strong>Clause 1:</strong> This Act may be called the Finance Act, 2024.
              </p>

              {/* BOUNDING BOX HIGHLIGHT: CLAUSE 4 */}
              <div
                onClick={() => setActiveClause(highlights[0])}
                className="p-4 rounded-xl bg-emerald-100/90 border-2 border-emerald-500 cursor-pointer shadow-md transition-all relative group"
              >
                <div className="absolute -top-3 right-3 bg-emerald-600 text-white text-[9px] font-mono px-2 py-0.5 rounded font-bold">
                  Matched Rule 17 • Confidence 98%
                </div>
                <p className="font-bold text-emerald-950">
                  Clause 4: In section 16 of the Income-tax Act, in clause (ia), for the words "fifty thousand rupees", the words "seventy-five thousand rupees" shall be substituted.
                </p>
              </div>

              <p>
                <strong>Clause 5:</strong> In section 17 of the Income-tax Act, after sub-section (2), the following proviso shall be inserted.
              </p>

              {/* BOUNDING BOX HIGHLIGHT: CLAUSE 12 */}
              <div
                onClick={() => setActiveClause(highlights[1])}
                className="p-4 rounded-xl bg-brand-100/90 border-2 border-brand-500 cursor-pointer shadow-md transition-all relative group"
              >
                <div className="absolute -top-3 right-3 bg-brand-600 text-white text-[9px] font-mono px-2 py-0.5 rounded font-bold">
                  Section 115BAC Slabs
                </div>
                <p className="font-bold text-brand-950">
                  Clause 12: In section 115BAC of the Income-tax Act, for sub-section (1A), revised tax slab rate brackets are applied for Assessment Year 2025-26.
                </p>
              </div>
            </div>
          </div>

          {/* SPLIT COMPARE CANVAS (FINANCE BILL 2025) */}
          {isCompareMode && (
            <div className="bg-slate-900 text-slate-200 border border-slate-800 rounded-2xl shadow-2xl p-10 max-w-2xl w-full min-h-[900px] space-y-6 text-xs leading-relaxed font-serif animate-fade">
              <div className="border-b border-slate-800 pb-4 text-center space-y-1">
                <span className="text-[10px] text-brand-400 font-bold font-mono uppercase">Version Comparison (Finance Bill 2025 Proposed)</span>
                <h2 className="text-base font-bold font-sans text-white">PROPOSED AMENDMENTS</h2>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-700 text-emerald-300 font-mono">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase">Added Provision</span>
                  <p>Standard deduction raised from ₹75,000 to ₹1,00,000 for salaried employees.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* 3. RIGHT AI SIDECAR WORKSPACE (340px) */}
      <aside className="w-80 bg-slate-900 border-l border-slate-800 flex flex-col h-full shrink-0 select-none p-4 space-y-4 overflow-y-auto scrollbar-thin">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-brand-400 font-bold text-xs">
            <Sparkles size={16} /> AI Sidecar Intelligence
          </div>
          <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-bold">
            Live Sync
          </span>
        </div>

        {/* ACTIVE CLAUSE PANEL */}
        {activeClause ? (
          <div className="space-y-4 animate-fade">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-[10px] font-bold text-emerald-400 uppercase">{activeClause.clause_id}</span>
              <h4 className="text-xs font-bold text-white">{activeClause.rule_name}</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{activeClause.text}</p>
            </div>

            {/* CALCULATOR SIDECAR */}
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/50 space-y-1">
              <span className="text-[10px] font-bold text-emerald-400 uppercase flex items-center gap-1">
                <Calculator size={12} /> Calculated Net Impact
              </span>
              <p className="text-2xl font-extrabold text-emerald-400">+₹{activeClause.impact.toLocaleString("en-IN")}</p>
              <p className="text-[10px] text-emerald-300/80">Evaluated against your active profile</p>
            </div>

            {/* CITATION PANEL */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-[10px]">
              <span className="font-bold text-brand-400 uppercase">Citation Grounding</span>
              <p className="text-slate-400">Finance Bill 2024 • Page {activeClause.page} • Para 1</p>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center text-xs text-slate-500">
            Click any highlighted clause in the PDF to inspect AI explanations and rupee impacts.
          </div>
        )}
      </aside>
    </div>
  );
}

export default PDFWorkspacePage;
