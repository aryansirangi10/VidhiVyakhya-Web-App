import { RuleLocation } from "../types/rule";

export const syncService = {
  async getRuleLocation(ruleId: string): Promise<RuleLocation> {
    return {
      id: `loc-${ruleId}`,
      ruleId,
      clauseId: "Clause 4",
      page: 14,
      paragraph: 2,
      x: 100,
      y: 250,
      width: 400,
      height: 60,
      confidence: 0.98,
      summary: "Section 16(ia) standard deduction increase.",
    };
  },
};

export default syncService;
