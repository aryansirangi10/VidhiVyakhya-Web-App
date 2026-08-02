import React from 'react';

export function Badge({ children, variant = 'info', className = '' }) {
  const baseStyle = "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-[10px] font-medium border uppercase tracking-wider";
  
  const variants = {
    info: "bg-indigo-50 text-indigo-700 border-indigo-200",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    error: "bg-rose-50 text-rose-700 border-rose-200",
    gray: "bg-slate-50 text-slate-600 border-slate-200"
  };

  const style = variants[variant] || variants.info;

  return (
    <span className={`${baseStyle} ${style} ${className}`}>
      {children}
    </span>
  );
}

export default Badge;
