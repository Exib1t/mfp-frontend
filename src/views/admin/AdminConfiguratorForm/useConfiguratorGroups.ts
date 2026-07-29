"use client";

import { useToast } from "@/components/controls/Toast/ToastProvider";
import {
  useCreateGroup,
  useDeleteGroup,
  useUpdateGroup,
} from "@/entities/admin/configurators/api";
import type {
  AdminConfigurator,
  AdminConfiguratorGroup,
  UpdateGroupPayload,
} from "@/entities/admin/configurators/types";
import { codify } from "@/lib/utils/slugify";

/** CRUD + drag-reorder for the steps of one preset. */
export function useConfiguratorGroups(configurator: AdminConfigurator) {
  const { toast } = useToast();
  const createGroup = useCreateGroup();
  const updateGroup = useUpdateGroup();
  const deleteGroup = useDeleteGroup();

  const path = { id: configurator.id };

  const add = (label: string) => {
    const trimmed = label.trim();
    if (!trimmed) return;

    createGroup.mutate(
      {
        params: { path },
        // Defaults are restated because the generated payload type marks every
        // zod-defaulted field as required.
        body: {
          code: uniqueCode(configurator, codify(trimmed) || "step"),
          label: trimmed,
          ui: "radio",
          is_multiple: false,
          is_required: true,
          price_modifier: 0,
          sort_order: configurator.groups.length,
          is_active: true,
        },
      },
      { onError: () => toast("Не вдалося додати крок", "error") },
    );
  };

  const patch = (groupId: number, body: UpdateGroupPayload) =>
    updateGroup.mutate(
      { params: { path: { ...path, groupId } }, body },
      { onError: () => toast("Не вдалося зберегти крок", "error") },
    );

  const remove = (groupId: number) =>
    deleteGroup.mutate(
      { params: { path: { ...path, groupId } } },
      { onError: () => toast("Не вдалося видалити крок", "error") },
    );

  const reorder = (groups: AdminConfiguratorGroup[]) => {
    groups.forEach((group, index) => {
      if (group.sort_order === index) return;
      patch(group.id, { sort_order: index });
    });
  };

  return { add, patch, remove, reorder, isAdding: createGroup.isPending };
}

/** Codes are unique per preset, so a duplicate label gets a numeric suffix. */
function uniqueCode(configurator: AdminConfigurator, base: string): string {
  const taken = new Set(configurator.groups.map((group) => group.code));
  if (!taken.has(base)) return base;

  let index = 2;
  while (taken.has(`${base}_${index}`)) index += 1;
  return `${base}_${index}`;
}
