import React from "react";
import { Link } from "react-router-dom";
import { Calendar, BookOpen, Building2, ArrowRight, ShieldCheck, FileText } from "lucide-react";
import Card from "../../../../components/ui/Card";
import Badge from "../../../../components/ui/Badge";
import Button from "../../../../components/ui/Button";
import { Bill } from "../../types/bill.types";
import TimelinePreview from "../TimelinePreview/TimelinePreview";

export interface BillCardProps {
  bill: Bill;
}

export function BillCard({ bill }: BillCardProps) {
  const statusVariant =
    bill.status === "Implemented" || bill.status === "Assented"
      ? "success"
      : bill.status === "Committee"
      ? "warning"
      : "info";

  return (
    <Card className="group relative flex flex-col justify-between p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-brand-300 border border-slate-200 bg-white">
      <div>
        {/* Header Tags */}
        <div className="flex items-center justify-between gap-2">
          <Badge variant="info">{bill.category}</Badge>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              <ShieldCheck size={12} />
              {bill.confidence}% Verified
            </span>
            <Badge variant={statusVariant}>{bill.status}</Badge>
          </div>
        </div>

        {/* Title & Summary */}
        <h3 className="mt-4 text-xl font-bold text-slate-900 group-hover:text-brand-700 transition-colors line-clamp-2">
          {bill.shortTitle}
        </h3>
        <p className="mt-2 text-sm text-slate-600 line-clamp-3 leading-relaxed">
          {bill.summary}
        </p>

        {/* Timeline Progress */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <TimelinePreview status={bill.status} />
        </div>

        {/* Legislative Metadata */}
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-500 font-medium pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1.5 truncate">
            <Building2 size={14} className="text-slate-400 shrink-0" />
            <span className="truncate">{bill.ministry}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar size={14} className="text-slate-400 shrink-0" />
            <span>{bill.introducedDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen size={14} className="text-slate-400 shrink-0" />
            <span>{bill.pages} pages • {bill.readingTime} min</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FileText size={14} className="text-slate-400 shrink-0" />
            <span>{bill.clauseCount} Clauses</span>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-6 pt-4 border-t border-slate-100">
        <Link to={`/bills/${bill.id}`} className="block w-full">
          <Button variant="outline" className="w-full justify-between group-hover:bg-brand-600 group-hover:text-white group-hover:border-brand-600 transition-all">
            <span>View Details</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </Card>
  );
}

export default BillCard;
