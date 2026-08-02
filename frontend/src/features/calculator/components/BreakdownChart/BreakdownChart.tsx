import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { ImpactResult } from "../../types/calculator";
import { formatCurrency } from "../../utils/formatter";

export function BreakdownChart({ result }: { result: ImpactResult }) {
  const data = [
    { name: "Before Bill", Tax: result.before, fill: "#64748b" },
    { name: "After Bill", Tax: result.after, fill: "#059669" },
  ];

  return (
    <div className="rounded-2xl bg-white p-6 border border-slate-200 shadow-sm space-y-4">
      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
        Tax Comparison Visualizer
      </h4>

      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} />
            <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(val) => `₹${val / 1000}k`} />
            <Tooltip
              formatter={(val: number) => [formatCurrency(val), "Tax Liability"]}
              contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0" }}
            />
            <Bar dataKey="Tax" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default BreakdownChart;
