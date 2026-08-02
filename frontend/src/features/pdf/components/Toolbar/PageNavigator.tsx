import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "../../../../components/ui/Button";
import { usePage } from "../../hooks/usePage";

export function PageNavigator() {
  const { currentPage, totalPages, setPage, nextPage, prevPage } = usePage();
  const [inputVal, setInputVal] = useState(currentPage.toString());

  useEffect(() => {
    setInputVal(currentPage.toString());
  }, [currentPage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(inputVal, 10);
    if (!isNaN(val)) {
      setPage(val);
    }
  };

  return (
    <div className="flex items-center gap-1 text-xs font-semibold">
      <Button
        size="xs"
        variant="ghost"
        disabled={currentPage <= 1}
        onClick={prevPage}
        aria-label="Previous Page"
      >
        <ChevronLeft size={16} />
      </Button>

      <form onSubmit={handleSubmit} className="flex items-center gap-1">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onBlur={handleSubmit}
          className="w-12 rounded-lg border border-slate-300 bg-white py-1 text-center font-mono font-bold text-slate-900 focus:border-brand-600 focus:outline-none"
        />
        <span className="text-slate-400 font-normal">/ {totalPages || 1}</span>
      </form>

      <Button
        size="xs"
        variant="ghost"
        disabled={currentPage >= totalPages}
        onClick={nextPage}
        aria-label="Next Page"
      >
        <ChevronRight size={16} />
      </Button>
    </div>
  );
}

export default PageNavigator;
