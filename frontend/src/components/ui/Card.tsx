import React from "react";
import { cn } from "../../utils/cn";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  hoverable?: boolean;
}

export function Card({
  className,
  hover = false,
  hoverable,
  children,
  ...props
}: CardProps) {
  const isHover = hoverable !== undefined ? hoverable : hover;

  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white shadow-sm transition-all",
        isHover && "hover:shadow-md hover:-translate-y-1 hover:border-slate-300",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

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
