"use client";

import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  DEFAULT_VARIANT_LABEL,
  getEffectivePrice,
  getMainImageUrl,
  getVariantLabel,
} from "@/entities/products/helpers";
import type { Product, ProductVariant } from "@/entities/products/types";
import { getCartItemKey, type CartItem } from "./types";

const STORAGE_KEY = "mfp-cart";

interface CartContextValue {
  items: CartItem[];
  totalCount: number;
  subtotal: number;
  originalTotal: number;
  discount: number;
  isReady: boolean;
  addItem: (
    product: Product,
    variant: ProductVariant | null,
    quantity?: number,
  ) => void;
  removeItem: (key: string) => void;
  setQuantity: (key: string, quantity: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function clampQuantity(quantity: number, maxStock: number): number {
  const max = maxStock > 0 ? maxStock : 1;
  return Math.max(1, Math.min(quantity, max));
}

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);
  // Hydrate from localStorage after mount to avoid SSR hydration mismatch.
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      // ignore malformed storage
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, isReady]);

  const value = useMemo<CartContextValue>(() => {
    const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0,
    );
    const originalTotal = items.reduce(
      (sum, item) => sum + item.basePrice * item.quantity,
      0,
    );

    return {
      items,
      totalCount,
      subtotal,
      originalTotal,
      discount: originalTotal - subtotal,
      isReady,

      addItem(product, variant, quantity = 1) {
        setItems((prev) => {
          const maxStock = variant ? variant.stock : product.stock;
          const newKey = getCartItemKey({
            variantId: variant?.id ?? null,
            productId: product.id,
          });
          const existing = prev.find((i) => getCartItemKey(i) === newKey);
          if (existing) {
            return prev.map((i) =>
              getCartItemKey(i) === newKey
                ? {
                    ...i,
                    quantity: clampQuantity(i.quantity + quantity, i.maxStock),
                  }
                : i,
            );
          }
          const newItem: CartItem = {
            variantId: variant?.id ?? null,
            productId: product.id,
            slug: product.slug,
            name: product.name,
            image: getMainImageUrl(product),
            variantLabel: variant ? getVariantLabel(variant) : DEFAULT_VARIANT_LABEL,
            unitPrice: getEffectivePrice(product),
            basePrice: product.price,
            quantity: clampQuantity(quantity, maxStock),
            maxStock,
          };
          return [...prev, newItem];
        });
      },

      removeItem(key) {
        setItems((prev) => prev.filter((i) => getCartItemKey(i) !== key));
      },

      setQuantity(key, quantity) {
        setItems((prev) =>
          prev.map((i) =>
            getCartItemKey(i) === key
              ? { ...i, quantity: clampQuantity(quantity, i.maxStock) }
              : i,
          ),
        );
      },

      clear() {
        setItems([]);
      },
    };
  }, [items, isReady]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}

export default CartProvider;
