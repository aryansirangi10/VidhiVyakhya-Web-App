import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BookOpen,
  FileText,
  Newspaper,
  Calculator,
  Bot,
  LayoutDashboard,
  Star,
  Settings,
  Scale,
} from "lucide-react";

const navItems = [
  { label: "Home", href: "/", icon: <Home size={18} /> },
  { label: "Bills Library", href: "/bills", icon: <BookOpen size={18} /> },
  { label: "Documents", href: "/documents", icon: <FileText size={18} /> },
  { label: "Intelligence", href: "/intelligence", icon: <Newspaper size={18} /> },
  { label: "Impact Calculator", href: "/calculator", icon: <Calculator size={18} /> },
  { label: "AI Workspace", href: "/assistant", icon: <Bot size={18} /> },
  { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard size={18} /> },
  { label: "Watchlist", href: "/watchlist", icon: <Star size={18} /> },
  { label: "Settings", href: "/settings", icon: <Settings size={18} /> },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-slate-950 text-slate-300 border-r border-slate-900 flex flex-col h-screen sticky top-0 shrink-0 select-none">
      {/* BRAND HEADER */}
      <div className="p-6 flex items-center gap-3 border-b border-slate-900">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white shadow-lg">
          <Scale size={20} />
        </div>
        <div>
          <h1 className="text-sm font-extrabold text-white leading-none font-mono tracking-tight">
            VidhiVyakhya <span className="text-[9px] text-emerald-400 bg-emerald-950/60 px-1 py-0.5 rounded border border-emerald-800">2.0</span>
          </h1>
          <p className="text-[11px] text-slate-500 font-mono mt-1">Law, Decoded Personally</p>
        </div>
      </div>

      {/* NAVIGATION ITEMS */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5 scrollbar-thin">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href || (item.href !== "/" && location.pathname.startsWith(item.href));
          return (
            <Link
              key={item.label}
              to={item.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all duration-200 ${
                isActive
                  ? "bg-brand-600/20 text-brand-300 border border-brand-500/30 shadow-inner"
                  : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
              }`}
            >
              <span className={isActive ? "text-brand-400" : "text-slate-500"}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* USER WORKSPACE FOOTER */}
      <div className="p-4 border-t border-slate-900 bg-slate-950/80">
        <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs font-bold font-mono">
            VU
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-slate-200 font-mono truncate">Verified Citizen</h4>
            <p className="text-[10px] text-emerald-400 font-mono truncate">Grounded Session</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
