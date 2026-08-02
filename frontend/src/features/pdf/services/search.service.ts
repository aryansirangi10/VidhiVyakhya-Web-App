import { SearchResultItem } from "../types/search";

export const MOCK_SEARCH_INDEX: SearchResultItem[] = [
  {
    id: "sr-1",
    clauseId: "Clause 4",
    section: "Section 16(ia)",
    page: 14,
    snippet: "...standard deduction is raised from fifty thousand to seventy-five thousand rupees...",
    matchScore: 0.98,
  },
  {
    id: "sr-2",
    clauseId: "Clause 19",
    section: "Section 115BAC",
    page: 32,
    snippet: "...deduction shall apply to all salaried taxpayers opting for the new tax regime...",
    matchScore: 0.89,
  },
  {
    id: "sr-3",
    clauseId: "Schedule II",
    section: "Tax Rate Schedule",
    page: 391,
    snippet: "...standard deduction table calculations for assessment year 2025-26...",
    matchScore: 0.75,
  },
];

export const searchService = {
  async searchBill(query: string): Promise<SearchResultItem[]> {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return MOCK_SEARCH_INDEX.filter(
      (item) =>
        item.clauseId.toLowerCase().includes(q) ||
        item.section.toLowerCase().includes(q) ||
        item.snippet.toLowerCase().includes(q)
    );
  },
};

export default searchService;
