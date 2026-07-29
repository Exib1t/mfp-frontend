"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { $adminApi } from "@/services/api/adminClient";

const LIST_PATH = "/api/v1/admin/users";
const DETAIL_PATH = "/api/v1/admin/users/{id}";

export function useInvalidateUsers() {
  const queryClient = useQueryClient();

  return useCallback(() => {
    void queryClient.invalidateQueries({ queryKey: ["get", LIST_PATH] });
    void queryClient.invalidateQueries({ queryKey: ["get", DETAIL_PATH] });
  }, [queryClient]);
}

export function useAdminUsers() {
  return $adminApi.useQuery("get", LIST_PATH, {}, { select: (r) => r.data });
}

export function useCreateUser() {
  const invalidate = useInvalidateUsers();
  return $adminApi.useMutation("post", LIST_PATH, { onSuccess: invalidate });
}

export function useUpdateUser() {
  const invalidate = useInvalidateUsers();
  return $adminApi.useMutation("patch", DETAIL_PATH, { onSuccess: invalidate });
}

export function useDeleteUser() {
  const invalidate = useInvalidateUsers();
  return $adminApi.useMutation("delete", DETAIL_PATH, {
    onSuccess: invalidate,
  });
}
