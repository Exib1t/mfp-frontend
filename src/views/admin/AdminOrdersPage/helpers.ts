import type { AdminOrder, AdminOrderItem } from "@/entities/admin/orders/types";

/** Name shown for a line: the checkout snapshot wins over the live catalogue. */
export function itemName(item: AdminOrderItem): string {
  const name = item.product_name ?? item.product?.name ?? "Товар";
  return item.variant_label ? `${name} · ${item.variant_label}` : name;
}

/** "Сукня «Лісова» ×2 +2 позиції" — one line for the list row. */
export function itemsSummary(order: AdminOrder): string {
  const [first, ...rest] = order.items;
  if (!first) return "—";

  const head = `${itemName(first)} ×${first.quantity}`;
  return rest.length > 0 ? `${head} +${rest.length} поз.` : head;
}

export function itemsCount(order: AdminOrder): number {
  return order.items.reduce((sum, item) => sum + item.quantity, 0);
}
