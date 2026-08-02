import { GlossaryTerm } from "../types/glossary";

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: "g-1",
    term: "Standard Deduction",
    definition: "A flat deduction allowed from gross salary income without requiring proof of actual expenses.",
    category: "Taxation",
    relatedClauses: ["Clause 4", "Section 16(ia)"],
    example: "Under Finance Bill 2024, standard deduction is ₹75,000 for New Tax Regime.",
  },
  {
    id: "g-2",
    term: "Assessment Year",
    definition: "The 12-month period immediately following the Financial Year in which income is evaluated and taxed.",
    category: "Taxation",
    relatedClauses: ["Clause 12", "Section 2(9)"],
    example: "For FY 2024-25, the Assessment Year is AY 2025-26.",
  },
  {
    id: "g-3",
    term: "Data Fiduciary",
    definition: "Any person or entity who determines the purpose and means of processing personal data under DPDP Act.",
    category: "Privacy",
    relatedClauses: ["Section 2(i)", "Clause 5"],
    example: "A bank collecting customer KYC is a Data Fiduciary.",
  },
  {
    id: "g-4",
    term: "Data Principal",
    definition: "The individual to whom the personal data relates.",
    category: "Privacy",
    relatedClauses: ["Section 2(j)"],
    example: "Every citizen whose personal data is processed is a Data Principal.",
  },
  {
    id: "g-5",
    term: "LTCG",
    definition: "Long-Term Capital Gains arising from the sale of capital assets held beyond the specified threshold.",
    category: "Finance",
    relatedClauses: ["Clause 18", "Section 112A"],
    example: "LTCG on listed equity held > 12 months is taxed at 12.5%.",
  },
];

export const glossaryService = {
  async getTerms(): Promise<GlossaryTerm[]> {
    return GLOSSARY_TERMS;
  },

  findTerm(termName: string): GlossaryTerm | undefined {
    return GLOSSARY_TERMS.find(
      (t) => t.term.toLowerCase() === termName.toLowerCase()
    );
  },
};

export default glossaryService;
