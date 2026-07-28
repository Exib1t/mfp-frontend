"use client";

import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { DragHandleProps } from "../types";

interface DragHandleButtonProps {
  handle: DragHandleProps;
  label?: string;
  className?: string;
}

const BASE_CLASS = "sortable-list";

/** Grip button wired to a `SortableList` render-prop handle. */
function DragHandle({
  handle,
  label = "Перетягнути",
  className,
}: DragHandleButtonProps) {
  const { listeners, ...attributes } = handle;

  return (
    <button
      type="button"
      className={cn(`${BASE_CLASS}_handle`, className)}
      aria-label={label}
      {...attributes}
      {...listeners}
    >
      <GripVertical size={16} strokeWidth={2} aria-hidden="true" />
    </button>
  );
}

export default DragHandle;
