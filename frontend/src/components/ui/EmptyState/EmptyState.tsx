import React from "react";
import { FolderOpen } from "lucide-react";

export interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-3xl bg-white border border-slate-200 shadow-sm max-w-md mx-auto space-y-4 font-mono">
      <div className="p-4 rounded-2xl bg-brand-50 text-brand-600 border border-brand-200">
        {icon || <FolderOpen size={32} />}
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-bold text-slate-900">{title}</h3>
        <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
      </div>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-md transition-all"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
