export interface CartItem {
  /** null when the product has no variants — purchased as itself. */
  variantId: number | null;
  productId: number;
  slug: string;
  name: string;
  image: string | null;
  variantLabel: string;
  /** Effective unit price (sale price when present) captured at add time. */
  unitPrice: number;
  /** Original unit price, used to show the struck-through total. */
  basePrice: number;
  quantity: number;
  maxStock: number;
}

/** Stable identity for a cart line — keyed by variant when present, otherwise by product. */
export function getCartItemKey(
  item: Pick<CartItem, "variantId" | "productId">,
): string {
  return item.variantId != null
    ? `variant-${item.variantId}`
    : `product-${item.productId}`;
}
