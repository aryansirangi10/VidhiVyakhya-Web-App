import React from "react";
import { Terminal, ShieldCheck, TrendingUp, Bell, Sparkles, Bookmark, BookOpen } from "lucide-react";

export function TerminalWorkspacePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 font-mono space-y-6">
      {/* MISSION CONTROL HEADER */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-brand-600 text-white shadow-lg">
            <Terminal size={22} />
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-white flex items-center gap-2">
              Legislative Operating System <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded">LIVE TERMINAL</span>
            </h1>
            <p className="text-xs text-slate-500">Government Intelligence Mission Control • VidhiVyakhya v2.0</p>
          </div>
        </div>
        <span className="text-xs text-emerald-400 font-bold bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
          ● 5 Live Government Sources Connected
        </span>
      </div>

      {/* GRID LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: LIVE GOVERNMENT FEED (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl bg-slate-900 p-6 border border-slate-800 space-y-4 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-400 flex items-center gap-2">
              <Bell size={16} /> Live Official Gazette & Circular Feed
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-brand-400 font-bold">CBDT Circular No. 10/2024</span>
                  <span className="text-slate-500">Today, 09:30 AM</span>
                </div>
                <h4 className="font-bold text-white">TDS Rate Adjustments for Corporate Services</h4>
                <p className="text-slate-400 text-[11px]">Clarification on Section 194J threshold limits.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-emerald-400 font-bold">Finance Bill 2024 (Lok Sabha)</span>
                  <span className="text-slate-500">Yesterday</span>
                </div>
                <h4 className="font-bold text-white">Standard Deduction Increased to ₹75,000</h4>
                <p className="text-slate-400 text-[11px]">Section 16(ia) amendment passed in parliament.</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SAVINGS & SUMMARY (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl bg-emerald-950/40 border border-emerald-800/50 p-6 space-y-3 shadow-xl">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
              <TrendingUp size={14} /> Calculated Net Savings
            </span>
            <p className="text-4xl font-extrabold text-emerald-400">+₹18,450</p>
            <p className="text-xs text-emerald-300/80">Evaluated on Finance Bill 2024 amendments</p>
          </div>

          <div className="rounded-3xl bg-slate-900 p-6 border border-slate-800 space-y-3 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Bookmark size={16} className="text-brand-400" /> Watchlist Topics
            </h3>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1 rounded-xl bg-brand-950 text-brand-300 border border-brand-800 font-bold">#IncomeTax</span>
              <span className="px-3 py-1 rounded-xl bg-brand-950 text-brand-300 border border-brand-800 font-bold">#GST</span>
              <span className="px-3 py-1 rounded-xl bg-brand-950 text-brand-300 border border-brand-800 font-bold">#Privacy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TerminalWorkspacePage;
