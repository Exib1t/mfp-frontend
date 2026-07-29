"use client";

import { useMemo, useState } from "react";
import { useToast } from "@/components/controls/Toast/ToastProvider";
import {
  useAdminCategories,
  useDeleteCategory,
  useUpdateCategory,
} from "@/entities/admin/categories/api";
import { buildCategoryTree } from "@/entities/admin/categories/helpers";
import type {
  AdminCategory,
  CategoryNode,
} from "@/entities/admin/categories/types";

/** Tree data plus sibling reordering and the delete confirmation flow. */
export function useCategoryTree() {
  const { toast } = useToast();
  const { data: categories = [], isLoading, isError } = useAdminCategories();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const [pendingDelete, setPendingDelete] = useState<AdminCategory | null>(
    null,
  );

  const tree = useMemo(() => buildCategoryTree(categories), [categories]);

  /** Siblings only — re-parenting is done from the category form. */
  const reorderSiblings = (siblings: CategoryNode[]) => {
    siblings.forEach((category, index) => {
      if (category.sort_order === index) return;
      updateCategory.mutate(
        {
          params: { path: { id: category.id } },
          body: { sort_order: index },
        },
        { onError: () => toast("Не вдалося змінити порядок", "error") },
      );
    });
  };

  const confirmDelete = () => {
    if (!pendingDelete) return;
    deleteCategory.mutate(
      { params: { path: { id: pendingDelete.id } } },
      {
        onSuccess: () => toast("Категорію видалено", "info"),
        onError: () => toast("Не вдалося видалити категорію", "error"),
        onSettled: () => setPendingDelete(null),
      },
    );
  };

  return {
    categories,
    tree,
    isLoading,
    isError,
    pendingDelete,
    isDeleting: deleteCategory.isPending,
    reorderSiblings,
    requestDelete: setPendingDelete,
    cancelDelete: () => setPendingDelete(null),
    confirmDelete,
  };
}
