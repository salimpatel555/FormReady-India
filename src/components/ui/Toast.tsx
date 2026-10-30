"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "info";

interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let nextId = 1;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const toast = useCallback((message: string, type: ToastType = "success") => {
    const id = nextId++;
    setItems((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setItems((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const dismiss = (id: number) => {
    setItems((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none"
        aria-live="polite"
      >
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(
              "pointer-events-auto flex items-center gap-3 rounded-xl border px-4 py-3 shadow-lg backdrop-blur-sm animate-slide-up min-w-[260px] max-w-[360px]",
              item.type === "success" &&
                "bg-emerald-50/95 border-emerald-200 text-emerald-900 dark:bg-emerald-950/90 dark:border-emerald-800 dark:text-emerald-100",
              item.type === "error" &&
                "bg-red-50/95 border-red-200 text-red-900 dark:bg-red-950/90 dark:border-red-800 dark:text-red-100",
              item.type === "info" &&
                "bg-indigo-50/95 border-indigo-200 text-indigo-900 dark:bg-indigo-950/90 dark:border-indigo-800 dark:text-indigo-100"
            )}
          >
            {item.type === "success" && <CheckCircle2 className="h-5 w-5 shrink-0" />}
            {item.type === "error" && <AlertCircle className="h-5 w-5 shrink-0" />}
            {item.type === "info" && <Info className="h-5 w-5 shrink-0" />}
            <p className="flex-1 text-sm font-medium">{item.message}</p>
            <button
              type="button"
              onClick={() => dismiss(item.id)}
              className="rounded-md p-1 opacity-60 hover:opacity-100"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
