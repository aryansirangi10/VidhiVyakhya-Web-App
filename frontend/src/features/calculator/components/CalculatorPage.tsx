import React from "react";
import { Calculator as CalcIcon, Zap } from "lucide-react";
import IncomeSlider from "./IncomeSlider";
import ResultCard from "./ResultCard";
import BreakdownChart from "./BreakdownChart";
import ExplanationPanel from "./ExplanationPanel";
import { useCalculator } from "../hooks/useCalculator";

export function CalculatorPage() {
  const { profile, setProfile, result } = useCalculator();

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 space-y-8 max-w-6xl mx-auto">
      {/* HEADER */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700 border border-brand-200">
          <Zap size={14} /> Instant Personal Impact Engine (8ms)
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Finance Bill Impact Calculator
        </h1>
        <p className="text-sm text-slate-600">
          Deterministic calculation of tax savings based on official parliamentary amendments.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT FORM / SLIDER (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <IncomeSlider
            value={profile.annualIncome}
            onChange={(val) => setProfile((p) => ({ ...p, annualIncome: val }))}
          />

          <div className="rounded-2xl bg-white p-6 border border-slate-200 shadow-sm space-y-4 text-xs font-mono">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Profile Parameters
            </h4>

            <div className="space-y-3">
              <div>
                <label className="block text-slate-500 font-semibold mb-1">Employment Type</label>
                <select
                  value={profile.employment}
                  onChange={(e) => setProfile((p) => ({ ...p, employment: e.target.value as any }))}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-slate-800 font-sans text-xs outline-none focus:border-brand-600"
                >
                  <option value="salaried">Salaried Employee</option>
                  <option value="business">Business Owner</option>
                  <option value="professional">Professional</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-500 font-semibold mb-1">Tax Regime</label>
                <select
                  value={profile.taxRegime}
                  onChange={(e) => setProfile((p) => ({ ...p, taxRegime: e.target.value as any }))}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-slate-800 font-sans text-xs outline-none focus:border-brand-600"
                >
                  <option value="new">New Tax Regime (Default)</option>
                  <option value="old">Old Tax Regime</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT DISPLAY (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <ResultCard result={result} />
          <BreakdownChart result={result} />
          <ExplanationPanel result={result} />
        </div>
      </div>
    </div>
  );
}

export default CalculatorPage;
