import type { Category, CategoryNode } from "./types";

/**
 * Nests the flat category list by `parent_id`.
 *
 * The API does serve `/categories/tree`, but OpenAPI cannot express the
 * recursive `children` on `CategoryDto`, so consuming it would mean casting.
 * The flat list carries `parent_id` and `sort_order` — everything the nesting
 * needs — and the catalogue already fetches it.
 */
export function buildCategoryTree(categories: Category[]): CategoryNode[] {
  const nodes = new Map<number, CategoryNode>(
    categories.map((category) => [category.id, { ...category, children: [] }]),
  );

  const roots: CategoryNode[] = [];
  for (const node of nodes.values()) {
    const parent = node.parent_id === null ? null : nodes.get(node.parent_id);
    // A child whose parent is missing from the list (archived, or filtered out
    // upstream) is shown at the root rather than dropped.
    if (parent) parent.children.push(node);
    else roots.push(node);
  }

  const sort = (list: CategoryNode[]): CategoryNode[] =>
    list
      .sort(
        (a, b) => a.sort_order - b.sort_order || a.name.localeCompare(b.name),
      )
      .map((node) => ({ ...node, children: sort(node.children) }));

  return sort(roots);
}
