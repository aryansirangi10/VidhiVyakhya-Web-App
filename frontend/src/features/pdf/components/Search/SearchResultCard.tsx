import React from "react";
import { FileText, ArrowRight } from "lucide-react";
import { SearchResultItem } from "../../types/search";
import { usePage } from "../../hooks/usePage";
import { useActiveClause } from "../../hooks/useActiveClause";

export function SearchResultCard({ item }: { item: SearchResultItem }) {
  const { setPage } = usePage();
  const { jumpToClause } = useActiveClause();

  const handleSelect = () => {
    jumpToClause("sr-" + item.clauseId, item.page, item.clauseId, 1, item.snippet, item.matchScore);
    setPage(item.page);
  };

  return (
    <button
      onClick={handleSelect}
      className="w-full text-left p-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-brand-300 transition-all space-y-1.5 group"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-brand-700 flex items-center gap-1.5">
          <FileText size={14} /> {item.clauseId} • {item.section}
        </span>
        <span className="text-[10px] font-mono font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
          Page {item.page}
        </span>
      </div>
      <p className="text-xs text-slate-600 leading-relaxed font-mono line-clamp-2">
        "{item.snippet}"
      </p>
      <div className="flex justify-end pt-1 text-[11px] font-bold text-brand-600 group-hover:translate-x-1 transition-transform">
        <span>Jump to Clause →</span>
      </div>
    </button>
  );
}

export default SearchResultCard;
