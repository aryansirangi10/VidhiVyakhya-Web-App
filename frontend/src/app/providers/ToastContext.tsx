import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastContextValue {
  showToast: (type: ToastType, title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((type: ToastType, title: string, message?: string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* TOAST CONTAINER */}
      <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl border shadow-xl backdrop-blur-xl transition-all duration-300 ${
              toast.type === "success"
                ? "bg-slate-900/95 text-white border-emerald-500/40"
                : toast.type === "error"
                ? "bg-slate-900/95 text-white border-rose-500/40"
                : toast.type === "warning"
                ? "bg-slate-900/95 text-white border-amber-500/40"
                : "bg-slate-900/95 text-white border-indigo-500/40"
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {toast.type === "success" && <CheckCircle2 size={18} className="text-emerald-400" />}
              {toast.type === "error" && <AlertCircle size={18} className="text-rose-400" />}
              {toast.type === "warning" && <AlertTriangle size={18} className="text-amber-400" />}
              {toast.type === "info" && <Info size={18} className="text-indigo-400" />}
            </div>
            <div className="flex-1 space-y-0.5">
              <h4 className="text-xs font-bold font-mono tracking-tight">{toast.title}</h4>
              {toast.message && <p className="text-[11px] text-slate-300 font-mono leading-relaxed">{toast.message}</p>}
            </div>
            <button onClick={() => removeToast(toast.id)} className="text-slate-400 hover:text-white transition-colors">
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}
