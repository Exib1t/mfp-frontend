"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { $adminApi } from "@/services/api/adminClient";
import type { AdminOrdersQuery } from "./types";

const LIST_PATH = "/api/v1/admin/orders";
const STATS_PATH = "/api/v1/admin/orders/stats";
const DETAIL_PATH = "/api/v1/admin/orders/{id}";
const STATUS_PATH = "/api/v1/admin/orders/{id}/status";

export function useInvalidateOrders() {
  const queryClient = useQueryClient();

  return useCallback(() => {
    void queryClient.invalidateQueries({ queryKey: ["get", LIST_PATH] });
    void queryClient.invalidateQueries({ queryKey: ["get", STATS_PATH] });
    void queryClient.invalidateQueries({ queryKey: ["get", DETAIL_PATH] });
  }, [queryClient]);
}

export function useAdminOrders(query: AdminOrdersQuery = {}) {
  return $adminApi.useQuery(
    "get",
    LIST_PATH,
    { params: { query } },
    { select: (res) => res.data },
  );
}

export function useAdminOrderStats() {
  return $adminApi.useQuery("get", STATS_PATH, {}, { select: (r) => r.data });
}

export function useAdminOrder(id: number | undefined) {
  return $adminApi.useQuery(
    "get",
    DETAIL_PATH,
    { params: { path: { id: id ?? 0 } } },
    { enabled: Boolean(id), select: (res) => res.data },
  );
}

export function useUpdateOrderStatus() {
  const invalidate = useInvalidateOrders();
  return $adminApi.useMutation("patch", STATUS_PATH, { onSuccess: invalidate });
}

export function useUpdateOrder() {
  const invalidate = useInvalidateOrders();
  return $adminApi.useMutation("patch", DETAIL_PATH, { onSuccess: invalidate });
}

export function useArchiveOrder() {
  const invalidate = useInvalidateOrders();
  return $adminApi.useMutation("delete", DETAIL_PATH, {
    onSuccess: invalidate,
  });
}
