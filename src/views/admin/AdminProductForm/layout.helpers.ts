import {
  PRODUCT_BLOCK_TYPES,
  type ProductBlock,
  type ProductBlockType,
  SINGLETON_BLOCK_TYPES,
} from "@/entities/products/layout";

/** Sensible starting width, in grid columns, per block type. */
const DEFAULT_SPAN: Record<ProductBlockType, number> = {
  gallery: 6,
  summary: 6,
  description: 12,
  specs: 12,
  reviews: 12,
  richtext: 12,
};

export function createBlock(type: ProductBlockType): ProductBlock {
  return {
    id: crypto.randomUUID(),
    type,
    span: DEFAULT_SPAN[type],
    enabled: true,
    ...(type === "richtext" ? { settings: { title: "", body: "" } } : {}),
  };
}

/** Types still addable: singletons drop out once the page already has one. */
export function addableBlockTypes(blocks: ProductBlock[]): ProductBlockType[] {
  const used = new Set(blocks.map((block) => block.type));

  return PRODUCT_BLOCK_TYPES.filter(
    (type) => !SINGLETON_BLOCK_TYPES.includes(type) || !used.has(type),
  );
}

/** Blocks that carry editable text settings, and which keys they use. */
export const BLOCK_TEXT_SETTINGS: Partial<
  Record<ProductBlockType, { title?: boolean; body?: boolean }>
> = {
  description: { title: true },
  richtext: { title: true, body: true },
};
