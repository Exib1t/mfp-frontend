import type { AdminCategory, CategoryNode } from "./types";

/**
 * Folds the flat list into a tree. Orphans — rows whose parent was removed or
 * is not visible — are lifted to the root so nothing silently disappears.
 */
export function buildCategoryTree(categories: AdminCategory[]): CategoryNode[] {
  const nodes = new Map<number, CategoryNode>(
    categories.map((category) => [
      category.id,
      { ...category, children: [], depth: 0 },
    ]),
  );

  const roots: CategoryNode[] = [];

  for (const node of nodes.values()) {
    const parent = node.parent_id ? nodes.get(node.parent_id) : undefined;
    if (parent) parent.children.push(node);
    else roots.push(node);
  }

  const applyDepth = (list: CategoryNode[], depth: number) => {
    for (const node of list) {
      node.depth = depth;
      node.children.sort(bySortOrder);
      applyDepth(node.children, depth + 1);
    }
  };

  roots.sort(bySortOrder);
  applyDepth(roots, 0);

  return roots;
}

function bySortOrder(a: AdminCategory, b: AdminCategory): number {
  return a.sort_order - b.sort_order || a.id - b.id;
}

/** Ids of a category and everything beneath it — invalid re-parent targets. */
export function collectSubtreeIds(
  categories: AdminCategory[],
  rootId: number,
): number[] {
  const childrenOf = new Map<number, number[]>();
  for (const category of categories) {
    if (!category.parent_id) continue;
    const bucket = childrenOf.get(category.parent_id) ?? [];
    bucket.push(category.id);
    childrenOf.set(category.parent_id, bucket);
  }

  const ids: number[] = [];
  const walk = (id: number) => {
    ids.push(id);
    for (const child of childrenOf.get(id) ?? []) walk(child);
  };
  walk(rootId);

  return ids;
}

/** "Одяг › Сукні" — used in the parent picker so duplicates stay tellable. */
export function categoryPathLabel(
  categories: AdminCategory[],
  category: AdminCategory,
): string {
  const byId = new Map(categories.map((item) => [item.id, item]));
  const parts: string[] = [category.name];

  let current = category.parent_id ? byId.get(category.parent_id) : undefined;
  // Bounded by the map size — a cycle cannot outlive the visited guard.
  const seen = new Set<number>([category.id]);

  while (current && !seen.has(current.id)) {
    seen.add(current.id);
    parts.unshift(current.name);
    current = current.parent_id ? byId.get(current.parent_id) : undefined;
  }

  return parts.join(" › ");
}
