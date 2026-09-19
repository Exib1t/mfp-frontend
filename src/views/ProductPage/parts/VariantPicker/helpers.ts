import type { ProductVariant } from "@/entities/products/types";

/** The value picked on each axis, keyed by option (attribute) id. */
export type VariantSelection = Record<number, number>;

/** Reads a variant's combination back into a selection. */
export function selectionOf(variant: ProductVariant | null): VariantSelection {
  if (!variant) return {};

  const selection: VariantSelection = {};
  for (const value of variant.option_values) {
    selection[value.option_id] = value.value_id;
  }
  return selection;
}

function hasValue(
  variant: ProductVariant,
  optionId: number,
  valueId: number,
): boolean {
  return variant.option_values.some(
    (value) => value.option_id === optionId && value.value_id === valueId,
  );
}

/** How many axes of `selection` the variant already agrees with. */
function agreement(
  variant: ProductVariant,
  selection: VariantSelection,
): number {
  return variant.option_values.filter(
    (value) => selection[value.option_id] === value.value_id,
  ).length;
}

/**
 * The variant to switch to when a value is picked on one axis. Keeps as much
 * of the current selection as the catalogue allows — a size that the newly
 * picked colour does not come in has to give way to something, and the closest
 * combination beats dropping the selection entirely.
 */
export function findVariantFor(
  variants: ProductVariant[],
  selection: VariantSelection,
  optionId: number,
  valueId: number,
): ProductVariant | null {
  const candidates = variants.filter((variant) =>
    hasValue(variant, optionId, valueId),
  );
  if (candidates.length === 0) return null;

  return candidates.reduce((best, variant) => {
    const byAgreement =
      agreement(variant, selection) - agreement(best, selection);
    if (byAgreement !== 0) return byAgreement > 0 ? variant : best;

    // Stock does not gate the sale, but an in-stock combination is the better
    // default when two are otherwise equally close.
    const byStock = Number(variant.stock > 0) - Number(best.stock > 0);
    if (byStock !== 0) return byStock > 0 ? variant : best;

    return variant.sort_order < best.sort_order ? variant : best;
  });
}

/**
 * True when at least one variant carrying this value has stock left.
 *
 * A made-to-order product carries `stock: 0` on every variant — the shop does
 * not count stock for it, which is why `getMaxQuantity` sells it up to
 * `MAX_ORDER_QUANTITY` anyway. Reading that as "sold out" greyed out the whole
 * picker next to an enabled buy button, so stock only dims a value on products
 * where the shop tracks it at all.
 */
export function isValueInStock(
  variants: ProductVariant[],
  optionId: number,
  valueId: number,
): boolean {
  const tracksStock = variants.some((variant) => variant.stock > 0);
  if (!tracksStock) return true;

  return variants.some(
    (variant) => hasValue(variant, optionId, valueId) && variant.stock > 0,
  );
}
