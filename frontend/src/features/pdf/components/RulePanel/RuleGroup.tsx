import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import RuleCard from "./RuleCard";
import { RuleItem } from "../../types/rule";

export function RuleGroup({ category, rules }: { category: string; rules: RuleItem[] }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-4 bg-slate-50 text-left font-bold text-slate-900 hover:bg-slate-100 transition-colors"
      >
        <span className="text-sm">{category} ({rules.length} Rules)</span>
        <ChevronDown size={18} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="p-4 space-y-4 border-t border-slate-200">
          {rules.map((rule) => (
            <RuleCard key={rule.id} rule={rule} />
          ))}
        </div>
      )}
    </div>
  );
}

export default RuleGroup;
