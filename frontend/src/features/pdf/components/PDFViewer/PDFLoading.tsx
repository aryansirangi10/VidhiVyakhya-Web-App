import React from "react";
import Skeleton from "../../../../components/ui/Skeleton";

export function PDFLoading() {
  return (
    <div className="flex flex-col items-center justify-center p-8 w-full max-w-3xl mx-auto space-y-4">
      <div className="w-full aspect-[1/1.4] rounded-2xl bg-white p-8 shadow-sm border border-slate-200 space-y-4">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <div className="pt-6 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    </div>
  );
}

export default PDFLoading;
