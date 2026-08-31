"use client";

import { useMemo, useState } from "react";
import {
  getAvailableStock,
  getInitialVariant,
  getLowStockCount,
  getMaxQuantity,
  isProductAvailableToBuy,
} from "@/entities/products/helpers";
import type { Product, ProductVariant } from "@/entities/products/types";

interface ProductPurchase {
  selectedVariant: ProductVariant | null;
  selectedVariantId: number | null;
  quantity: number;
  /** Counter as the shop keeps it — advisory, may be 0 on a sellable product. */
  stock: number;
  /** Upper bound for the stepper: the counter, or the order limit without one. */
  maxQuantity: number;
  /** Remaining count worth warning about, or null. */
  lowStock: number | null;
  canBuy: boolean;
  selectVariant: (variantId: number) => void;
  setQuantity: (quantity: number) => void;
}

/** Variant selection + quantity state for the product page buy box. */
export function useProductPurchase(product: Product): ProductPurchase {
  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(
    () => getInitialVariant(product)?.id ?? null,
  );
  const [quantity, setQuantity] = useState(1);

  const selectedVariant = useMemo(
    () =>
      product.variants.find((variant) => variant.id === selectedVariantId) ??
      null,
    [product.variants, selectedVariantId],
  );

  const stock = getAvailableStock(product, selectedVariant);

  const selectVariant = (variantId: number) => {
    setSelectedVariantId(variantId);
    setQuantity(1);
  };

  return {
    selectedVariant,
    selectedVariantId,
    quantity,
    stock,
    maxQuantity: getMaxQuantity(product, selectedVariant),
    lowStock: getLowStockCount(product, selectedVariant),
    canBuy: isProductAvailableToBuy(product),
    selectVariant,
    setQuantity,
  };
}
