import type { CategoryNode } from "@/entities/categories/types";

import "../../ProductsPage.styles.scss";

interface CategoryTreeProps {
  nodes: CategoryNode[];
  selectedId: number | null;
  onSelect: (id: number | null) => void;
  /** Nesting depth, used only for the indent. */
  level?: number;
}

const BASE_CLASS = "products-page";

/**
 * The category list as the admin builds it — nested. Picking a parent keeps
 * its children in the results: the query asks for descendants too.
 */
function CategoryTree({
  nodes,
  selectedId,
  onSelect,
  level = 0,
}: CategoryTreeProps) {
  if (nodes.length === 0) return null;

  return (
    <ul className={`${BASE_CLASS}_cat-list`}>
      {nodes.map((node) => (
        <li key={node.id}>
          <button
            type="button"
            className={`${BASE_CLASS}_cat-item`}
            data-active={selectedId === node.id}
            data-level={level}
            onClick={() => onSelect(selectedId === node.id ? null : node.id)}
          >
            <span>{node.name}</span>
          </button>
          <CategoryTree
            nodes={node.children}
            selectedId={selectedId}
            onSelect={onSelect}
            level={level + 1}
          />
        </li>
      ))}
    </ul>
  );
}

export default CategoryTree;
