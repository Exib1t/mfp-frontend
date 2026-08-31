import {
  DEFAULT_VARIANT_LABEL,
  LOW_STOCK_THRESHOLD,
  MAX_ORDER_QUANTITY,
} from "./constants";
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

/**
 * Default selection: the flagged default, then anything in stock, then the
 * first variant there is. A zero counter never leaves the picker empty —
 * the status decides whether the product sells at all.
 */
export function getInitialVariant(product: Product): ProductVariant | null {
  const flagged = product.variants.find((variant) => variant.is_default);
  return (
    flagged ?? getFirstAvailableVariant(product) ?? product.variants[0] ?? null
  );
}

/** Available stock for the variant, or the product's own stock when it has none. */
export function getAvailableStock(
  product: Product,
  variant: ProductVariant | null,
): number {
  return variant ? variant.stock : product.stock;
}

/**
 * How many of this the buyer may order. A tracked counter caps it; a product
 * sold without one — made to order, or simply not counted — is capped by the
 * order limit instead.
 */
export function getMaxQuantity(
  product: Product,
  variant: ProductVariant | null = null,
): number {
  const stock = getAvailableStock(product, variant);
  return stock > 0 ? stock : MAX_ORDER_QUANTITY;
}

/** Remaining count worth warning about, or null when there is nothing to say. */
export function getLowStockCount(
  product: Product,
  variant: ProductVariant | null = null,
): number | null {
  const stock = getAvailableStock(product, variant);
  return stock > 0 && stock <= LOW_STOCK_THRESHOLD ? stock : null;
}

export interface ColourSwatch {
  id: number;
  label: string;
  color_hex: string;
}

/** One swatch, or nothing when the option carries no colour to paint. */
function toSwatch(option: {
  id: number;
  label: string;
  color_hex: string | null;
}): ColourSwatch[] {
  return option.color_hex
    ? [{ id: option.id, label: option.label, color_hex: option.color_hex }]
    : [];
}

/**
 * Colours to preview on a card. A product that varies by colour exposes them
 * as an option (a variant-forming characteristic); one that comes in a single
 * colour still carries it as a plain `color` attribute, and the card shows
 * that rather than nothing — most of the catalogue has no variants yet.
 */
export function getColourSwatches(product: Product): ColourSwatch[] {
  const fromOptions = product.options
    .flatMap((option) => option.values)
    .flatMap(toSwatch);

  if (fromOptions.length > 0) return dedupeSwatches(fromOptions);

  const fromAttributes = product.attributes
    .filter((attribute) => attribute.type === "color")
    .flatMap((attribute) => {
      const { value } = attribute;
      if (value === null || typeof value !== "object") return [];
      return Array.isArray(value) ? value : [value];
    })
    .flatMap(toSwatch);

  return dedupeSwatches(fromAttributes);
}

/** Same colour twice — from two axes, or an attribute repeated — reads as one. */
function dedupeSwatches(swatches: ColourSwatch[]): ColourSwatch[] {
  const seen = new Map<string, ColourSwatch>();
  for (const swatch of swatches) {
    if (!seen.has(swatch.color_hex)) seen.set(swatch.color_hex, swatch);
  }
  return [...seen.values()];
}
