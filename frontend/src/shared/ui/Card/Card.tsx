import React, { forwardRef } from "react";
import { cn } from "../../utils/cn";
import { CardProps, CardVariant } from "./Card.types";

const variantStyles: Record<CardVariant, string> = {
  default: "bg-white border border-slate-200 shadow-sm",
  interactive: "bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5 cursor-pointer transition-all",
  glass: "bg-white/80 backdrop-blur-md border border-white/20 shadow-md",
  gradient: "bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-900/50 shadow-xl",
  bordered: "bg-white border-2 border-slate-200 shadow-none",
  elevated: "bg-white border border-slate-100 shadow-xl",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", hoverable, children, ...props }, ref) => {
    const isHover = hoverable !== undefined ? hoverable : variant === "interactive";
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl transition-all duration-200 overflow-hidden",
          variantStyles[variant],
          isHover && "hover:shadow-md hover:-translate-y-0.5 hover:border-slate-300 cursor-pointer",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pb-3", className)} {...props} />;
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-xl font-bold text-slate-900 tracking-tight", className)}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}

export default Card;
