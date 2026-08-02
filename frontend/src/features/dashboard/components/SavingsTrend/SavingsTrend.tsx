import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { SavingsPoint } from "../../types/dashboard";

export function SavingsTrend({ data }: { data: SavingsPoint[] }) {
  return (
    <div className="rounded-3xl bg-white p-6 border border-slate-200 shadow-sm space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
        Cumulative Savings Trend
      </h3>

      <div className="h-60 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
            <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(val) => `₹${val / 1000}k`} />
            <Tooltip
              formatter={(val: number) => [`₹${val.toLocaleString("en-IN")}`, "Estimated Savings"]}
              contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0" }}
            />
            <Line
              type="monotone"
              dataKey="savings"
              stroke="#059669"
              strokeWidth={3}
              dot={{ r: 4, fill: "#059669" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SavingsTrend;
