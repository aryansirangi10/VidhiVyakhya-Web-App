import React from "react";
import { Check, X } from "lucide-react";

export function PasswordStrength({ password }: { password: string }) {
  const hasLength = password.length >= 12;
  const hasUpper = /[A-Z]/.exec(password) !== null;
  const hasLower = /[a-z]/.exec(password) !== null;
  const hasNumber = /[0-9]/.exec(password) !== null;
  const hasSpecial = /[^A-Za-z0-9]/.exec(password) !== null;

  const score = [hasLength, hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;

  const getLabel = () => {
    if (score <= 1) return { text: "Weak", color: "bg-rose-500", labelColor: "text-rose-500" };
    if (score <= 3) return { text: "Fair", color: "bg-amber-500", labelColor: "text-amber-500" };
    if (score === 4) return { text: "Strong", color: "bg-indigo-500", labelColor: "text-indigo-500" };
    return { text: "Excellent", color: "bg-emerald-500", labelColor: "text-emerald-500" };
  };

  const strength = getLabel();

  return (
    <div className="space-y-3 text-xs font-mono">
      {/* STRENGTH BAR */}
      <div className="space-y-1">
        <div className="flex justify-between items-center text-[10px] font-bold">
          <span className="text-slate-500 uppercase">Password Security</span>
          <span className={`font-bold ${strength.labelColor}`}>{strength.text}</span>
        </div>
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex gap-1">
          {[1, 2, 3, 4, 5].map((level) => (
            <div
              key={level}
              className={`flex-1 h-full transition-all ${
                score >= level ? strength.color : "bg-slate-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* CHECKLIST */}
      <div className="grid grid-cols-2 gap-1.5 text-[11px]">
        <RuleItem label="At least 12 chars" valid={hasLength} />
        <RuleItem label="Uppercase letter" valid={hasUpper} />
        <RuleItem label="Lowercase letter" valid={hasLower} />
        <RuleItem label="Number (0-9)" valid={hasNumber} />
        <RuleItem label="Special symbol" valid={hasSpecial} />
      </div>
    </div>
  );
}

function RuleItem({ label, valid }: { label: string; valid: boolean }) {
  return (
    <div className={`flex items-center gap-1.5 ${valid ? "text-emerald-600 font-bold" : "text-slate-400"}`}>
      {valid ? <Check size={12} /> : <X size={12} />}
      <span>{label}</span>
    </div>
  );
}

export default PasswordStrength;
