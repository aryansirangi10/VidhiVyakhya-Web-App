import React from "react";
import { FileQuestion } from "lucide-react";

export function PDFEmpty() {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-3xl bg-slate-100/60 border border-dashed border-slate-300 text-slate-500">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-200 text-slate-400 mb-4">
        <FileQuestion size={28} />
      </div>
      <h3 className="text-lg font-bold text-slate-900">No PDF Available</h3>
      <p className="mt-2 text-xs text-slate-500 max-w-sm">
        This parliamentary bill does not have an associated gazette PDF document uploaded yet.
      </p>
    </div>
  );
}

export default PDFEmpty;
