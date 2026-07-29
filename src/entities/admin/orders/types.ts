import type { components } from "@/lib/api/v1";

export type AdminOrder = components["schemas"]["OrderDto"];
export type AdminOrderItem = AdminOrder["items"][number];
export type OrderStatus = AdminOrder["status"];
export type PaymentStatus = AdminOrder["payment_status"];
export type PaymentMethod = AdminOrder["payment_method"];
export type OrderStats = components["schemas"]["OrderStatsDto"];

export type UpdateOrderPayload = components["schemas"]["UpdateOrderDto"];

export interface AdminOrdersQuery {
  page?: number;
  limit?: number;
  status?: OrderStatus;
  payment_status?: PaymentStatus;
  search?: string;
  sort?: "newest" | "oldest" | "total_desc" | "total_asc";
}

/** The happy path, in order. Cancelled sits outside it. */
export const ORDER_FLOW: OrderStatus[] = [
  "new",
  "processing",
  "shipped",
  "delivered",
];

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  new: "Нове",
  processing: "В роботі",
  shipped: "Відправлено",
  delivered: "Доставлено",
  cancelled: "Скасовано",
};

export const ORDER_STATUS_VARIANTS: Record<
  OrderStatus,
  "default" | "primary" | "success" | "warning" | "error"
> = {
  new: "primary",
  processing: "warning",
  shipped: "default",
  delivered: "success",
  cancelled: "error",
};

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  pending: "Очікує оплати",
  paid: "Оплачено",
  failed: "Помилка оплати",
};

export const PAYMENT_STATUS_VARIANTS: Record<
  PaymentStatus,
  "default" | "primary" | "success" | "warning" | "error"
> = {
  pending: "warning",
  paid: "success",
  failed: "error",
};

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  online: "Онлайн",
  cash_on_delivery: "Накладений платіж",
};

export const ORDER_SORT_OPTIONS = [
  { value: "newest", label: "Спочатку нові" },
  { value: "oldest", label: "Спочатку старі" },
  { value: "total_desc", label: "Сума: більші" },
  { value: "total_asc", label: "Сума: менші" },
] as const;

/** Next step in the pipeline, or null at the end / after cancellation. */
export function nextStatus(status: OrderStatus): OrderStatus | null {
  const index = ORDER_FLOW.indexOf(status);
  if (index === -1) return null;
  return ORDER_FLOW[index + 1] ?? null;
}
