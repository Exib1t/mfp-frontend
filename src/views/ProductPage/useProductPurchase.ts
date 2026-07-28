"use client";

import { useMemo, useState } from "react";
import {
  getAvailableStock,
  getInitialVariant,
  isProductAvailableToBuy,
} from "@/entities/products/helpers";
import type { Product, ProductVariant } from "@/entities/products/types";

interface ProductPurchase {
  selectedVariant: ProductVariant | null;
  selectedVariantId: number | null;
  quantity: number;
  stock: number;
  canBuy: boolean;
  selectVariant: (variantId: number) => void;
  setQuantity: (quantity: number) => void;
}

/** Variant selection + quantity state for the product page buy box. */
export function useProductPurchase(product: Product): ProductPurchase {
  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(
    () => getInitialVariant(product)?.id ?? product.variants[0]?.id ?? null,
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
    canBuy: isProductAvailableToBuy(product) && stock > 0,
    selectVariant,
    setQuantity,
  };
}
