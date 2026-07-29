"use client";

import { useMemo, useState } from "react";
import { useToast } from "@/components/controls/Toast/ToastProvider";
import {
  useAdminAttributes,
  useDeleteAttribute,
} from "@/entities/admin/attributes/api";
import type { AdminAttribute } from "@/entities/admin/attributes/types";

/** Attribute dictionary: search, group buckets and the delete confirmation. */
export function useAttributesList() {
  const { toast } = useToast();
  const { data: attributes = [], isLoading, isError } = useAdminAttributes();
  const deleteAttribute = useDeleteAttribute();

  const [search, setSearch] = useState("");
  const [pendingDelete, setPendingDelete] = useState<AdminAttribute | null>(
    null,
  );

  const filtered = useMemo(() => {
    const needle = search.trim().toLowerCase();
    if (!needle) return attributes;

    return attributes.filter(
      (attribute) =>
        attribute.name.toLowerCase().includes(needle) ||
        attribute.code.includes(needle),
    );
  }, [attributes, search]);

  const confirmDelete = () => {
    if (!pendingDelete) return;

    deleteAttribute.mutate(
      { params: { path: { id: pendingDelete.id } } },
      {
        onSuccess: () => toast("Характеристику видалено", "info"),
        onError: () => toast("Не вдалося видалити характеристику", "error"),
        onSettled: () => setPendingDelete(null),
      },
    );
  };

  return {
    attributes: filtered,
    total: attributes.length,
    isLoading,
    isError,
    search,
    setSearch,
    pendingDelete,
    isDeleting: deleteAttribute.isPending,
    requestDelete: setPendingDelete,
    cancelDelete: () => setPendingDelete(null),
    confirmDelete,
  };
}
