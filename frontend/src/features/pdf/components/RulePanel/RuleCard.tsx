import React from "react";
import { ArrowRight } from "lucide-react";
import Card from "../../../../components/ui/Card";
import Button from "../../../../components/ui/Button";
import ConfidenceBadge from "../../../bills/components/ConfidenceBadge/ConfidenceBadge";
import { RuleItem } from "../../types/rule";
import { useRuleNavigation } from "../../hooks/useRuleNavigation";

export function RuleCard({ rule }: { rule: RuleItem }) {
  const { navigateToRule, activeClause } = useRuleNavigation();
  const isActive = activeClause?.ruleId === rule.id;

  return (
    <Card
      className={`p-5 transition-all duration-200 border bg-white space-y-3 ${
        isActive
          ? "border-brand-600 ring-2 ring-brand-500/20 shadow-md bg-brand-50/10"
          : "border-slate-200 hover:border-slate-300"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-mono font-bold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-lg border border-brand-100">
          Rule #{rule.ruleNumber}
        </span>
        <ConfidenceBadge score={rule.confidence} isHumanReviewed={rule.isHumanReviewed} />
      </div>

      <h4 className="text-base font-bold text-slate-900">{rule.title}</h4>
      <p className="text-xs text-slate-600 leading-relaxed">{rule.summary}</p>

      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full text-[11px]">
            {rule.impact}
          </span>
          <span className="text-slate-400 font-mono text-[11px]">Page {rule.page}</span>
        </div>

        <Button
          size="xs"
          variant={isActive ? "primary" : "outline"}
          rightIcon={<ArrowRight size={12} />}
          onClick={() => navigateToRule(rule)}
        >
          View Source
        </Button>
      </div>
    </Card>
  );
}

export default RuleCard;
