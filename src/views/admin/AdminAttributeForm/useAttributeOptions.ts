"use client";

import { useState } from "react";
import { useToast } from "@/components/controls/Toast/ToastProvider";
import {
  useCreateAttributeOption,
  useDeleteAttributeOption,
  useUpdateAttributeOption,
} from "@/entities/admin/attributes/api";
import type {
  AdminAttribute,
  AdminAttributeOption,
} from "@/entities/admin/attributes/types";
import { AttributeOptionFormSchema } from "./schema";
import { type AttributeOptionInput, EMPTY_OPTION_DRAFT } from "./types";

/** CRUD + drag-reorder for the value list of a select-like attribute. */
export function useAttributeOptions(attribute: AdminAttribute) {
  const { toast } = useToast();
  const createOption = useCreateAttributeOption();
  const updateOption = useUpdateAttributeOption();
  const deleteOption = useDeleteAttributeOption();

  const [draft, setDraft] = useState<AttributeOptionInput>(EMPTY_OPTION_DRAFT);
  const [draftError, setDraftError] = useState<string | null>(null);

  const patchDraft = (patch: Partial<AttributeOptionInput>) => {
    setDraft((current) => ({ ...current, ...patch }));
    setDraftError(null);
  };

  const add = () => {
    const parsed = AttributeOptionFormSchema.safeParse(draft);
    if (!parsed.success) {
      setDraftError(parsed.error.issues[0]?.message ?? "Перевірте поля");
      return;
    }

    createOption.mutate(
      {
        params: { path: { id: attribute.id } },
        body: { ...parsed.data, sort_order: attribute.options.length },
      },
      {
        onSuccess: () => setDraft(EMPTY_OPTION_DRAFT),
        onError: () => toast("Не вдалося додати значення", "error"),
      },
    );
  };

  const patch = (
    optionId: number,
    body: Partial<Omit<AdminAttributeOption, "id">>,
  ) =>
    updateOption.mutate(
      { params: { path: { id: attribute.id, optionId } }, body },
      { onError: () => toast("Не вдалося зберегти значення", "error") },
    );

  const remove = (optionId: number) =>
    deleteOption.mutate(
      { params: { path: { id: attribute.id, optionId } } },
      { onError: () => toast("Не вдалося видалити значення", "error") },
    );

  const reorder = (options: AdminAttributeOption[]) => {
    options.forEach((option, index) => {
      if (option.sort_order === index) return;
      patch(option.id, { sort_order: index });
    });
  };

  return {
    draft,
    draftError,
    patchDraft,
    add,
    patch,
    remove,
    reorder,
    isAdding: createOption.isPending,
  };
}
