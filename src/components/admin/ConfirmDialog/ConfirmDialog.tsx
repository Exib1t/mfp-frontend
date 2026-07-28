"use client";

import { useEffect } from "react";
import Button from "@/components/controls/Button/Button";
import Typography from "@/components/controls/Typography/Typography";

import "./ConfirmDialog.styles.scss";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isPending?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const BASE_CLASS = "confirm-dialog";

/** Blocking confirmation for destructive admin actions. */
function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Видалити",
  cancelLabel = "Скасувати",
  isPending = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  useEffect(() => {
    if (!open) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isPending) onCancel();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, isPending, onCancel]);

  if (!open) return null;

  return (
    <div className={BASE_CLASS} role="dialog" aria-modal="true">
      <button
        type="button"
        className={`${BASE_CLASS}_backdrop`}
        aria-label={cancelLabel}
        disabled={isPending}
        onClick={onCancel}
      />

      <div className={`${BASE_CLASS}_card`}>
        <Typography variant="h4" as="h2" className={`${BASE_CLASS}_title`}>
          {title}
        </Typography>

        {description && (
          <Typography variant="body2" color="muted">
            {description}
          </Typography>
        )}

        <div className={`${BASE_CLASS}_actions`}>
          <Button variant="ghost" onClick={onCancel} disabled={isPending}>
            {cancelLabel}
          </Button>
          <Button onClick={onConfirm} loading={isPending}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
