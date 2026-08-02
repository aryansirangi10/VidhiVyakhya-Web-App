import React from 'react';

export function Tooltip({ definition, loading, position, onClose }) {
  if (loading) {
    return (
      <div 
        className="absolute z-50 w-72 bg-white border border-slate-200 p-4 shadow-xl rounded-sm text-xs text-slate-500 animate-pulse"
        style={{ top: position.top, left: position.left }}
      >
        Loading glossary definition...
      </div>
    );
  }

  if (!definition) return null;

  return (
    <div 
      className="absolute z-50 w-80 bg-white border border-slate-200 p-4 shadow-xl rounded-sm text-xs text-slate-800 transition-all duration-200 scale-100"
      style={{ top: position.top, left: position.left }}
    >
      <div className="flex justify-between items-center mb-2 border-b border-slate-100 pb-1.5">
        <h4 className="font-bold text-brand text-xs uppercase tracking-wide">
          {definition.term}
        </h4>
        <button 
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 text-sm font-semibold px-1"
        >
          ×
        </button>
      </div>
      
      <p className="text-slate-600 mb-2.5 leading-relaxed">
        {definition.definition}
      </p>
      
      {definition.example && (
        <div className="bg-slate-50 p-2 border border-slate-100 rounded-sm mb-2 text-[11px] text-slate-500 leading-normal">
          <span className="font-semibold text-slate-700 block mb-0.5">Example:</span>
          {definition.example}
        </div>
      )}
      
      <div className="flex flex-col gap-1 border-t border-slate-100 pt-2 text-[10px] text-slate-400">
        {definition.source && (
          <div>
            <span className="font-semibold">Source:</span> {definition.source}
          </div>
        )}
        {definition.related && definition.related.length > 0 && (
          <div className="flex flex-wrap gap-1 items-center mt-1">
            <span className="font-semibold">Related:</span>
            {definition.related.map((rel, idx) => (
              <span 
                key={idx} 
                className="bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-sm"
              >
                {rel}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Tooltip;
