import React from 'react';

export function Metadata({ metadata, loading, error }) {
  if (loading) {
    return (
      <div className="border border-slate-200 bg-white p-4 rounded-sm shadow-sm animate-pulse space-y-3">
        <div className="h-4 bg-slate-200 rounded w-1/3"></div>
        <div className="h-3 bg-slate-200 rounded w-3/4"></div>
        <div className="h-3 bg-slate-200 rounded w-1/2"></div>
      </div>
    );
  }

  if (error) return <div className="text-xs text-rose-500 py-2">Error: {error}</div>;
  if (!metadata) return null;

  return (
    <div className="border border-slate-200 bg-white p-4 rounded-sm shadow-sm">
      <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-4 border-b border-slate-100 pb-1.5 block">
        Legislative Document Metadata
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6">
        <div>
          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">
            Bill Number
          </span>
          <span className="text-xs font-semibold text-slate-800">
            {metadata.bill_number}
          </span>
        </div>
        
        <div>
          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">
            Sponsoring Ministry
          </span>
          <span className="text-xs font-semibold text-slate-800">
            {metadata.ministry}
          </span>
        </div>

        <div>
          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">
            Cabinet Sponsor
          </span>
          <span className="text-xs font-semibold text-slate-800">
            {metadata.sponsor}
          </span>
        </div>

        <div>
          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">
            Session
          </span>
          <span className="text-xs font-semibold text-slate-800">
            {metadata.parliamentary_session}
          </span>
        </div>

        <div>
          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">
            Exhibits / Length
          </span>
          <span className="text-xs font-semibold text-slate-800">
            {metadata.pages} Pages ({metadata.pdf_size})
          </span>
        </div>

        <div>
          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">
            Effective Date
          </span>
          <span className="text-xs font-semibold text-brand">
            {metadata.effective_date || "Awaiting Enactment"}
          </span>
        </div>

        <div>
          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">
            Language
          </span>
          <span className="text-xs font-semibold text-slate-800">
            {metadata.document_language}
          </span>
        </div>

        <div>
          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">
            Revision Count
          </span>
          <span className="text-xs font-semibold text-slate-800">
            {metadata.amendment_count} Amendments
          </span>
        </div>

        <div>
          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">
            Category
          </span>
          <span className="text-xs font-semibold text-slate-800">
            {metadata.category}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Metadata;
