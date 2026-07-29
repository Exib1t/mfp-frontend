"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { $adminApi } from "@/services/api/adminClient";

const LIST_PATH = "/api/v1/admin/categories";
const DETAIL_PATH = "/api/v1/admin/categories/{id}";
const CATEGORY_ATTRIBUTES_PATH =
  "/api/v1/admin/categories/{categoryId}/attributes";

export function useInvalidateCategories() {
  const queryClient = useQueryClient();

  return useCallback(() => {
    void queryClient.invalidateQueries({ queryKey: ["get", LIST_PATH] });
    void queryClient.invalidateQueries({ queryKey: ["get", DETAIL_PATH] });
    void queryClient.invalidateQueries({
      queryKey: ["get", CATEGORY_ATTRIBUTES_PATH],
    });
  }, [queryClient]);
}

export function useAdminCategories() {
  return $adminApi.useQuery(
    "get",
    LIST_PATH,
    {},
    { select: (res) => res.data },
  );
}

export function useAdminCategory(id: number | undefined) {
  return $adminApi.useQuery(
    "get",
    DETAIL_PATH,
    { params: { path: { id: id ?? 0 } } },
    { enabled: Boolean(id), select: (res) => res.data },
  );
}

export function useCreateCategory() {
  const invalidate = useInvalidateCategories();
  return $adminApi.useMutation("post", LIST_PATH, { onSuccess: invalidate });
}

export function useUpdateCategory() {
  const invalidate = useInvalidateCategories();
  return $adminApi.useMutation("patch", DETAIL_PATH, { onSuccess: invalidate });
}

export function useDeleteCategory() {
  const invalidate = useInvalidateCategories();
  return $adminApi.useMutation("delete", DETAIL_PATH, {
    onSuccess: invalidate,
  });
}

export function useCategoryAttributes(categoryId: number | undefined) {
  return $adminApi.useQuery(
    "get",
    CATEGORY_ATTRIBUTES_PATH,
    { params: { path: { categoryId: categoryId ?? 0 } } },
    { enabled: Boolean(categoryId), select: (res) => res.data },
  );
}

export function useSetCategoryAttributes() {
  const invalidate = useInvalidateCategories();
  return $adminApi.useMutation("put", CATEGORY_ATTRIBUTES_PATH, {
    onSuccess: invalidate,
  });
}
