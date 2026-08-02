import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Card from "../../../../components/ui/Card";
import Badge from "../../../../components/ui/Badge";
import { Bill } from "../../types/bill.types";

export function RelatedBills({ currentBillId, bills }: { currentBillId: number; bills: Bill[] }) {
  const related = bills.filter((b) => b.id !== currentBillId).slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="space-y-4 pt-8 border-t border-slate-200">
      <h3 className="text-xl font-bold text-slate-900">Related Parliamentary Bills</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map((bill) => (
          <Card key={bill.id} hoverable className="p-5 border-slate-200 bg-white space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="info">{bill.category}</Badge>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                {bill.confidence}% Verified
              </span>
            </div>

            <h4 className="text-base font-bold text-slate-900 line-clamp-1">{bill.shortTitle}</h4>
            <p className="text-xs text-slate-600 line-clamp-2">{bill.summary}</p>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">{bill.pages} pages</span>
              <Link to={`/bills/${bill.id}`} className="text-brand-600 font-semibold hover:underline flex items-center gap-1">
                Explore <ArrowRight size={12} />
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default RelatedBills;
