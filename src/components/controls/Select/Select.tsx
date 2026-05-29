"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen((v) => !v);
    }
  };

  return (
    <div
      ref={ref}
      className={cn(BASE_CLASS, className, { "-open": open })}
      role="combobox"
      aria-expanded={open}
      aria-label={ariaLabel}
      aria-haspopup="listbox"
      tabIndex={0}
      onKeyDown={handleKey}
    >
      <button
        type="button"
        className={`${BASE_CLASS}_trigger`}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{selectedLabel}</span>
        <ChevronDown
          className={cn(`${BASE_CLASS}_chevron`, { "-open": open })}
          size={14}
          strokeWidth={2}
        />
      </button>

      {open && (
        <ul
          className={`${BASE_CLASS}_dropdown`}
          role="listbox"
          aria-label={ariaLabel}
        >
          {options.map((opt) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              className={cn(`${BASE_CLASS}_option`, {
                "-selected": opt.value === value,
              })}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
              {opt.value === value && (
                <span className={`${BASE_CLASS}_option-check`} aria-hidden="true">✓</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Select;
