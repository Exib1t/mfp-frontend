"use client";

import { X } from "lucide-react";
import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils/cn";

import "./Toast.styles.scss";

export type ToastVariant = "success" | "error" | "info";

interface ToastItem {
  id: number;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  toast: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const AUTO_DISMISS_MS = 3500;
const MAX_VISIBLE = 4;

const BASE_CLASS = "toaster";

const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(0);

  const remove = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (message: string, variant: ToastVariant = "info") => {
      const id = nextId.current++;
      setToasts((prev) =>
        [{ id, message, variant }, ...prev].slice(0, MAX_VISIBLE),
      );
      setTimeout(() => remove(id), AUTO_DISMISS_MS);
    },
    [remove],
  );

  const value = useMemo<ToastContextValue>(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <section
        className={BASE_CLASS}
        aria-live="polite"
        aria-label="Сповіщення"
      >
        {toasts.map((t) => (
          <ToastCard key={t.id} item={t} onClose={() => remove(t.id)} />
        ))}
      </section>
    </ToastContext.Provider>
  );
};

const TOAST_CLASS = "toast";

function ToastCard({
  item,
  onClose,
}: {
  item: ToastItem;
  onClose: () => void;
}) {
  return (
    <div className={cn(TOAST_CLASS)} data-variant={item.variant}>
      <span className={`${TOAST_CLASS}_message`}>{item.message}</span>
      <button
        type="button"
        className={`${TOAST_CLASS}_close`}
        aria-label="Закрити"
        onClick={onClose}
      >
        <X size={14} strokeWidth={2.5} />
      </button>
    </div>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}

export default ToastProvider;
