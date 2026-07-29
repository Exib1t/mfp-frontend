"use client";

import { Trash2 } from "lucide-react";
import Link from "next/link";
import DragHandle from "@/components/admin/SortableList/parts/DragHandle";
import SortableList from "@/components/admin/SortableList/SortableList";
import Badge from "@/components/controls/Badge/Badge";
import type { CategoryNode } from "@/entities/admin/categories/types";

interface CategoryTreeLevelProps {
  nodes: CategoryNode[];
  onReorder: (siblings: CategoryNode[]) => void;
  onDelete: (category: CategoryNode) => void;
}

const BASE_CLASS = "admin-categories";

/** One level of the tree; recurses into `children` for the next. */
function CategoryTreeLevel({
  nodes,
  onReorder,
  onDelete,
}: CategoryTreeLevelProps) {
  if (nodes.length === 0) return null;

  return (
    <SortableList
      items={nodes}
      getId={(node) => node.id}
      onReorder={onReorder}
      renderItem={(node, { dragHandleProps }) => (
        <div className={`${BASE_CLASS}_node`}>
          <div
            className={`${BASE_CLASS}_row`}
            style={{ paddingLeft: `${node.depth * 24}px` }}
          >
            <DragHandle handle={dragHandleProps} />

            <Link
              href={`/admin/categories/${node.id}`}
              className={`${BASE_CLASS}_name`}
            >
              {node.name}
            </Link>

            <span className={`${BASE_CLASS}_slug`}>/{node.slug}</span>

            {node.children.length > 0 && (
              <Badge size="sm">{node.children.length}</Badge>
            )}

            <button
              type="button"
              className={`${BASE_CLASS}_delete`}
              aria-label={`Видалити ${node.name}`}
              onClick={() => onDelete(node)}
            >
              <Trash2 size={15} strokeWidth={2} />
            </button>
          </div>

          <CategoryTreeLevel
            nodes={node.children}
            onReorder={onReorder}
            onDelete={onDelete}
          />
        </div>
      )}
    />
  );
}

export default CategoryTreeLevel;
