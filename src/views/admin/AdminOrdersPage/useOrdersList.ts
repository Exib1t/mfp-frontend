"use client";

import { useState } from "react";
import { useToast } from "@/components/controls/Toast/ToastProvider";
import {
  useAdminOrderStats,
  useAdminOrders,
  useUpdateOrderStatus,
} from "@/entities/admin/orders/api";
import type {
  AdminOrder,
  AdminOrdersQuery,
  OrderStatus,
} from "@/entities/admin/orders/types";

const PAGE_SIZE = 20;

/** Filter/paging state, live status counts and the one-click status advance. */
export function useOrdersList() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<OrderStatus | null>(null);
  const [sort, setSort] = useState<AdminOrdersQuery["sort"]>("newest");
  const [page, setPage] = useState(1);

  const query: AdminOrdersQuery = {
    page,
    limit: PAGE_SIZE,
    sort,
    ...(status ? { status } : {}),
    ...(search.trim() ? { search: search.trim() } : {}),
  };

  const { data, isLoading, isError } = useAdminOrders(query);
  const { data: stats } = useAdminOrderStats();
  const updateStatus = useUpdateOrderStatus();

  /** Any filter change resets to page 1 — page 7 of a new filter is nonsense. */
  const applyFilter = <T>(setter: (value: T) => void) => {
    return (value: T) => {
      setter(value);
      setPage(1);
    };
  };

  const advance = (order: AdminOrder, next: OrderStatus) =>
    updateStatus.mutate(
      {
        params: { path: { id: order.id } },
        body: { status: next, payment_status: order.payment_status },
      },
      {
        onSuccess: () => toast(`Замовлення #${order.id} оновлено`, "success"),
        onError: () => toast("Не вдалося змінити статус", "error"),
      },
    );

  return {
    orders: data?.items ?? [],
    meta: data?.meta,
    stats,
    isLoading,
    isError,
    search,
    status,
    sort,
    page,
    changeSearch: applyFilter(setSearch),
    changeStatus: applyFilter(setStatus),
    changeSort: applyFilter(setSort),
    setPage,
    advance,
    isAdvancing: updateStatus.isPending,
  };
}

export { PAGE_SIZE };
