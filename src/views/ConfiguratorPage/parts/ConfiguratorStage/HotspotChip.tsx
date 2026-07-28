import { type ReactNode, useCallback, useRef } from "react";
import { cn } from "@/lib/utils/cn";
import { useClickOutside } from "@/lib/utils/useClickOutside";
import type { HotspotConfig } from "./hotspots.config";

interface HotspotChipProps {
  hotspot: HotspotConfig;
  /** Current value shown under the label, e.g. selected fabric name. */
  value?: string;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  /** Editor rendered inside the popover when open. */
  children: ReactNode;
}

const BASE_CLASS = "cfg-hotspot";

function HotspotChip({
  hotspot,
  value,
  isOpen,
  onToggle,
  onClose,
  children,
}: HotspotChipProps) {
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => onClose(), [onClose]);
  useClickOutside(ref, close, isOpen);

  return (
    <div
      ref={ref}
      className={cn(BASE_CLASS, `-side-${hotspot.side}`, { "-open": isOpen })}
      style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
    >
      <span className={`${BASE_CLASS}_dot`} aria-hidden="true" />
      <span className={`${BASE_CLASS}_stem`} aria-hidden="true" />
      <button
        type="button"
        className={`${BASE_CLASS}_chip`}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className={`${BASE_CLASS}_chip-label`}>{hotspot.label}</span>
        {value && <span className={`${BASE_CLASS}_chip-value`}>{value}</span>}
      </button>

      {isOpen && (
        <div className={`${BASE_CLASS}_popover`} role="dialog">
          <div className={`${BASE_CLASS}_popover-inner`}>{children}</div>
        </div>
      )}
    </div>
  );
}

export default HotspotChip;
