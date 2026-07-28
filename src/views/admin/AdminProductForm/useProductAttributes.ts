"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/components/controls/Toast/ToastProvider";
import { useAdminAttributes } from "@/entities/admin/attributes/api";
import { useSetProductAttributes } from "@/entities/admin/products/api";
import type { AdminProduct } from "@/entities/admin/products/types";
import type { ProductAttribute } from "@/entities/products/types";

/** Same shape the API accepts for one attribute value. */
export type AttributeDraftValue = string | number | boolean | number[] | null;
export type AttributeDraft = Record<number, AttributeDraftValue>;

/** Flattens a rendered attribute value back into what the API expects. */
function toDraftValue(attribute: ProductAttribute): AttributeDraftValue {
  const { value } = attribute;

  if (value === null || value === undefined) return null;
  if (Array.isArray(value)) return value.map((option) => option.id);
  if (typeof value === "object") return value.id;
  return value;
}

export function useProductAttributes(product: AdminProduct) {
  const { toast } = useToast();
  const { data: attributes = [], isLoading } = useAdminAttributes(
    product.category.id,
  );
  const setAttributes = useSetProductAttributes();

  const [draft, setDraft] = useState<AttributeDraft>({});

  // Re-seed whenever the server copy changes (save, refetch, category switch).
  useEffect(() => {
    const seeded: AttributeDraft = {};
    for (const attribute of product.attributes) {
      seeded[attribute.id] = toDraftValue(attribute);
    }
    setDraft(seeded);
  }, [product.attributes]);

  const setValue = (attributeId: number, value: AttributeDraftValue) =>
    setDraft((current) => ({ ...current, [attributeId]: value }));

  const save = () => {
    const payload = Object.entries(draft)
      // Empty values are simply omitted — the endpoint replaces the whole set.
      .filter(([, value]) => value !== null && value !== "")
      .flatMap(([attributeId, value]) =>
        Array.isArray(value) && value.length === 0
          ? []
          : [{ attribute_id: Number(attributeId), value }],
      );

    setAttributes.mutate(
      { params: { path: { id: product.id } }, body: { attributes: payload } },
      {
        onSuccess: () => toast("Характеристики збережено", "success"),
        onError: () => toast("Не вдалося зберегти характеристики", "error"),
      },
    );
  };

  return {
    attributes,
    isLoading,
    draft,
    setValue,
    save,
    isSaving: setAttributes.isPending,
  };
}
