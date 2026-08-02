import React, { useState } from "react";
import { Search, Bell, Sun, Moon, Monitor, Command, User, ShieldCheck } from "lucide-react";
import { useTheme } from "../../app/providers/ThemeProvider";

export function Topbar({ onOpenCommand }: { onOpenCommand: () => void }) {
  const { theme, setTheme } = useTheme();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const toggleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-40 select-none">
      {/* SEARCH COMMAND PALETTE TRIGGER */}
      <button
        onClick={onOpenCommand}
        className="flex items-center gap-3 bg-slate-100/80 hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-800 px-4 py-2 rounded-xl text-xs font-mono transition-all w-80 shadow-inner"
      >
        <Search size={16} className="text-slate-400" />
        <span className="flex-1 text-left">Search everything...</span>
        <span className="flex items-center gap-0.5 text-[10px] font-bold bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-600">
          <Command size={10} /> K
        </span>
      </button>

      {/* RIGHT ACTION CONTROLS */}
      <div className="flex items-center gap-3">
        {/* TRUST BADGE */}
        <span className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
          <ShieldCheck size={14} /> 100% Grounded Law
        </span>

        {/* NOTIFICATIONS BUTTON */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2.5 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors relative"
          >
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-brand-600 rounded-full animate-ping" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-brand-600 rounded-full" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl p-4 text-xs font-mono space-y-3 z-50">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[10px]">Citizen Notifications</h4>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <p className="font-bold text-slate-800">Finance Bill 2024 Gazette Updated</p>
                <p className="text-[10px] text-slate-500">Clause 4 standard deduction applied to profile.</p>
              </div>
            </div>
          )}
        </div>

        {/* THEME TOGGLE BUTTON */}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
          title={`Theme: ${theme}`}
        >
          {theme === "light" && <Sun size={18} className="text-amber-500" />}
          {theme === "dark" && <Moon size={18} className="text-indigo-400" />}
          {theme === "system" && <Monitor size={18} className="text-slate-500" />}
        </button>
      </div>
    </header>
  );
}

export default Topbar;
