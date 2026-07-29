import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import type { CSSProperties, ReactNode } from "react";

export type SortableId = string | number;

/** Spread onto whatever element should start the drag (usually a grip button). */
export interface DragHandleProps extends DraggableAttributes {
  listeners: SyntheticListenerMap | undefined;
}

export interface SortableRenderArgs {
  dragHandleProps: DragHandleProps;
  isDragging: boolean;
}

export interface SortableListProps<T> {
  items: T[];
  getId: (item: T) => SortableId;
  /** Receives the full list in its new order. */
  onReorder: (items: T[]) => void;
  renderItem: (item: T, args: SortableRenderArgs) => ReactNode;
  /**
   * `grid` lets rows reflow in both axes (image galleries); `grid-12` is a
   * 12-column layout grid where each item spans `--block-span` columns.
   */
  direction?: "vertical" | "grid" | "grid-12";
  disabled?: boolean;
  className?: string;
  /** Applied to the item wrapper — the element the grid actually positions. */
  getItemStyle?: (item: T) => CSSProperties;
}
