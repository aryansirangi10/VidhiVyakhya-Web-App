import React from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { BillStatus } from "../../types/bill.types";

const STAGES: BillStatus[] = [
  "Introduced",
  "Lok Sabha",
  "Rajya Sabha",
  "Assented",
  "Implemented",
];

const statusOrder: Record<BillStatus, number> = {
  Introduced: 1,
  Committee: 1,
  "Lok Sabha": 2,
  "Rajya Sabha": 3,
  Assented: 4,
  Implemented: 5,
};

export function TimelinePreview({ status }: { status: BillStatus }) {
  const currentStep = statusOrder[status] || 1;

  return (
    <div className="flex items-center justify-between w-full py-2">
      {STAGES.map((stage, idx) => {
        const stepNum = idx + 1;
        const isPassed = stepNum <= currentStep;
        return (
          <React.Fragment key={stage}>
            <div className="flex flex-col items-center gap-1">
              {isPassed ? (
                <CheckCircle2 size={16} className="text-emerald-600" />
              ) : (
                <Circle size={16} className="text-slate-300" />
              )}
              <span className={`text-[10px] font-semibold ${isPassed ? "text-slate-800" : "text-slate-400"}`}>
                {stage}
              </span>
            </div>
            {idx < STAGES.length - 1 && (
              <div className={`h-[2px] flex-1 mx-1 ${isPassed ? "bg-emerald-500" : "bg-slate-200"}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default TimelinePreview;
