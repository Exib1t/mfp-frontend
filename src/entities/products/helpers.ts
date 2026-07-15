import type { Product, ProductStatus, ProductVariant } from "./types";

export const PRODUCT_STATUS_LABELS: Record<ProductStatus, string> = {
  in_stock: "В наявності",
  made_to_order: "Під замовлення",
  out_of_stock: "Немає в наявності",
};

export const DEFAULT_VARIANT_LABEL = "Стандарт";

/** Storefront treats anything that isn't explicitly out of stock as buyable. */
export function isProductAvailableToBuy(product: Product): boolean {
  return product.status !== "out_of_stock";
}

/** Main cover image url, or null when the product has no images. */
export function getMainImageUrl(product: Product): string | null {
  return product.image_urls[0] ?? product.images[0]?.url ?? null;
}

/** Discount percent (rounded) when a sale price is set, otherwise null. */
export function getDiscountPercent(product: Product): number | null {
  if (!product.sale_price || product.sale_price >= product.price) return null;
  return Math.round((1 - product.sale_price / product.price) * 100);
}

/** Effective price shown to the buyer (sale price when present). */
export function getEffectivePrice(product: Product): number {
  return product.sale_price ?? product.price;
}

/** Human label for a variant, e.g. "Червоний · M · Софія". */
export function getVariantLabel(
  variant: Pick<ProductVariant, "color" | "size" | "child_name">,
): string {
  const parts = [variant.color, variant.size, variant.child_name].filter(
    (p): p is string => Boolean(p),
  );
  return parts.length > 0 ? parts.join(" · ") : DEFAULT_VARIANT_LABEL;
}

/** First variant that is in stock, or null. */
export function getFirstAvailableVariant(
  product: Product,
): ProductVariant | null {
  return product.variants.find((v) => v.stock > 0) ?? null;
}

/** Available stock for the given variant, or the product's own stock when it has no variants. */
export function getAvailableStock(
  product: Product,
  variant: ProductVariant | null,
): number {
  return variant ? variant.stock : product.stock;
}
