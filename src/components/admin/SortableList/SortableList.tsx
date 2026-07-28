"use client";

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { cn } from "@/lib/utils/cn";
import SortableItem from "./parts/SortableItem";
import type { SortableListProps } from "./types";

import "./SortableList.styles.scss";

const BASE_CLASS = "sortable-list";

/**
 * Reorderable list built on dnd-kit. The consumer owns the data: `onReorder`
 * hands back the whole array in its new order and nothing is mutated here.
 */
function SortableList<T>({
  items,
  getId,
  onReorder,
  renderItem,
  direction = "vertical",
  disabled = false,
  className,
}: SortableListProps<T>) {
  const sensors = useSensors(
    // A small distance threshold keeps clicks on buttons inside rows working.
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const ids = items.map(getId);

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;

    const from = ids.indexOf(active.id as never);
    const to = ids.indexOf(over.id as never);
    if (from === -1 || to === -1) return;

    onReorder(arrayMove(items, from, to));
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToParentElement]}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={ids}
        strategy={
          direction === "grid"
            ? rectSortingStrategy
            : verticalListSortingStrategy
        }
      >
        <div className={cn(BASE_CLASS, className)} data-direction={direction}>
          {items.map((item) => (
            <SortableItem
              key={getId(item)}
              id={getId(item)}
              disabled={disabled}
            >
              {(args) => renderItem(item, args)}
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

export default SortableList;
