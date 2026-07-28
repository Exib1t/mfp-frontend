"use client";

import { useState } from "react";
import { useDeleteProduct } from "@/entities/admin/products/api";
import type { AdminProduct } from "@/entities/admin/products/types";

const PAGE_SIZE = 20;

/** Search/paging state plus the delete-confirmation flow for the product list. */
export function useProductsListState() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pendingDelete, setPendingDelete] = useState<AdminProduct | null>(null);

  const deleteProduct = useDeleteProduct();

  const query = {
    page,
    limit: PAGE_SIZE,
    ...(search.trim() ? { search: search.trim() } : {}),
  };

  const changeSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const confirmDelete = () => {
    if (!pendingDelete) return;
    deleteProduct.mutate(
      { params: { path: { id: pendingDelete.id } } },
      { onSettled: () => setPendingDelete(null) },
    );
  };

  return {
    search,
    page,
    query,
    pendingDelete,
    isDeleting: deleteProduct.isPending,
    changeSearch,
    setPage,
    requestDelete: setPendingDelete,
    cancelDelete: () => setPendingDelete(null),
    confirmDelete,
  };
}

export { PAGE_SIZE };
