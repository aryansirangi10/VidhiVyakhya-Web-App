import React from "react";

export interface StatWidgetProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon?: React.ReactNode;
}

export function StatWidget({ title, value, change, isPositive = true, icon }: StatWidgetProps) {
  return (
    <div className="rounded-3xl bg-white p-6 border border-slate-200 shadow-sm space-y-3 font-mono">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{title}</span>
        {icon && <div className="text-brand-600">{icon}</div>}
      </div>
      <div className="flex items-baseline justify-between">
        <span className="text-2xl font-extrabold text-slate-900 font-mono">{value}</span>
        {change && (
          <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${isPositive ? "text-emerald-700 bg-emerald-100" : "text-rose-700 bg-rose-100"}`}>
            {change}
          </span>
        )}
      </div>
    </div>
  );
}

export default StatWidget;
