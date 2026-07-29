"use client";

import { type RefObject, useCallback, useRef, useState } from "react";
import { clampSpan, PRODUCT_GRID_COLUMNS } from "@/entities/products/layout";

interface UseBlockResizeOptions {
  containerRef: RefObject<HTMLElement | null>;
  /** Column gap of the canvas, in px — needed to translate pixels to columns. */
  columnGap: number;
  onResize: (blockId: string, span: number) => void;
}

/**
 * Turns a horizontal pointer drag into a column span. The column width is
 * measured from the live container at drag start, so the handle stays honest
 * when the editor panel is resized.
 */
export function useBlockResize({
  containerRef,
  columnGap,
  onResize,
}: UseBlockResizeOptions) {
  const [resizingId, setResizingId] = useState<string | null>(null);

  // Read through a ref so the listeners never capture a stale callback.
  const onResizeRef = useRef(onResize);
  onResizeRef.current = onResize;

  const start = useCallback(
    (blockId: string, startSpan: number, event: React.PointerEvent) => {
      const container = containerRef.current;
      if (!container) return;

      // The handle lives inside a draggable card; let it own this gesture.
      event.preventDefault();
      event.stopPropagation();

      const totalGap = columnGap * (PRODUCT_GRID_COLUMNS - 1);
      const columnWidth =
        (container.getBoundingClientRect().width - totalGap) /
        PRODUCT_GRID_COLUMNS;
      const startX = event.clientX;

      setResizingId(blockId);

      const move = (moveEvent: PointerEvent) => {
        const deltaColumns =
          (moveEvent.clientX - startX) / (columnWidth + columnGap);
        onResizeRef.current(blockId, clampSpan(startSpan + deltaColumns));
      };

      const finish = () => {
        setResizingId(null);
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", finish);
      };

      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", finish);
    },
    [containerRef, columnGap],
  );

  return { start, resizingId };
}
