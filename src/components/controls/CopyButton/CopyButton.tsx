"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";

import "./CopyButton.styles.scss";

interface CopyButtonProps {
  value: string;
  /** Announced to screen readers and shown as the tooltip. */
  label?: string;
  className?: string;
}

const BASE_CLASS = "copy-button";
const FEEDBACK_MS = 1600;

/** Copies `value` to the clipboard and confirms with a tick for a moment. */
function CopyButton({
  value,
  label = "Скопіювати",
  className,
}: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) return;
    const timer = setTimeout(() => setIsCopied(false), FEEDBACK_MS);
    return () => clearTimeout(timer);
  }, [isCopied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setIsCopied(true);
    } catch {
      // Clipboard is unavailable (insecure origin, denied permission) — the
      // value stays selectable on the page, so fail quietly.
    }
  };

  return (
    <button
      type="button"
      className={cn(BASE_CLASS, className, { "-copied": isCopied })}
      aria-label={isCopied ? "Скопійовано" : label}
      title={isCopied ? "Скопійовано" : label}
      onClick={copy}
    >
      {isCopied ? (
        <Check size={14} strokeWidth={2.5} />
      ) : (
        <Copy size={14} strokeWidth={2} />
      )}
    </button>
  );
}

export default CopyButton;
