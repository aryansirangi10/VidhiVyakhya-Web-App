import React from 'react';
import { ConfidenceBadge } from './ConfidenceBadge';

export function CitationCard({ rule, onClickHighlight, isActive }) {
  const isDemo = rule.is_demo_rule || rule.checksum?.includes("demo");

  return (
    <div 
      className={`border p-4 rounded-sm transition-all cursor-pointer ${
        isActive 
          ? 'border-brand bg-slate-50 shadow-sm' 
          : 'border-slate-200 bg-white hover:border-slate-300'
      }`}
      onClick={() => onClickHighlight && onClickHighlight(rule.source_span)}
    >
      <div className="flex justify-between items-start mb-2 gap-2">
        <span className="text-xs font-bold text-slate-800">
          {rule.clause_number}
        </span>
        <ConfidenceBadge rule={rule} />
      </div>

      <p className="text-[11px] text-slate-600 italic leading-relaxed mb-3 border-l-2 border-slate-200 pl-2">
        "{rule.clause_text}"
      </p>

      {/* Audit Log Footer */}
      <div className="flex flex-col gap-1 text-[9px] text-slate-400 font-medium pt-2 border-t border-slate-100">
        {rule.reviewed && rule.reviewed_by ? (
          <div>
            Audited by: <span className="font-semibold text-slate-500">{rule.reviewed_by}</span>
          </div>
        ) : rule.reviewed ? (
          <div>Verified: Legal-finance audit passed</div>
        ) : isDemo ? (
          <div className="text-slate-400">Pre-seeded evaluation sample</div>
        ) : (
          <div className="text-amber-600 font-semibold">Pending human audit validation queue</div>
        )}
        
        {rule.source_span?.page && (
          <div className="flex justify-between items-center mt-1">
            <span>Source Reference: Page {rule.source_span.page}</span>
            <button 
              className="text-brand hover:underline font-bold uppercase tracking-wider text-[8px]"
              onClick={(e) => {
                e.stopPropagation();
                onClickHighlight(rule.source_span);
              }}
            >
              Jump to Clause →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CitationCard;
