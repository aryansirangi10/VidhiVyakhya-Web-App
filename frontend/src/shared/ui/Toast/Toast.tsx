import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from "lucide-react";
import { cn } from "../../utils/cn";
import { ToastMessage, ToastVariant, ToastPosition } from "./Toast.types";

interface ToastContextState {
  showToast: (toast: Omit<ToastMessage, "id">) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextState | undefined>(undefined);

const variantIcons: Record<ToastVariant, React.ReactNode> = {
  success: <CheckCircle2 className="text-emerald-500 shrink-0" size={20} />,
  error: <AlertCircle className="text-rose-500 shrink-0" size={20} />,
  warning: <AlertTriangle className="text-amber-500 shrink-0" size={20} />,
  info: <Info className="text-blue-500 shrink-0" size={20} />,
};

export function ToastProvider({
  children,
  position = "top-right",
}: {
  children: React.ReactNode;
  position?: ToastPosition;
}) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    ({ title, message, variant = "info", duration = 4000 }: Omit<ToastMessage, "id">) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: ToastMessage = { id, title, message, variant, duration };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  const positionClasses: Record<ToastPosition, string> = {
    "top-left": "top-4 left-4 items-start",
    "top-right": "top-4 right-4 items-end",
    "bottom-left": "bottom-4 left-4 items-start",
    "bottom-right": "bottom-4 right-4 items-end",
  };

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      <div className={cn("fixed z-50 flex flex-col gap-2 pointer-events-none p-2 max-w-md w-full", positionClasses[position])}>
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
              className="pointer-events-auto flex items-start gap-3 rounded-xl bg-white p-4 shadow-xl border border-slate-200 w-full"
            >
              {variantIcons[toast.variant || "info"]}
              <div className="flex-1">
                {toast.title && <h4 className="text-sm font-semibold text-slate-900">{toast.title}</h4>}
                <p className="text-xs text-slate-600 mt-0.5">{toast.message}</p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export default ToastProvider;
