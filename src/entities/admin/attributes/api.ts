"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { $adminApi } from "@/services/api/adminClient";

const LIST_PATH = "/api/v1/admin/attributes";
const DETAIL_PATH = "/api/v1/admin/attributes/{id}";
const OPTIONS_PATH = "/api/v1/admin/attributes/{id}/options";
const OPTION_PATH = "/api/v1/admin/attributes/{id}/options/{optionId}";

export function useInvalidateAttributes() {
  const queryClient = useQueryClient();

  return useCallback(() => {
    void queryClient.invalidateQueries({ queryKey: ["get", LIST_PATH] });
    void queryClient.invalidateQueries({ queryKey: ["get", DETAIL_PATH] });
  }, [queryClient]);
}

export function useAdminAttributes(categoryId?: number) {
  return $adminApi.useQuery(
    "get",
    LIST_PATH,
    { params: { query: categoryId ? { category_id: categoryId } : {} } },
    { select: (res) => res.data },
  );
}

export function useCreateAttribute() {
  const invalidate = useInvalidateAttributes();
  return $adminApi.useMutation("post", LIST_PATH, { onSuccess: invalidate });
}

export function useUpdateAttribute() {
  const invalidate = useInvalidateAttributes();
  return $adminApi.useMutation("patch", DETAIL_PATH, { onSuccess: invalidate });
}

export function useDeleteAttribute() {
  const invalidate = useInvalidateAttributes();
  return $adminApi.useMutation("delete", DETAIL_PATH, {
    onSuccess: invalidate,
  });
}

export function useCreateAttributeOption() {
  const invalidate = useInvalidateAttributes();
  return $adminApi.useMutation("post", OPTIONS_PATH, { onSuccess: invalidate });
}

export function useDeleteAttributeOption() {
  const invalidate = useInvalidateAttributes();
  return $adminApi.useMutation("delete", OPTION_PATH, {
    onSuccess: invalidate,
  });
}
