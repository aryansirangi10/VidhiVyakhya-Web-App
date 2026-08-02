import React from "react";
import { ShieldCheck, CheckCircle, Clock, Cpu } from "lucide-react";

export interface ConfidenceBadgeProps {
  score: number;
  isHumanReviewed?: boolean;
}

export function ConfidenceBadge({ score, isHumanReviewed = false }: ConfidenceBadgeProps) {
  let label = "AI Generated";
  let colorStyles = "bg-slate-100 text-slate-700 border-slate-200";
  let Icon = Cpu;

  if (isHumanReviewed || score >= 95) {
    label = "Human Reviewed";
    colorStyles = "bg-emerald-50 text-emerald-800 border-emerald-300 ring-1 ring-emerald-500/20";
    Icon = ShieldCheck;
  } else if (score >= 90) {
    label = "Verified";
    colorStyles = "bg-blue-50 text-blue-800 border-blue-300";
    Icon = CheckCircle;
  } else if (score >= 75) {
    label = "Pending Review";
    colorStyles = "bg-amber-50 text-amber-800 border-amber-300";
    Icon = Clock;
  }

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold border transition-colors ${colorStyles}`}>
      <Icon size={14} className="shrink-0" />
      <span>{score}% {label}</span>
    </span>
  );
}

export default ConfidenceBadge;
