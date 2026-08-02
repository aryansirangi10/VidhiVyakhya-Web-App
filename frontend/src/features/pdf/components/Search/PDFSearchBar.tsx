import React from "react";
import { Search, X, Clock } from "lucide-react";
import Input from "../../../../components/ui/Input";
import SearchResultCard from "./SearchResultCard";
import { usePDFSearch } from "../../hooks/usePDFSearch";

export function PDFSearchBar() {
  const { query, setQuery, results, isLoading, recentSearches, isOpen, setIsOpen } = usePDFSearch();

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-500 hover:border-brand-600 transition-all shadow-sm"
      >
        <Search size={14} className="text-slate-400" />
        <span>Search bill text...</span>
        <kbd className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] font-bold text-slate-600 border border-slate-200">
          ⌘F
        </kbd>
      </button>
    );
  }

  return (
    <div className="relative w-80">
      <div className="flex items-center gap-1">
        <Input
          size="sm"
          autoFocus
          placeholder="Search clauses, sections, or keywords..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          leftIcon={<Search size={14} className="text-slate-400" />}
          rightIcon={
            query ? (
              <X
                size={14}
                className="cursor-pointer text-slate-400 hover:text-slate-700"
                onClick={() => setQuery("")}
              />
            ) : null
          }
        />
        <button
          onClick={() => setIsOpen(false)}
          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
        >
          <X size={16} />
        </button>
      </div>

      {/* RESULTS POPOVER */}
      {query.trim() && (
        <div className="absolute top-12 left-0 right-0 z-40 max-h-96 overflow-auto rounded-2xl bg-white p-3 border border-slate-200 shadow-2xl space-y-2">
          {isLoading ? (
            <div className="p-4 text-center text-xs text-slate-400">Searching Parliamentary Bill...</div>
          ) : results.length === 0 ? (
            <div className="p-4 text-center text-xs text-slate-400">No matching statutory clauses found.</div>
          ) : (
            <div className="space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1">
                Found {results.length} Matches
              </div>
              {results.map((item) => (
                <SearchResultCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* RECENT SEARCHES */}
      {!query.trim() && recentSearches.length > 0 && (
        <div className="absolute top-12 left-0 right-0 z-40 rounded-2xl bg-white p-3 border border-slate-200 shadow-xl space-y-2">
          <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1">
            <Clock size={12} /> Recent Searches
          </div>
          <div className="flex flex-wrap gap-1.5">
            {recentSearches.map((term, idx) => (
              <button
                key={idx}
                onClick={() => setQuery(term)}
                className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-brand-50 hover:text-brand-700 transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PDFSearchBar;
