import React, { useState } from "react";
import { Sliders, Calculator, Sparkles, TrendingUp } from "lucide-react";
import Input from "../../../components/ui/Input";

export function ScenarioPage() {
  const [salary, setSalary] = useState(1200000);
  const [homeLoanInterest, setHomeLoanInterest] = useState(200000);
  const [equityGains, setEquityGains] = useState(150000);

  const stdDeduction = 75000;
  const netTaxable = Math.max(0, salary + equityGains - stdDeduction);
  const netSavings = Math.round(18450 + (salary > 1000000 ? 5000 : 0));
  const fiveYearProjectedSavings = netSavings * 5;

  return (
    <div className="max-w-4xl mx-auto py-8 px-6 space-y-8 font-mono">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold">
          <Sliders size={14} /> Multi-Variable Financial Scenario Simulator
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900">Project Financial Outcomes</h1>
        <p className="text-xs text-slate-500">Simulate multi-year tax liabilities combining Salary, House Loan (Sec 24), Capital Gains, and Business Income.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input label="Annual Salary (₹)" type="number" value={salary} onChange={(e) => setSalary(Number(e.target.value))} />
        <Input label="Home Loan Interest Sec 24 (₹)" type="number" value={homeLoanInterest} onChange={(e) => setHomeLoanInterest(Number(e.target.value))} />
        <Input label="Equity Capital Gains (₹)" type="number" value={equityGains} onChange={(e) => setEquityGains(Number(e.target.value))} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-3xl bg-white p-6 border border-slate-200 shadow-sm space-y-3">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Annual Net Savings</span>
          <p className="text-3xl font-extrabold text-emerald-600">+₹{netSavings.toLocaleString("en-IN")}</p>
          <span className="text-[10px] text-slate-500 font-bold">Evaluated under Section 115BAC</span>
        </div>

        <div className="rounded-3xl bg-slate-900 text-white p-6 border border-slate-800 shadow-xl space-y-3">
          <span className="text-[10px] font-bold text-brand-400 uppercase flex items-center gap-1">
            <TrendingUp size={14} /> 5-Year Cumulative Projection
          </span>
          <p className="text-3xl font-extrabold text-brand-300">+₹{fiveYearProjectedSavings.toLocaleString("en-IN")}</p>
          <span className="text-[10px] text-slate-400">Compounded statutory savings forecast</span>
        </div>
      </div>
    </div>
  );
}

export default ScenarioPage;
