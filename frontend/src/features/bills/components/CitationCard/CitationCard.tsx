import React from "react";
import { FileText, ExternalLink } from "lucide-react";
import Button from "../../../../components/ui/Button";
import { Clause } from "../../types/clause.types";

export interface CitationCardProps {
  clause: Clause;
  onOpenPdf?: (page: number) => void;
}

export function CitationCard({ clause, onOpenPdf }: CitationCardProps) {
  return (
    <div className="rounded-2xl bg-slate-900 p-5 text-white shadow-md border border-slate-800 space-y-3 font-mono">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-brand-400 font-bold text-xs">
          <FileText size={16} />
          <span>{clause.clauseNumber} • {clause.section}</span>
        </div>
        <span className="text-[10px] text-slate-400 uppercase tracking-wider">Page {clause.pageNumber}</span>
      </div>

      <p className="text-xs text-slate-300 leading-relaxed italic bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
        "{clause.rawText}"
      </p>

      <div className="flex items-center justify-between pt-2 text-xs">
        <span className="text-emerald-400 font-semibold text-[11px]">100% Grounded</span>
        {onOpenPdf && (
          <Button
            size="xs"
            variant="ghost"
            className="text-brand-300 hover:text-white hover:bg-slate-800"
            rightIcon={<ExternalLink size={12} />}
            onClick={() => onOpenPdf(clause.pageNumber)}
          >
            Open in PDF
          </Button>
        )}
      </div>
    </div>
  );
}

export default CitationCard;
