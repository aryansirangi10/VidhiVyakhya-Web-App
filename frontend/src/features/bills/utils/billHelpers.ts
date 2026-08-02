import { Bill, BillFilterState } from "../types/bill.types";

/**
 * Calculates estimated reading time based on page count (avg 250 wpm, ~300 words/page)
 */
export function calculateReadingTime(pages: number): number {
  const wordsPerPage = 300;
  const wpm = 250;
  return Math.max(1, Math.ceil((pages * wordsPerPage) / wpm));
}

export function filterBills(bills: Bill[], filters: BillFilterState): Bill[] {
  return bills.filter((bill) => {
    // Search query matching Title, Bill Number, Category, Ministry, Summary
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      const matchesSearch =
        bill.title.toLowerCase().includes(q) ||
        bill.billNumber.toLowerCase().includes(q) ||
        bill.category.toLowerCase().includes(q) ||
        bill.ministry.toLowerCase().includes(q) ||
        bill.summary.toLowerCase().includes(q);

      if (!matchesSearch) return false;
    }

    // Category filter
    if (filters.category && filters.category !== "All") {
      if (bill.category.toLowerCase() !== filters.category.toLowerCase()) return false;
    }

    // Status filter
    if (filters.status && filters.status !== "All") {
      if (bill.status !== filters.status) return false;
    }

    // Year filter
    if (filters.year && filters.year !== "All") {
      if (bill.year.toString() !== filters.year) return false;
    }

    return true;
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case "newest":
        return b.year - a.year || b.id - a.id;
      case "oldest":
        return a.year - b.year || a.id - b.id;
      case "confidence":
        return b.confidence - a.confidence;
      case "popular":
        return b.clauseCount - a.clauseCount;
      case "alphabetical":
        return a.shortTitle.localeCompare(b.shortTitle);
      default:
        return 0;
    }
  });
}
