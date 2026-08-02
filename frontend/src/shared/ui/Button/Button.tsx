import React, { forwardRef } from "react";
import { cn } from "../../utils/cn";
import { ButtonProps, ButtonVariant, ButtonSize } from "./Button.types";

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-brand-600 hover:bg-brand-700 text-white shadow-md focus:ring-brand-500",
  secondary: "bg-slate-100 hover:bg-slate-200 text-slate-900 focus:ring-slate-400",
  outline: "border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 focus:ring-brand-500",
  ghost: "hover:bg-slate-100 text-slate-700 focus:ring-slate-400",
  danger: "bg-rose-600 hover:bg-rose-700 text-white shadow-md focus:ring-rose-500",
  success: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md focus:ring-emerald-500",
};

const sizeStyles: Record<ButtonSize, string> = {
  xs: "px-2 py-1 text-xs rounded-md gap-1",
  sm: "px-3 py-1.5 text-xs rounded-lg gap-1.5",
  md: "px-4 py-2 text-sm rounded-xl gap-2",
  lg: "px-5 py-2.5 text-base rounded-xl gap-2",
  xl: "px-6 py-3.5 text-lg rounded-2xl gap-2.5 font-semibold",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      loading = false,
      leftIcon,
      rightIcon,
      className,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        aria-busy={loading}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:transform-none select-none",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {loading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          <>
            {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
