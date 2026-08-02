import React from 'react';

export function StatCard({ title, value, description, icon, trendColor = 'text-slate-600', className = '' }) {
  return (
    <div className={`border border-slate-200 bg-white p-4 rounded-sm shadow-sm flex flex-col justify-between ${className}`}>
      <div className="flex justify-between items-start mb-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {title}
        </span>
        {icon && <span className="text-slate-400">{icon}</span>}
      </div>
      
      <div>
        <div className="text-2xl font-bold tracking-tight text-slate-900 leading-tight">
          {value}
        </div>
        {description && (
          <div className={`text-[10px] mt-1 font-medium ${trendColor}`}>
            {description}
          </div>
        )}
      </div>
    </div>
  );
}

export default StatCard;
