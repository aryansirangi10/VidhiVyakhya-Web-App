import React from 'react';

export function ReadingTime({ minutes = 3 }) {
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-sm">
      <svg 
        className="w-3 h-3 text-slate-400" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
      {minutes} min read
    </span>
  );
}

export default ReadingTime;
