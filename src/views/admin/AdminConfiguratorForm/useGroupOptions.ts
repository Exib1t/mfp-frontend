"use client";

import { useState } from "react";
import { useToast } from "@/components/controls/Toast/ToastProvider";
import {
  useCreateConfiguratorOption,
  useDeleteConfiguratorOption,
  useUpdateConfiguratorOption,
} from "@/entities/admin/configurators/api";
import type {
  AdminConfiguratorGroup,
  AdminConfiguratorOption,
  UpdateOptionPayload,
} from "@/entities/admin/configurators/types";
import { slugify } from "@/lib/utils/slugify";

/** CRUD + drag-reorder for the choices inside one step. */
export function useGroupOptions(
  configuratorId: number,
  group: AdminConfiguratorGroup,
) {
  const { toast } = useToast();
  const createOption = useCreateConfiguratorOption();
  const updateOption = useUpdateConfiguratorOption();
  const deleteOption = useDeleteConfiguratorOption();

  const [draft, setDraft] = useState("");
  const path = { id: configuratorId, groupId: group.id };

  const add = () => {
    const label = draft.trim();
    if (!label) return;

    createOption.mutate(
      {
        params: { path },
        // Defaults are restated because the generated payload type marks every
        // zod-defaulted field as required.
        body: {
          label,
          value: uniqueValue(group, slugify(label) || "option"),
          price_modifier: 0,
          is_default: false,
          sort_order: group.options.length,
          is_active: true,
          // Swatches need a colour to render at all; start neutral.
          ...(group.ui === "swatch" ? { color_hex: "#cccccc" } : {}),
        },
      },
      {
        onSuccess: () => setDraft(""),
        onError: () => toast("Не вдалося додати варіант", "error"),
      },
    );
  };

  const patch = (optionId: number, body: UpdateOptionPayload) =>
    updateOption.mutate(
      { params: { path: { ...path, optionId } }, body },
      { onError: () => toast("Не вдалося зберегти варіант", "error") },
    );

  const remove = (optionId: number) =>
    deleteOption.mutate(
      { params: { path: { ...path, optionId } } },
      { onError: () => toast("Не вдалося видалити варіант", "error") },
    );

  const reorder = (options: AdminConfiguratorOption[]) => {
    options.forEach((option, index) => {
      if (option.sort_order === index) return;
      patch(option.id, { sort_order: index });
    });
  };

  return {
    draft,
    setDraft,
    add,
    patch,
    remove,
    reorder,
    isAdding: createOption.isPending,
  };
}

/** Values are unique per group, so a duplicate label gets a numeric suffix. */
function uniqueValue(group: AdminConfiguratorGroup, base: string): string {
  const taken = new Set(group.options.map((option) => option.value));
  if (!taken.has(base)) return base;

  let index = 2;
  while (taken.has(`${base}-${index}`)) index += 1;
  return `${base}-${index}`;
}
