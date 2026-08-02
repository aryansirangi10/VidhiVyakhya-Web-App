import React, { useCallback } from 'react';

const TICKS = [300000, 500000, 700000, 1000000, 1500000, 2000000, 2500000, 3000000];

export function IncomeSlider({ value, onChange }) {
  const handleSliderChange = useCallback((e) => {
    onChange(Number(e.target.value));
  }, [onChange]);

  // Format ticks values for display
  const formatTickLabel = (val) => {
    if (val >= 100000) {
      return `${val / 100000}L`;
    }
    return val;
  };

  return (
    <div className="bg-slate-50 border border-slate-200 p-6 rounded-sm w-full">
      <div className="flex justify-between items-center mb-6">
        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Annual Taxable Income (Simulator)
        </label>
        <span className="text-sm font-bold text-slate-900 font-mono">
          ₹{value.toLocaleString('en-IN')}
        </span>
      </div>

      <div className="relative mb-6">
        {/* Value tooltip above active sliding thumb */}
        <input 
          type="range" 
          min="300000" 
          max="3000000" 
          step="50000"
          value={value} 
          onChange={handleSliderChange}
          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-900 focus:outline-none"
        />
      </div>

      {/* Grid Tick labels */}
      <div className="flex justify-between text-[10px] text-slate-400 font-semibold px-1">
        {TICKS.map((tick, idx) => {
          const isActive = value === tick;
          return (
            <button
              key={idx}
              onClick={() => onChange(tick)}
              className={`hover:text-slate-800 focus:outline-none font-mono ${isActive ? 'text-brand font-bold' : ''}`}
            >
              {formatTickLabel(tick)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default IncomeSlider;
