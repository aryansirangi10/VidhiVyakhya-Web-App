import { useQuery } from "@tanstack/react-query";
import { Rule } from "../types/rule.types";

const MOCK_RULES: Rule[] = [
  {
    id: "r-17",
    ruleNumber: "17",
    condition: "Employment == 'salaried' AND Regime == 'new'",
    effect: "Standard Deduction = ₹75,000 (increased by ₹25,000)",
    sourceClause: "Clause 4",
    confidence: 98,
    isHumanReviewed: true,
    status: "Human Reviewed",
  },
  {
    id: "r-18",
    ruleNumber: "18",
    condition: "Gross Income > ₹7,00,000 AND Income <= ₹10,00,000",
    effect: "Tax Rate = 10% on bracket amount",
    sourceClause: "Clause 12",
    confidence: 99,
    isHumanReviewed: true,
    status: "Human Reviewed",
  },
];

export function useRules(billId: number) {
  return useQuery<Rule[]>({
    queryKey: ["rules", billId],
    queryFn: async () => MOCK_RULES,
    enabled: !!billId,
  });
}

export default useRules;
