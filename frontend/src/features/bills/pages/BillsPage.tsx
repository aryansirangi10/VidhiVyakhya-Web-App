import React, { useState, useMemo } from "react";
import { Search, Filter, SlidersHorizontal, Scale } from "lucide-react";
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../landing/components/Footer";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import { useBills } from "../hooks/useBills";
import { useBillSearch } from "../hooks/useBillSearch";
import { BillCard } from "../components/BillCard";
import { BillListSkeleton } from "../components/BillListSkeleton";
import { BillEmptyState } from "../components/BillEmptyState";
import { CATEGORIES, STATUSES } from "../utils/constants";
import { filterBills } from "../utils/billHelpers";
import { BillFilterState } from "../types/bill.types";

export function BillsPage() {
  const { data: bills = [], isLoading } = useBills();
  const { query, debouncedQuery, setQuery, inputRef } = useBillSearch("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [sortBy, setSortBy] = useState<BillFilterState["sortBy"]>("newest");

  const filterState: BillFilterState = useMemo(
    () => ({
      searchQuery: debouncedQuery,
      category: selectedCategory,
      status: selectedStatus,
      ministry: "All",
      year: selectedYear,
      sortBy,
    }),
    [debouncedQuery, selectedCategory, selectedStatus, selectedYear, sortBy]
  );

  const filteredBills = useMemo(
    () => filterBills(bills, filterState),
    [bills, filterState]
  );

  const resetFilters = () => {
    setQuery("");
    setSelectedCategory("All");
    setSelectedStatus("All");
    setSelectedYear("All");
    setSortBy("newest");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar />

      <main className="pt-28 pb-24">
        {/* HEADER SECTION */}
        <div className="bg-white border-b border-slate-200 py-12">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
                Parliamentary Legalese Explorer
              </span>
              <h1 className="mt-2 text-4xl font-extrabold text-slate-900 tracking-tight lg:text-5xl">
                Browse Indian Parliamentary Bills
              </h1>
              <p className="mt-3 text-lg text-slate-600">
                Explore indexed bills, search specific clauses, and inspect human-audited confidence metrics.
              </p>
            </div>

            {/* SEARCH & CONTROLS */}
            <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative flex-1 max-w-2xl">
                <Input
                  ref={inputRef}
                  placeholder="Search title, bill number, ministry, or keywords... (Press '/' to focus)"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  leftIcon={<Search size={18} className="text-slate-400" />}
                />
              </div>

              {/* SORT & STATUS DROPDOWNS */}
              <div className="flex flex-wrap items-center gap-3">
                <Select
                  options={[
                    { label: "Newest First", value: "newest" },
                    { label: "Oldest First", value: "oldest" },
                    { label: "Highest Confidence", value: "confidence" },
                    { label: "Most Clauses", value: "popular" },
                    { label: "Alphabetical", value: "alphabetical" },
                  ]}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                />
              </div>
            </div>

            {/* CATEGORY TABS */}
            <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all whitespace-nowrap ${
                      isActive
                        ? "bg-brand-700 text-white shadow-md"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* BILLS GRID / SKELETON / EMPTY STATE */}
        <div className="mx-auto max-w-7xl px-6 mt-12">
          {isLoading ? (
            <BillListSkeleton count={6} />
          ) : filteredBills.length === 0 ? (
            <BillEmptyState onReset={resetFilters} />
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredBills.map((bill) => (
                <BillCard key={bill.id} bill={bill} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default BillsPage;
