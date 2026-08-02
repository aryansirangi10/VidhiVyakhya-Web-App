import React from 'react';

export function Timeline({ stages = [], loading, error }) {
  if (loading) {
    return (
      <div className="flex items-center justify-between w-full py-4 border border-slate-100 bg-slate-50 p-4 rounded-sm animate-pulse">
        <div className="h-4 bg-slate-200 rounded w-1/4"></div>
        <div className="h-4 bg-slate-200 rounded w-1/4"></div>
        <div className="h-4 bg-slate-200 rounded w-1/4"></div>
      </div>
    );
  }

  if (error) return <div className="text-xs text-rose-500 py-2">Error: {error}</div>;
  if (!stages || stages.length === 0) return null;

  return (
    <div className="border border-slate-200 bg-slate-50 p-4 rounded-sm">
      <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-6 block">
        Legislative Timeline Stages
      </h3>
      
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 relative">
        {stages.map((stage, idx) => {
          const isLast = idx === stages.length - 1;
          
          return (
            <div key={idx} className="flex-1 flex flex-row md:flex-col items-center relative gap-3">
              {/* Node Indicator */}
              <div className="flex items-center justify-center z-10">
                {stage.completed ? (
                  <div className="w-6 h-6 rounded-full bg-brand text-white flex items-center justify-center text-[10px] font-bold shadow-sm">
                    ✓
                  </div>
                ) : stage.current ? (
                  <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold shadow-sm animate-pulse">
                    ●
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full border border-slate-300 bg-white text-slate-400 flex items-center justify-center text-[10px] font-bold">
                    ○
                  </div>
                )}
              </div>

              {/* Text Label */}
              <div className="flex flex-col items-start md:items-center text-left md:text-center">
                <span className={`text-[11px] font-bold ${stage.completed ? 'text-slate-800' : stage.current ? 'text-amber-600' : 'text-slate-400'}`}>
                  {stage.stage}
                </span>
                {stage.date && (
                  <span className="text-[9px] text-slate-400 font-mono mt-0.5">
                    {stage.date}
                  </span>
                )}
              </div>

              {/* Connecting line (for desktop only) */}
              {!isLast && (
                <div className="hidden md:block absolute top-3 left-[calc(50%+12px)] right-[-50%] h-[1px] bg-slate-200 -z-0">
                  <div className={`h-[1px] ${stage.completed ? 'bg-brand' : 'bg-slate-200'}`} style={{ width: '100%' }}></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Timeline;
