import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import Button from "../../../../components/ui/Button";

export function PDFError({ message, onRetry }: { message?: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-3xl bg-rose-50/50 border border-rose-200 text-rose-900">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 mb-4">
        <AlertCircle size={28} />
      </div>
      <h3 className="text-lg font-bold">Unable to Load PDF Document</h3>
      <p className="mt-2 text-xs text-rose-700 max-w-sm">
        {message || "An error occurred while fetching or rendering the parliamentary PDF file."}
      </p>
      {onRetry && (
        <Button variant="outline" size="sm" className="mt-6 gap-2" leftIcon={<RefreshCw size={14} />} onClick={onRetry}>
          Retry Loading
        </Button>
      )}
    </div>
  );
}

export default PDFError;
