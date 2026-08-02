import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, FileText, Calculator, LayoutDashboard, Sparkles, BookOpen, User, X } from "lucide-react";

export function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const commands = [
    { label: "Bills Explorer", icon: <FileText size={16} />, path: "/bills", category: "Navigation" },
    { label: "Finance Bill 2024 (Clause 4 Standard Deduction)", icon: <BookOpen size={16} />, path: "/bills/1", category: "Bills" },
    { label: "Section 115BAC New Tax Regime", icon: <BookOpen size={16} />, path: "/bills/1", category: "Clauses" },
    { label: "Personal Impact Calculator", icon: <Calculator size={16} />, path: "/calculator", category: "Tools" },
    { label: "Executive Intelligence Dashboard", icon: <LayoutDashboard size={16} />, path: "/dashboard", category: "Tools" },
    { label: "AI Grounded Statutory Assistant", icon: <Sparkles size={16} />, path: "/assistant", category: "AI" },
    { label: "Sign In / Workspace Profile", icon: <User size={16} />, path: "/login", category: "Account" },
  ];

  const filtered = commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery("");
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-start justify-center pt-24 px-4 bg-slate-950/60 backdrop-blur-md animate-fade">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 text-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* SEARCH INPUT */}
        <div className="flex items-center px-6 py-4 border-b border-slate-800 gap-3">
          <Search size={20} className="text-brand-400" />
          <input
            type="text"
            autoFocus
            placeholder="Search bills, rules, clauses, glossary, or command shortcuts (Ctrl + K)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none text-sm text-white placeholder-slate-500 focus:outline-none font-mono"
          />
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-lg">
            <X size={18} />
          </button>
        </div>

        {/* SEARCH RESULTS LIST */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-xs font-mono text-slate-500">
              No matching statutory clauses or commands found.
            </div>
          ) : (
            filtered.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  navigate(item.path);
                  onClose();
                }}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl hover:bg-slate-800 transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-slate-800 group-hover:bg-brand-600 text-brand-400 group-hover:text-white transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-200 group-hover:text-white">
                    {item.label}
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-800/80 px-2 py-0.5 rounded-md uppercase tracking-wider">
                  {item.category}
                </span>
              </button>
            ))
          )}
        </div>

        {/* FOOTER */}
        <div className="px-6 py-3 bg-slate-950/80 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200">ESC</kbd> to close</span>
          <span>VidhiVyakhya 2.0 Global Command Engine</span>
        </div>
      </div>
    </div>
  );
}

export default CommandPalette;
