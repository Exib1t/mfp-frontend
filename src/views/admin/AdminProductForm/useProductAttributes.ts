"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/components/controls/Toast/ToastProvider";
import { useAdminAttributes } from "@/entities/admin/attributes/api";
import { OPTION_BACKED_TYPES } from "@/entities/admin/attributes/types";
import type { AdminAttribute } from "@/entities/admin/attributes/types";
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

  const byId = new Map<number, AdminAttribute>(
    attributes.map((attribute) => [attribute.id, attribute]),
  );

  /**
   * One draft value becomes one entry in the typed column it belongs to.
   *
   * The endpoint used to take an untyped `value` and work out where it went.
   * It now takes the column by name, plus `is_variant` — which this screen
   * never sets: axes are edited in the new admin panel, and a blind `false`
   * here would silently un-make one.
   */
  const save = () => {
    const payload = Object.entries(draft)
      // Empty values are simply omitted — the endpoint replaces the whole set.
      .filter(([, value]) => value !== null && value !== "")
      .flatMap(([key, value]) => {
        const attributeId = Number(key);
        const definition = byId.get(attributeId);
        if (!definition) return [];
        if (Array.isArray(value) && value.length === 0) return [];

        const wasVariant = product.attributes.find(
          (item) => item.id === attributeId,
        )?.is_variant;

        const optionIds = OPTION_BACKED_TYPES.includes(definition.type)
          ? Array.isArray(value)
            ? value
            : typeof value === "number"
              ? [value]
              : []
          : [];

        return [
          {
            attribute_id: attributeId,
            is_variant: wasVariant ?? false,
            option_ids: optionIds,
            value_number:
              definition.type === "number" && typeof value === "number"
                ? value
                : null,
            value_bool:
              definition.type === "boolean" && typeof value === "boolean"
                ? value
                : null,
            value_text:
              definition.type === "text" && typeof value === "string"
                ? value
                : null,
          },
        ];
      });

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
