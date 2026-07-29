"use client";

import { useState } from "react";
import { useToast } from "@/components/controls/Toast/ToastProvider";
import {
  useAdminConfigurators,
  useDeleteConfigurator,
} from "@/entities/admin/configurators/api";
import type { AdminConfigurator } from "@/entities/admin/configurators/types";

export function useConfiguratorsList() {
  const { toast } = useToast();
  const {
    data: configurators = [],
    isLoading,
    isError,
  } = useAdminConfigurators();
  const deleteConfigurator = useDeleteConfigurator();

  const [pendingDelete, setPendingDelete] = useState<AdminConfigurator | null>(
    null,
  );

  const confirmDelete = () => {
    if (!pendingDelete) return;

    deleteConfigurator.mutate(
      { params: { path: { id: pendingDelete.id } } },
      {
        onSuccess: () => toast("Конфігуратор видалено", "info"),
        onError: () => toast("Не вдалося видалити конфігуратор", "error"),
        onSettled: () => setPendingDelete(null),
      },
    );
  };

  return {
    configurators,
    isLoading,
    isError,
    pendingDelete,
    isDeleting: deleteConfigurator.isPending,
    requestDelete: setPendingDelete,
    cancelDelete: () => setPendingDelete(null),
    confirmDelete,
  };
}
