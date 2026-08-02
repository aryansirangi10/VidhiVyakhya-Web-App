import React, { useState } from "react";
import { cn } from "../../utils/cn";

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function Tooltip({ content, children, className }: TooltipProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      {open && (
        <div
          className={cn(
            "absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 rounded-lg bg-slate-900 px-3 py-2 text-xs text-white shadow-xl",
            className
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}

export default Tooltip;
