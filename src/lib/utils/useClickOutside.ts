import { type RefObject, useEffect } from "react";

/**
 * Calls `handler` when a pointerdown/Escape happens outside `ref`.
 * `enabled` gates the listeners so closed popovers cost nothing.
 */
export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: () => void,
  enabled = true,
) {
  useEffect(() => {
    if (!enabled) return;

    const onPointer = (e: PointerEvent) => {
      const el = ref.current;
      if (el && !el.contains(e.target as Node)) handler();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handler();
    };

    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [ref, handler, enabled]);
}
