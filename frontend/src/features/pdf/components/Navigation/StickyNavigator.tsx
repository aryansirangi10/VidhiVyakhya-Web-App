import React from "react";
import { Filter, Scale } from "lucide-react";

const CATEGORIES = [
  "Income Tax",
  "Capital Gains",
  "Privacy",
  "Labour",
  "Environment",
];

export function StickyNavigator({
  activeCategory,
  onSelectCategory,
}: {
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl bg-white p-2 border border-slate-200 shadow-sm w-44 shrink-0">
      <div className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
        <Filter size={14} /> Categories
      </div>
      {CATEGORIES.map((cat) => {
        const isActive = activeCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`rounded-xl px-3 py-2 text-left text-xs font-semibold transition-all ${
              isActive
                ? "bg-brand-700 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}

export default StickyNavigator;
