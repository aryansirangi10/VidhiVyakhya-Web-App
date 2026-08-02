import React, { forwardRef } from "react";
import { cn } from "../../utils/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="block text-sm font-medium text-slate-700">
            {label}
          </label>
        )}

        <div
          className={cn(
            "flex items-center rounded-xl border bg-white px-3 py-2 transition-all",
            error
              ? "border-red-500 focus-within:ring-2 focus-within:ring-red-200"
              : "border-slate-300 focus-within:border-brand-600 focus-within:ring-2 focus-within:ring-brand-100",
            className
          )}
        >
          {leftIcon && <span className="mr-2 text-slate-400">{leftIcon}</span>}

          <input
            ref={ref}
            className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 outline-none text-sm"
            {...props}
          />

          {rightIcon && <span className="ml-2 text-slate-400">{rightIcon}</span>}
        </div>

        {error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : helperText ? (
          <p className="text-sm text-slate-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
