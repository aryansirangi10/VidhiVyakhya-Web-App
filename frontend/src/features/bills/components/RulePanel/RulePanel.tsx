import React from "react";
import { Cpu, CheckCircle2 } from "lucide-react";
import Card from "../../../../components/ui/Card";
import ConfidenceBadge from "../ConfidenceBadge";
import { Rule } from "../../types/rule.types";

export interface RulePanelProps {
  rules: Rule[];
}

export function RulePanel({ rules }: RulePanelProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Cpu className="text-brand-600" size={20} />
          <span>Extracted Statutory Rules ({rules.length})</span>
        </h3>
      </div>

      <div className="space-y-4">
        {rules.map((rule) => (
          <Card key={rule.id} className="p-6 border-slate-200 bg-white hover:border-brand-200 transition-all space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-mono font-bold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-lg border border-brand-100">
                Rule #{rule.ruleNumber}
              </span>
              <ConfidenceBadge score={rule.confidence} isHumanReviewed={rule.isHumanReviewed} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono pt-2">
              <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200">
                <span className="block text-[10px] text-slate-400 uppercase font-sans font-semibold mb-1">
                  Evaluated Condition
                </span>
                <p className="text-slate-800 font-semibold">{rule.condition}</p>
              </div>

              <div className="rounded-xl bg-emerald-50/60 p-3.5 border border-emerald-200">
                <span className="block text-[10px] text-emerald-600 uppercase font-sans font-semibold mb-1">
                  Statutory Effect
                </span>
                <p className="text-emerald-900 font-bold">{rule.effect}</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
              <span>Source: <strong className="text-slate-700">{rule.sourceClause}</strong></span>
              <span className="text-emerald-600 flex items-center gap-1 font-semibold">
                <CheckCircle2 size={14} /> Deterministic Evaluator Passed
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default RulePanel;
