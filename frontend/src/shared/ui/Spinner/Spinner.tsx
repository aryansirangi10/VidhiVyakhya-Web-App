import React from "react";
import { cn } from "../../utils/cn";
import { SpinnerProps } from "./Spinner.types";

const sizes = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-8 w-8 border-3",
};

export function Spinner({ size = "md", className }: SpinnerProps) {
  return (
    <div
      aria-label="Loading"
      role="status"
      className={cn(
        "animate-spin rounded-full border-brand-600 border-t-transparent shrink-0",
        sizes[size],
        className
      )}
    />
  );
}

export default Spinner;
