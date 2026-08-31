/**
 * The product page's block arrangement.
 *
 * It used to be per-product and editable — `products.layout`. That column is
 * gone: one hand-tuned arrangement serves every product, and the admin no
 * longer spends its time rebuilding the same page. What survives is the shape
 * of a block, so the renderer stays a lookup table rather than a long JSX run.
 */

export type ProductBlockType =
  | "gallery"
  | "summary"
  | "description"
  | "specs"
  | "reviews";

export interface ProductBlock {
  id: string;
  type: ProductBlockType;
  /** Width in grid columns. */
  span: number;
  enabled: boolean;
}

/** Blocks flow across this many columns; `span` is a width in them. */
export const PRODUCT_GRID_COLUMNS = 12;

/** The arrangement every product page uses. */
export const DEFAULT_PRODUCT_LAYOUT: ProductBlock[] = [
  { id: "gallery", type: "gallery", span: 6, enabled: true },
  { id: "summary", type: "summary", span: 6, enabled: true },
  { id: "description", type: "description", span: 12, enabled: true },
  { id: "specs", type: "specs", span: 12, enabled: true },
  { id: "reviews", type: "reviews", span: 12, enabled: true },
];

export function visibleBlocks(blocks: ProductBlock[]): ProductBlock[] {
  return blocks.filter((block) => block.enabled);
}
