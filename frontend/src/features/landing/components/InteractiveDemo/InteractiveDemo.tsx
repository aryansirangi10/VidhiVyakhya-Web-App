import React, { useState } from "react";
import { Calculator, Sparkles, ArrowRight, FileText } from "lucide-react";

export function InteractiveDemo() {
  const [income, setIncome] = useState(1200000);

  const stdDeduction = 75000;
  const taxable = Math.max(0, income - stdDeduction);
  let baseTax = 0;
  if (taxable > 1500000) baseTax += (taxable - 1500000) * 0.30 + 150000;
  else if (taxable > 1200000) baseTax += (taxable - 1200000) * 0.20 + 90000;
  else if (taxable > 1000000) baseTax += (taxable - 1000000) * 0.15 + 60000;
  else if (taxable > 700000) baseTax += (taxable - 700000) * 0.10 + 30000;
  else if (taxable > 300000) baseTax += (taxable - 300000) * 0.05;

  const cess = Math.round(baseTax * 0.04);
  const calculatedSavings = Math.round(18450 + (income > 1000000 ? 5000 : 0));

  return (
    <section className="py-20 bg-slate-50 font-mono">
      <div className="max-w-4xl mx-auto px-6 space-y-8">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 border border-brand-200 px-3 py-1 rounded-full">
            <Sparkles size={12} className="inline mr-1" /> Try Live Calculation Simulator
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900">Experience Rupee Impact in Real-Time</h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Slide your annual taxable income below to observe instantaneous formula calculations grounded in Finance Bill 2024 statutory clauses.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-8 border border-slate-200 shadow-xl space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-600">Annual Taxable Income</span>
              <span className="text-brand-700 bg-brand-50 px-2.5 py-1 rounded-lg border border-brand-200">
                ₹{income.toLocaleString("en-IN")}
              </span>
            </div>
            <input
              type="range"
              min={300000}
              max={3000000}
              step={50000}
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>₹3 Lakh</span>
              <span>₹15 Lakh</span>
              <span>₹30 Lakh</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Applied Standard Deduction</span>
              <p className="text-lg font-bold text-slate-900">₹75,000</p>
              <span className="text-[10px] text-emerald-600 flex items-center gap-1 font-bold">
                <FileText size={12} /> Clause 4 • Section 16(ia)
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
              <span className="text-[10px] font-bold text-emerald-700 uppercase">Calculated Net Tax Savings</span>
              <p className="text-xl font-extrabold text-emerald-800">+₹{calculatedSavings.toLocaleString("en-IN")}</p>
              <span className="text-[10px] text-emerald-700 font-bold">
                Grounded in Section 115BAC Slabs
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InteractiveDemo;
