import type { Product } from "./types";

export type ProductBlock = NonNullable<Product["layout"]>[number];
export type ProductBlockType = ProductBlock["type"];

/** Blocks flow across this many columns; `span` is a width in them. */
export const PRODUCT_GRID_COLUMNS = 12;

export const PRODUCT_BLOCK_TYPES: ProductBlockType[] = [
  "gallery",
  "summary",
  "description",
  "specs",
  "reviews",
  "richtext",
];

export const PRODUCT_BLOCK_LABELS: Record<ProductBlockType, string> = {
  gallery: "Галерея",
  summary: "Купівля (назва, ціна, варіанти)",
  description: "Опис",
  specs: "Характеристики",
  reviews: "Відгуки",
  richtext: "Довільний текст",
};

/** Blocks that make no sense twice on one page. */
export const SINGLETON_BLOCK_TYPES: ProductBlockType[] = [
  "gallery",
  "summary",
  "specs",
  "reviews",
  "description",
];

/**
 * What a product page looks like when `layout` is null — the hand-written
 * arrangement the storefront shipped with, expressed as blocks.
 */
export const DEFAULT_PRODUCT_LAYOUT: ProductBlock[] = [
  { id: "gallery", type: "gallery", span: 6, enabled: true },
  { id: "summary", type: "summary", span: 6, enabled: true },
  { id: "specs", type: "specs", span: 12, enabled: true },
  { id: "reviews", type: "reviews", span: 12, enabled: true },
];

/** The layout to render: the product's own, or the default when unset/empty. */
export function resolveLayout(product: Product): ProductBlock[] {
  const layout = product.layout;
  if (!layout || layout.length === 0) return DEFAULT_PRODUCT_LAYOUT;
  return layout;
}

export function visibleBlocks(blocks: ProductBlock[]): ProductBlock[] {
  return blocks.filter((block) => block.enabled);
}

export function clampSpan(span: number): number {
  return Math.min(PRODUCT_GRID_COLUMNS, Math.max(1, Math.round(span)));
}

/** Reads a string setting without trusting the opaque `settings` bag. */
export function blockSetting(
  block: ProductBlock,
  key: string,
): string | undefined {
  const value = block.settings?.[key];
  return typeof value === "string" ? value : undefined;
}
