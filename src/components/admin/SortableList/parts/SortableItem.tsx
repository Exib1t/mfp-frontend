"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import type { SortableId, SortableRenderArgs } from "../types";

interface SortableItemProps {
  id: SortableId;
  disabled?: boolean;
  children: (args: SortableRenderArgs) => ReactNode;
}

const BASE_CLASS = "sortable-list";

function SortableItem({ id, disabled, children }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled });

  return (
    <div
      ref={setNodeRef}
      className={cn(`${BASE_CLASS}_item`, { "-dragging": isDragging })}
      style={{ transform: CSS.Transform.toString(transform), transition }}
    >
      {children({
        dragHandleProps: { ...attributes, listeners },
        isDragging,
      })}
    </div>
  );
}

export default SortableItem;
