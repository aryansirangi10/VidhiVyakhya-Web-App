import { useQuery } from "@tanstack/react-query";
import { Clause } from "../types/clause.types";

const MOCK_CLAUSES: Clause[] = [
  {
    id: "cl-4",
    clauseNumber: "Clause 4",
    section: "Section 16(ia)",
    title: "Standard Deduction Increase",
    summary: "Raises standard deduction from ₹50,000 to ₹75,000 for salaried individuals under the New Tax Regime.",
    affectedUsers: ["Salaried Employees", "Pensioners"],
    category: "Income Tax",
    confidence: 98,
    rawText: "In section 16 of the Income-tax Act, in clause (ia), for the words 'seventy-five thousand rupees', the words 'seventy-five thousand rupees' shall be substituted.",
    pageNumber: 14,
  },
  {
    id: "cl-12",
    clauseNumber: "Clause 12",
    section: "Section 115BAC",
    title: "Revised Slab Rates & Thresholds",
    summary: "Modifies tax rate slabs: ₹0-3L (Nil), ₹3-7L (5%), ₹7-10L (10%), ₹10-12L (15%), ₹12-15L (20%), >₹15L (30%).",
    affectedUsers: ["All Taxpayers (New Regime)"],
    category: "Tax Rates",
    confidence: 99,
    rawText: "With effect from the 1st day of April, 2025, the income-tax chargeable on total income shall be computed at the rates specified in the Table below...",
    pageNumber: 32,
  },
];

export function useClauses(billId: number) {
  return useQuery<Clause[]>({
    queryKey: ["clauses", billId],
    queryFn: async () => MOCK_CLAUSES,
    enabled: !!billId,
  });
}

export default useClauses;
