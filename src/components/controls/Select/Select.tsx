"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils/cn";

import "./Select.styles.scss";

const BASE_CLASS = "select";

interface SelectOption<T extends string> {
  value: T;
  label: string;
}

interface SelectProps<T extends string> {
  value: T;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
  className?: string;
  "aria-label"?: string;
}

function Select<T extends string>({
  value,
  options,
  onChange,
  className,
  "aria-label": ariaLabel,
}: SelectProps<T>) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxId = useId();
  const selectedLabel = options.find((o) => o.value === value)?.label ?? value;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusOption = (index: number) => {
    const count = options.length;
    optionRefs.current[(index + count) % count]?.focus();
  };

  // Opening moves focus onto the picked option, so arrows and Enter work
  // from there; closing hands it back to the trigger.
  const handleTriggerKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(true);
    }
  };

  const handleOptionKey = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      focusOption(index + 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      focusOption(index - 1);
    } else if (e.key === "Escape" || e.key === "Tab") {
      setOpen(false);
      if (e.key === "Escape") triggerRef.current?.focus();
    }
  };

  useEffect(() => {
    if (!open) return;
    const selected = options.findIndex((o) => o.value === value);
    optionRefs.current[Math.max(selected, 0)]?.focus();
  }, [open, options, value]);

  const pick = (next: T) => {
    onChange(next);
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div ref={ref} className={cn(BASE_CLASS, className, { "-open": open })}>
      <button
        ref={triggerRef}
        type="button"
        className={`${BASE_CLASS}_trigger`}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={handleTriggerKey}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        aria-label={ariaLabel}
      >
        <span>{selectedLabel}</span>
        <ChevronDown
          className={cn(`${BASE_CLASS}_chevron`, { "-open": open })}
          size={14}
          strokeWidth={2}
        />
      </button>

      {open && (
        <div
          id={listboxId}
          className={`${BASE_CLASS}_dropdown`}
          role="listbox"
          aria-label={ariaLabel}
        >
          {options.map((opt, index) => (
            <button
              key={opt.value}
              ref={(node) => {
                optionRefs.current[index] = node;
              }}
              type="button"
              role="option"
              aria-selected={opt.value === value}
              className={cn(`${BASE_CLASS}_option`, {
                "-selected": opt.value === value,
              })}
              onClick={() => pick(opt.value)}
              onKeyDown={(e) => handleOptionKey(e, index)}
            >
              {opt.label}
              {opt.value === value && (
                <span
                  className={`${BASE_CLASS}_option-check`}
                  aria-hidden="true"
                >
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Select;
