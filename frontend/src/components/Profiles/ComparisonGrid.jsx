import React from 'react';
import { ProfileCard } from './ProfileCard';

export function ComparisonGrid({ comparisons = [], activeProfileId, onSelectProfile, onAddProfile }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center border-b border-slate-100 pb-2">
        <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Compare Family & Entities
        </h3>
        {onAddProfile && (
          <button 
            onClick={onAddProfile}
            className="text-brand hover:text-indigo-800 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"
          >
            + Add Profile
          </button>
        )}
      </div>

      {comparisons.length === 0 ? (
        <div className="text-xs text-slate-400 py-2 italic">
          No profiles saved yet. Log in to compare multiple entities side-by-side.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {comparisons.map((item) => {
            const isActive = activeProfileId === item.profile_id;
            return (
              <ProfileCard
                key={item.profile_id}
                profile={item}
                isActive={isActive}
                onClick={() => onSelectProfile && onSelectProfile(item.profile_id)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ComparisonGrid;
