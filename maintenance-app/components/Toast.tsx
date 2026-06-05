"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface Toast {
  id: string;
  type: "success" | "error" | "info" | "warning";
  title: string;
  message: string;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

function ToastContainer({
  toasts,
  removeToast,
}: {
  toasts: Toast[];
  removeToast: (id: string) => void;
}) {
  if (toasts.length === 0) return null;

  const iconMap = {
    success: "✅",
    error: "❌",
    info: "ℹ️",
    warning: "⚠️",
  };

  const borderMap = {
    success: "border-l-[var(--success-500)]",
    error: "border-l-[var(--danger-500)]",
    info: "border-l-[var(--primary-500)]",
    warning: "border-l-[var(--warning-500)]",
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`glass rounded-xl p-4 border-l-4 ${borderMap[toast.type]} toast-enter cursor-pointer glow-primary`}
          onClick={() => removeToast(toast.id)}
          role="alert"
        >
          <div className="flex items-start gap-3">
            <span className="text-lg mt-0.5">{iconMap[toast.type]}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white">{toast.title}</p>
              <p className="text-xs text-[var(--neutral-400)] mt-1 leading-relaxed">
                {toast.message}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeToast(toast.id);
              }}
              className="text-[var(--neutral-500)] hover:text-white transition-colors text-lg leading-none"
              aria-label="Dismiss notification"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
