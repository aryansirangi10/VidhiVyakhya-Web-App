import React, { forwardRef } from "react";
import { cn } from "../../utils/cn";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="block text-sm font-medium text-slate-700">
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          className={cn(
            "w-full min-h-[120px] rounded-xl border bg-white p-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all",
            error
              ? "border-red-500 focus:ring-2 focus:ring-red-200"
              : "border-slate-300 focus:border-brand-600 focus:ring-2 focus:ring-brand-100",
            className
          )}
          {...props}
        />

        {error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : helperText ? (
          <p className="text-sm text-slate-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
