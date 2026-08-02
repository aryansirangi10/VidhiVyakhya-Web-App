import React from "react";
import { cn } from "../../utils/cn";

export interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-slate-200/80",
        className
      )}
    />
  );
}

export default Skeleton;
