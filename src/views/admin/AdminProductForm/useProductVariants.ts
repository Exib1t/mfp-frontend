"use client";

import { useToast } from "@/components/controls/Toast/ToastProvider";
import type {
  AdminProduct,
  AdminProductVariant,
  UpdateVariantPayload,
} from "@/entities/admin/products/types";
import {
  useCreateVariant,
  useDeleteVariant,
  useUpdateVariant,
} from "@/entities/admin/products/variants.api";
import { missingCombinations } from "./variants.helpers";

/** CRUD, bulk generation and drag-reorder for a product's variants. */
export function useProductVariants(product: AdminProduct) {
  const { toast } = useToast();
  const createVariant = useCreateVariant();
  const updateVariant = useUpdateVariant();
  const deleteVariant = useDeleteVariant();

  const productPath = { id: product.id };
  const fail = () => toast("Не вдалося зберегти варіант", "error");

  const pending = missingCombinations(product.options, product.variants);

  /** Creates a variant for every combination that does not exist yet. */
  const generateMissing = () => {
    if (pending.length === 0) {
      toast("Усі комбінації вже створені", "info");
      return;
    }

    pending.forEach((optionValueIds, index) => {
      createVariant.mutate(
        {
          params: { path: productPath },
          body: {
            option_value_ids: optionValueIds,
            stock: 0,
            sort_order: product.variants.length + index,
            is_default: product.variants.length === 0 && index === 0,
          },
        },
        { onError: fail },
      );
    });

    toast(`Створюємо ${pending.length} комбінацій`, "success");
  };

  const patchVariant = (variantId: number, body: UpdateVariantPayload) =>
    updateVariant.mutate(
      { params: { path: { ...productPath, variantId } }, body },
      { onError: fail },
    );

  const removeVariant = (variantId: number) =>
    deleteVariant.mutate(
      { params: { path: { ...productPath, variantId } } },
      { onError: fail },
    );

  /** Only rows whose index actually moved get written. */
  const reorderVariants = (next: AdminProductVariant[]) => {
    next.forEach((variant, index) => {
      if (variant.sort_order === index) return;
      patchVariant(variant.id, { sort_order: index });
    });
  };

  const makeDefault = (variantId: number) =>
    patchVariant(variantId, { is_default: true });

  return {
    pendingCount: pending.length,
    generateMissing,
    patchVariant,
    removeVariant,
    reorderVariants,
    makeDefault,
    isMutating:
      createVariant.isPending ||
      updateVariant.isPending ||
      deleteVariant.isPending,
  };
}
