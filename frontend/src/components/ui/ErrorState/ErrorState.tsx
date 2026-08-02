import React from "react";
import { AlertOctagon, RefreshCw } from "lucide-react";

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Connection Interrupted",
  message = "Failed to load statutory intelligence records. Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-3xl bg-rose-50/50 border border-rose-200 shadow-sm max-w-md mx-auto space-y-4 font-mono">
      <div className="p-4 rounded-2xl bg-rose-100 text-rose-600">
        <AlertOctagon size={32} />
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-bold text-slate-900">{title}</h3>
        <p className="text-xs text-slate-600 leading-relaxed">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-rose-700 bg-white border border-rose-200 hover:bg-rose-50 rounded-xl shadow-sm transition-all"
        >
          <RefreshCw size={14} /> Retry Request
        </button>
      )}
    </div>
  );
}

export default ErrorState;
