import React from "react";
import { SearchX, RotateCcw } from "lucide-react";
import Button from "../../../../components/ui/Button";

export interface BillEmptyStateProps {
  onReset: () => void;
}

export function BillEmptyState({ onReset }: BillEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-3xl bg-slate-100/60 border border-dashed border-slate-300">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-200 text-slate-400 mb-4">
        <SearchX size={32} />
      </div>
      <h3 className="text-xl font-bold text-slate-900">No Bills Found</h3>
      <p className="mt-2 text-sm text-slate-500 max-w-sm">
        We couldn't find any parliamentary bills matching your criteria. Try adjusting your search query or filters.
      </p>
      <Button variant="outline" size="sm" className="mt-6 gap-2" onClick={onReset} leftIcon={<RotateCcw size={14} />}>
        Reset All Filters
      </Button>
    </div>
  );
}

export default BillEmptyState;
