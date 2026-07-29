"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { $adminApi } from "@/services/api/adminClient";

const LIST_PATH = "/api/v1/admin/configurators";
const DETAIL_PATH = "/api/v1/admin/configurators/{id}";
const GROUPS_PATH = "/api/v1/admin/configurators/{id}/groups";
const GROUP_PATH = "/api/v1/admin/configurators/{id}/groups/{groupId}";
const OPTIONS_PATH =
  "/api/v1/admin/configurators/{id}/groups/{groupId}/options";
const OPTION_PATH =
  "/api/v1/admin/configurators/{id}/groups/{groupId}/options/{optionId}";

/**
 * Groups and options are nested inside the preset payload, so every write
 * invalidates the same two reads.
 */
export function useInvalidateConfigurators() {
  const queryClient = useQueryClient();

  return useCallback(() => {
    void queryClient.invalidateQueries({ queryKey: ["get", LIST_PATH] });
    void queryClient.invalidateQueries({ queryKey: ["get", DETAIL_PATH] });
  }, [queryClient]);
}

export function useAdminConfigurators() {
  return $adminApi.useQuery("get", LIST_PATH, {}, { select: (r) => r.data });
}

export function useAdminConfigurator(id: number | undefined) {
  return $adminApi.useQuery(
    "get",
    DETAIL_PATH,
    { params: { path: { id: id ?? 0 } } },
    { enabled: Boolean(id), select: (r) => r.data },
  );
}

export function useCreateConfigurator() {
  const invalidate = useInvalidateConfigurators();
  return $adminApi.useMutation("post", LIST_PATH, { onSuccess: invalidate });
}

export function useUpdateConfigurator() {
  const invalidate = useInvalidateConfigurators();
  return $adminApi.useMutation("patch", DETAIL_PATH, { onSuccess: invalidate });
}

export function useDeleteConfigurator() {
  const invalidate = useInvalidateConfigurators();
  return $adminApi.useMutation("delete", DETAIL_PATH, {
    onSuccess: invalidate,
  });
}

export function useCreateGroup() {
  const invalidate = useInvalidateConfigurators();
  return $adminApi.useMutation("post", GROUPS_PATH, { onSuccess: invalidate });
}

export function useUpdateGroup() {
  const invalidate = useInvalidateConfigurators();
  return $adminApi.useMutation("patch", GROUP_PATH, { onSuccess: invalidate });
}

export function useDeleteGroup() {
  const invalidate = useInvalidateConfigurators();
  return $adminApi.useMutation("delete", GROUP_PATH, { onSuccess: invalidate });
}

export function useCreateConfiguratorOption() {
  const invalidate = useInvalidateConfigurators();
  return $adminApi.useMutation("post", OPTIONS_PATH, { onSuccess: invalidate });
}

export function useUpdateConfiguratorOption() {
  const invalidate = useInvalidateConfigurators();
  return $adminApi.useMutation("patch", OPTION_PATH, { onSuccess: invalidate });
}

export function useDeleteConfiguratorOption() {
  const invalidate = useInvalidateConfigurators();
  return $adminApi.useMutation("delete", OPTION_PATH, {
    onSuccess: invalidate,
  });
}
