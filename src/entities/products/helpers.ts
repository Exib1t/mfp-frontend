import { DEFAULT_VARIANT_LABEL } from "./constants";
import type { Product, ProductVariant } from "./types";

/** Storefront treats anything that isn't explicitly out of stock as buyable. */
export function isProductAvailableToBuy(product: Product): boolean {
  return product.status !== "out_of_stock";
}

/** Main cover image url, or null when the product has no images. */
export function getMainImageUrl(product: Product): string | null {
  return product.images[0]?.url ?? null;
}

/** Gallery images for a variant: its own shots first, then the shared ones. */
export function getVariantImages(
  product: Product,
  variant: ProductVariant | null,
): Product["images"] {
  if (!variant) return product.images;

  const own = product.images.filter((image) => image.variant_id === variant.id);
  const shared = product.images.filter((image) => image.variant_id === null);
  return [...own, ...shared];
}

/**
 * The struck-through price for a row: the listed price, when the buyer is
 * actually paying less than it. Null when there is nothing to strike.
 *
 * There used to be a separate `compare_at_price` — a marketing "was" number
 * with no effect on what was charged. It is gone: the only price ever struck
 * through now is one the shop really was asking.
 */
export function getCompareAtPrice(
  effectivePrice: number,
  price: number,
): number | null {
  return price > effectivePrice ? price : null;
}

/** Discount percent (rounded) when the buyer pays less than the listed price. */
export function getDiscountPercent(
  effectivePrice: number,
  price: number,
): number | null {
  const original = getCompareAtPrice(effectivePrice, price);
  if (!original) return null;
  return Math.round((1 - effectivePrice / original) * 100);
}

/** Discount percent for the product headline price. */
export function getProductDiscountPercent(product: Product): number | null {
  return getDiscountPercent(product.effective_price, product.price);
}

/** What the buyer pays for the given variant, falling back to the product. */
export function getEffectivePrice(
  product: Product,
  variant: ProductVariant | null = null,
): number {
  return variant?.effective_price ?? product.effective_price;
}

/** Listed (pre-discount) price for the given variant. */
export function getBasePrice(
  product: Product,
  variant: ProductVariant | null = null,
): number {
  return variant?.price ?? product.price;
}

/** True when the product's variants do not all cost the same. */
export function hasPriceRange(product: Product): boolean {
  return product.price_range.min !== product.price_range.max;
}

/** Human label for a variant, e.g. "Червоний / M". */
export function getVariantLabel(
  variant: Pick<ProductVariant, "label">,
): string {
  return variant.label || DEFAULT_VARIANT_LABEL;
}

/** First variant that is in stock, or null. */
export function getFirstAvailableVariant(
  product: Product,
): ProductVariant | null {
  return product.variants.find((variant) => variant.stock > 0) ?? null;
}

/** Default selection: the flagged default when buyable, else the first in stock. */
export function getInitialVariant(product: Product): ProductVariant | null {
  const preferred = product.variants.find(
    (variant) => variant.is_default && variant.stock > 0,
  );
  return preferred ?? getFirstAvailableVariant(product);
}

/** Available stock for the variant, or the product's own stock when it has none. */
export function getAvailableStock(
  product: Product,
  variant: ProductVariant | null,
): number {
  return variant ? variant.stock : product.stock;
}
