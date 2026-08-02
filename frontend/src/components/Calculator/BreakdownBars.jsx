import React, { useEffect, useState } from 'react';

export function BreakdownBars({ breakdown, totalImpact }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Triggers animation after mount
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, [breakdown]);

  const tax = breakdown?.tax || 0;
  const cess = breakdown?.cess || 0;
  const surcharge = breakdown?.surcharge || 0;
  
  const isSavings = totalImpact >= 0;
  const absImpact = Math.max(1, Math.abs(totalImpact));
  
  // Calculate relative sizes for visualization
  const taxPct = mounted ? Math.round((Math.abs(tax) / absImpact) * 100) : 0;
  const cessPct = mounted ? Math.round((Math.abs(cess) / absImpact) * 100) : 0;
  const surchargePct = mounted ? Math.round((Math.abs(surcharge) / absImpact) * 100) : 0;

  // Determine styling color
  const barColor = isSavings ? "bg-emerald-500" : "bg-rose-500";
  const textColor = isSavings ? "text-emerald-600" : "text-rose-600";

  return (
    <div className="border border-slate-200 p-5 rounded-sm bg-white space-y-4">
      <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1.5 block">
        Impact Value Breakdown
      </h4>
      
      {/* 1. Base Tax */}
      <div>
        <div className="flex justify-between text-xs font-medium text-slate-600 mb-1.5">
          <span>Income Tax</span>
          <span className="font-mono">₹{Math.abs(tax).toLocaleString('en-IN')}</span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div 
            className={`h-full ${barColor} transition-all duration-700 ease-out`}
            style={{ width: `${taxPct}%` }}
          ></div>
        </div>
      </div>

      {/* 2. Cess (4%) */}
      <div>
        <div className="flex justify-between text-xs font-medium text-slate-600 mb-1.5">
          <span>Health & Education Cess (4%)</span>
          <span className="font-mono">₹{Math.abs(cess).toLocaleString('en-IN')}</span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div 
            className={`h-full ${barColor} transition-all duration-700 ease-out`}
            style={{ width: `${cessPct}%` }}
          ></div>
        </div>
      </div>

      {/* 3. Surcharge */}
      {surcharge !== 0 && (
        <div>
          <div className="flex justify-between text-xs font-medium text-slate-600 mb-1.5">
            <span>Surcharge</span>
            <span className="font-mono">₹{Math.abs(surcharge).toLocaleString('en-IN')}</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div 
              className={`h-full ${barColor} transition-all duration-700 ease-out`}
              style={{ width: `${surchargePct}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="border-t border-slate-100 pt-3 flex justify-between items-center text-xs font-bold text-slate-800">
        <span>{isSavings ? 'Net Savings' : 'Net Cost Increase'}</span>
        <span className={`text-sm font-mono ${textColor}`}>
          {isSavings ? '+' : '-'}₹{Math.abs(totalImpact).toLocaleString('en-IN')}
        </span>
      </div>
    </div>
  );
}

export default BreakdownBars;
