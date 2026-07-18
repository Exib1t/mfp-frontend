"use client";

import { X } from "lucide-react";
import { type PropsWithChildren, useEffect } from "react";
import IconButton from "@/components/controls/IconButton/IconButton";
import Typography from "@/components/controls/Typography/Typography";
import { cn } from "@/lib/utils/cn";

import "./Modal.styles.scss";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  className?: string;
}

const BASE_CLASS = "modal";

function Modal({
  open,
  onClose,
  title,
  className,
  children,
}: PropsWithChildren<ModalProps>) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    // biome-ignore lint/a11y/useSemanticElements: backdrop wraps the dialog, can't be a real <button>
    <div
      className={`${BASE_CLASS}_overlay`}
      role="button"
      tabIndex={0}
      aria-label="Закрити"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={(e) => {
        if (
          e.target === e.currentTarget &&
          (e.key === "Enter" || e.key === " ")
        )
          onClose();
      }}
    >
      <div
        className={cn(BASE_CLASS, className)}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className={`${BASE_CLASS}_header`}>
          <Typography variant="h4" weight="semibold">
            {title}
          </Typography>
          <IconButton aria-label="Закрити" onClick={onClose}>
            <X size={18} strokeWidth={2} />
          </IconButton>
        </div>
        <div className={`${BASE_CLASS}_content`}>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
