import React from "react";
import { formatCurrency } from "../../utils/formatter";

export interface IncomeSliderProps {
  value: number;
  onChange: (val: number) => void;
}

export function IncomeSlider({ value, onChange }: IncomeSliderProps) {
  return (
    <div className="space-y-3 rounded-2xl bg-white p-6 border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Annual Gross Income
        </label>
        <span className="text-2xl font-black text-brand-700 font-mono">
          {formatCurrency(value)}
        </span>
      </div>

      <input
        type="range"
        min={300000}
        max={3000000}
        step={50000}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
      />

      <div className="flex justify-between text-[11px] font-semibold text-slate-400 font-mono">
        <span>₹3 Lakhs</span>
        <span>₹15 Lakhs</span>
        <span>₹30 Lakhs</span>
      </div>
    </div>
  );
}

export default IncomeSlider;
