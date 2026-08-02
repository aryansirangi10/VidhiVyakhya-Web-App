import React from 'react';

export function ProfileCard({ profile, isActive, onClick }) {
  const { display_name, impact, confidence, color } = profile;
  
  const isSavings = impact >= 0;
  const absImpact = Math.abs(impact);
  
  const accentColor = color || "#1E1B4B"; // Default Indigo
  const impactColor = isSavings ? "text-emerald-600" : "text-rose-600";
  const bgClass = isActive ? "bg-slate-50 border-brand shadow-sm" : "bg-white border-slate-200 hover:border-slate-300";

  return (
    <div 
      onClick={onClick}
      className={`border p-4 rounded-sm transition-all cursor-pointer relative flex flex-col justify-between h-28 ${bgClass}`}
      style={{ borderLeftWidth: '4px', borderLeftColor: accentColor }}
    >
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-bold text-slate-800 tracking-tight">
            {display_name || "Profile"}
          </span>
          <span className="text-[8px] font-bold text-slate-400 bg-slate-100 px-1 py-0.5 rounded-sm">
            {Math.round((confidence || 1.0) * 100)}% Verified
          </span>
        </div>
        
        <div className={`text-base font-bold font-mono ${impactColor}`}>
          {isSavings ? '+' : '-'}₹{absImpact.toLocaleString('en-IN')}
        </div>
      </div>

      <div className="text-[9px] text-slate-400 font-semibold tracking-wider uppercase mt-2">
        {isActive ? 'Active Target • Clicked' : 'Compare outcome →'}
      </div>
    </div>
  );
}

export default ProfileCard;
