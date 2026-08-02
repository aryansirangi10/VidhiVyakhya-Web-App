import React from "react";
import ExecutiveSummary from "./ExecutiveSummary";
import SavingsTrend from "./SavingsTrend";
import { useDashboard } from "../hooks/useDashboard";
import Spinner from "../../../components/ui/Spinner";
import Card from "../../../components/ui/Card";
import { Bookmark, Bell, Sparkles, Activity } from "lucide-react";

export function DashboardPage() {
  const { data, isLoading } = useDashboard();

  if (isLoading || !data) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* EXECUTIVE SUMMARY */}
      <ExecutiveSummary summary={data.summary} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT SAVINGS TREND (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <SavingsTrend data={data.savingsTrend} />

          {/* AI INSIGHTS CARD */}
          <div className="rounded-3xl bg-amber-500/10 p-6 border border-amber-500/30 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 font-mono">
              <Sparkles size={16} /> Grounded AI Intelligence Brief
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-mono">
              This month's Finance Bill 2024 amendments increase your estimated annual savings by ₹18,450.
              The largest financial benefit stems from Clause 4 standard deduction adjustments (₹75,000).
            </p>
          </div>
        </div>

        {/* RIGHT SIDEBAR (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* WATCHLIST TOPICS */}
          <div className="rounded-3xl bg-white p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono flex items-center gap-2">
              <Bookmark size={16} className="text-brand-600" /> Watchlist Topics
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.watchlistTopics.map((topic: string, idx: number) => (
                <span
                  key={idx}
                  className="rounded-xl bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-700 border border-brand-200"
                >
                  #{topic}
                </span>
              ))}
            </div>
          </div>

          {/* RECENT ACTIVITY */}
          <div className="rounded-3xl bg-white p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono flex items-center gap-2">
              <Activity size={16} className="text-brand-600" /> Recent Intelligence Feed
            </h3>
            <div className="space-y-3 text-xs font-mono">
              <div className="flex justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span>Calculated Finance Bill 2024</span>
                <span className="text-slate-400">2h ago</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span>Saved Primary Profile</span>
                <span className="text-slate-400">Yesterday</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
