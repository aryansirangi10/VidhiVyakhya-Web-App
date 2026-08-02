import React from "react";
import { Cpu, FileText, ShieldCheck, BookOpen, Building2, CheckCircle2 } from "lucide-react";
import Card from "../../../../components/ui/Card";
import { Bill } from "../../types/bill.types";

export function QuickFacts({ bill }: { bill: Bill }) {
  const facts = [
    { label: "Extracted Rules", value: `${bill.ruleCount} Rules`, icon: Cpu },
    { label: "Parsed Clauses", value: `${bill.clauseCount} Clauses`, icon: FileText },
    { label: "Confidence Score", value: `${bill.confidence}% Human Verified`, icon: ShieldCheck },
    { label: "Page Length", value: `${bill.pages} Pages (${bill.readingTime} min)`, icon: BookOpen },
    { label: "Sponsoring Ministry", value: bill.ministry, icon: Building2 },
    { label: "Legislative Stage", value: bill.status, icon: CheckCircle2 },
  ];

  return (
    <Card className="p-6 border-slate-200 bg-white space-y-4">
      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Legislative Quick Facts</h4>
      <div className="grid grid-cols-2 gap-4">
        {facts.map((fact, idx) => (
          <div key={idx} className="flex items-start gap-2.5">
            <fact.icon size={16} className="text-brand-600 shrink-0 mt-0.5" />
            <div>
              <span className="block text-[11px] text-slate-400">{fact.label}</span>
              <span className="text-xs font-bold text-slate-900 leading-tight block mt-0.5">{fact.value}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default QuickFacts;
