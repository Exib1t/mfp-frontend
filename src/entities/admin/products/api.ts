"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { $adminApi } from "@/services/api/adminClient";
import type { AdminProductsQuery } from "./types";

const LIST_PATH = "/api/v1/admin/products";
const DETAIL_PATH = "/api/v1/admin/products/{id}";

/**
 * openapi-react-query keys start with [method, path], so a prefix match
 * invalidates both the list and every product detail.
 */
export function useInvalidateProducts() {
  const queryClient = useQueryClient();

  return useCallback(() => {
    void queryClient.invalidateQueries({ queryKey: ["get", LIST_PATH] });
    void queryClient.invalidateQueries({ queryKey: ["get", DETAIL_PATH] });
  }, [queryClient]);
}

export function useAdminProducts(query: AdminProductsQuery = {}) {
  return $adminApi.useQuery(
    "get",
    LIST_PATH,
    { params: { query } },
    { select: (res) => res.data },
  );
}

export function useAdminProduct(id: number | undefined) {
  return $adminApi.useQuery(
    "get",
    DETAIL_PATH,
    { params: { path: { id: id ?? 0 } } },
    { enabled: Boolean(id), select: (res) => res.data },
  );
}

export function useCreateProduct() {
  const invalidate = useInvalidateProducts();
  return $adminApi.useMutation("post", LIST_PATH, { onSuccess: invalidate });
}

export function useUpdateProduct() {
  const invalidate = useInvalidateProducts();
  return $adminApi.useMutation("patch", DETAIL_PATH, { onSuccess: invalidate });
}

export function useDeleteProduct() {
  const invalidate = useInvalidateProducts();
  return $adminApi.useMutation("delete", DETAIL_PATH, {
    onSuccess: invalidate,
  });
}

export function useSetProductAttributes() {
  const invalidate = useInvalidateProducts();
  return $adminApi.useMutation(
    "put",
    "/api/v1/admin/products/{id}/attributes",
    {
      onSuccess: invalidate,
    },
  );
}

export function useDeleteProductImage() {
  const invalidate = useInvalidateProducts();
  return $adminApi.useMutation(
    "delete",
    "/api/v1/admin/products/{id}/images/{imageId}",
    { onSuccess: invalidate },
  );
}
