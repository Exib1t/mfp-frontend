"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/components/controls/Toast/ToastProvider";
import { useUpdateProduct } from "@/entities/admin/products/api";
import type { AdminProduct } from "@/entities/admin/products/types";
import {
  DEFAULT_PRODUCT_LAYOUT,
  type ProductBlock,
  type ProductBlockType,
} from "@/entities/products/layout";
import { createBlock } from "./layout.helpers";

/**
 * Layout editing is a local draft until "Зберегти" — dragging blocks should
 * not fire a request per frame, and the preview needs to react instantly.
 */
export function useProductLayout(product: AdminProduct) {
  const { toast } = useToast();
  const updateProduct = useUpdateProduct();

  const [blocks, setBlocks] = useState<ProductBlock[]>(
    () => product.layout ?? DEFAULT_PRODUCT_LAYOUT,
  );
  const [isDirty, setDirty] = useState(false);

  // Re-seed when the server copy changes (save, refetch, product switch).
  useEffect(() => {
    setBlocks(product.layout ?? DEFAULT_PRODUCT_LAYOUT);
    setDirty(false);
  }, [product.layout]);

  const mutate = (next: ProductBlock[]) => {
    setBlocks(next);
    setDirty(true);
  };

  const addBlock = (type: ProductBlockType) =>
    mutate([...blocks, createBlock(type)]);

  const removeBlock = (id: string) =>
    mutate(blocks.filter((block) => block.id !== id));

  const patchBlock = (id: string, patch: Partial<ProductBlock>) =>
    mutate(
      blocks.map((block) => (block.id === id ? { ...block, ...patch } : block)),
    );

  const setSetting = (id: string, key: string, value: string) =>
    mutate(
      blocks.map((block) =>
        block.id === id
          ? { ...block, settings: { ...block.settings, [key]: value } }
          : block,
      ),
    );

  const save = () =>
    updateProduct.mutate(
      { params: { path: { id: product.id } }, body: { layout: blocks } },
      {
        onSuccess: () => {
          setDirty(false);
          toast("Розкладку збережено", "success");
        },
        onError: () => toast("Не вдалося зберегти розкладку", "error"),
      },
    );

  /** Back to the built-in arrangement — stored as null, not as a copy. */
  const reset = () =>
    updateProduct.mutate(
      { params: { path: { id: product.id } }, body: { layout: null } },
      {
        onSuccess: () => {
          setBlocks(DEFAULT_PRODUCT_LAYOUT);
          setDirty(false);
          toast("Повернуто стандартну розкладку", "info");
        },
        onError: () => toast("Не вдалося скинути розкладку", "error"),
      },
    );

  return {
    blocks,
    isDirty,
    isSaving: updateProduct.isPending,
    reorder: mutate,
    addBlock,
    removeBlock,
    patchBlock,
    setSetting,
    save,
    reset,
  };
}
