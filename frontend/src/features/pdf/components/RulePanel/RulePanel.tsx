import React from "react";
import RuleGroup from "./RuleGroup";
import { RuleItem } from "../../types/rule";

export const MOCK_RULES: RuleItem[] = [
  {
    id: "r-17",
    ruleNumber: "17",
    title: "Standard Deduction Amendment",
    summary: "Standard deduction under Section 16(ia) raised from ₹50,000 to ₹75,000 for salaried employees.",
    category: "Income Tax",
    affectedUsers: ["Salaried Employees", "Pensioners"],
    impact: "+ ₹13,420 Net Savings",
    clause: "Clause 4",
    confidence: 98,
    isHumanReviewed: true,
    page: 14,
    paragraph: 2,
  },
  {
    id: "r-18",
    ruleNumber: "18",
    title: "Revised Income Tax Slabs",
    summary: "Adjusts 5% slab bracket from ₹3,00,000 to ₹7,00,000 for the New Tax Regime.",
    category: "Income Tax",
    affectedUsers: ["All Taxpayers (New Regime)"],
    impact: "+ ₹10,000 Benefit",
    clause: "Clause 12",
    confidence: 99,
    isHumanReviewed: true,
    page: 32,
    paragraph: 4,
  },
  {
    id: "r-22",
    ruleNumber: "22",
    title: "LTCG Holding Period Harmonization",
    summary: "Standardizes long-term capital gains holding threshold to 12 months for listed equity.",
    category: "Capital Gains",
    affectedUsers: ["Investors", "Traders"],
    impact: "Rate Adjusted to 12.5%",
    clause: "Clause 18",
    confidence: 96,
    isHumanReviewed: false,
    page: 48,
    paragraph: 1,
  },
];

export function RulePanel({ selectedCategory }: { selectedCategory?: string }) {
  const filteredRules = selectedCategory
    ? MOCK_RULES.filter((r) => r.category === selectedCategory)
    : MOCK_RULES;

  const grouped = filteredRules.reduce((acc, rule) => {
    if (!acc[rule.category]) acc[rule.category] = [];
    acc[rule.category].push(rule);
    return acc;
  }, {} as Record<string, RuleItem[]>);

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([cat, rules]) => (
        <RuleGroup key={cat} category={cat} rules={rules} />
      ))}
    </div>
  );
}

export default RulePanel;
