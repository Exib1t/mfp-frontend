export interface CartItem {
  variantId: number;
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
