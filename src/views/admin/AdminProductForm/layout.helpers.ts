import {
  PRODUCT_BLOCK_TYPES,
  type ProductBlock,
  type ProductBlockType,
  SINGLETON_BLOCK_TYPES,
} from "@/entities/products/layout";

/** Where a freshly added block lands, so it is visible straight away. */
const DEFAULT_COLUMN: Record<ProductBlockType, ProductBlock["column"]> = {
  gallery: "left",
  summary: "right",
  description: "full",
  specs: "full",
  reviews: "full",
  richtext: "full",
};

export function createBlock(type: ProductBlockType): ProductBlock {
  return {
    id: crypto.randomUUID(),
    type,
    column: DEFAULT_COLUMN[type],
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
