import type { AdminOrder } from "@/entities/admin/orders/types";
import {
  PAYMENT_METHOD_LABELS,
  PAYMENT_STATUS_LABELS,
} from "@/entities/admin/orders/types";
import { formatPrice } from "@/lib/utils/formatPrice";
import { itemName } from "../AdminOrdersPage/helpers";

/**
 * Plain-text dump of the order, shaped for pasting into a messenger or a
 * Nova Poshta form — the two places this data always ends up.
 */
export function orderToText(order: AdminOrder): string {
  const lines = [
    `Замовлення #${order.id}`,
    "",
    `Отримувач: ${order.guest_name}`,
    `Телефон: ${order.guest_phone}`,
    `E-mail: ${order.guest_email}`,
    `Адреса: ${order.address}`,
    ...(order.nova_poshta_ref
      ? [`Відділення НП: ${order.nova_poshta_ref}`]
      : []),
    "",
    "Товари:",
    ...order.items.map(
      (item) =>
        `— ${itemName(item)} ×${item.quantity} = ${formatPrice(
          item.price * item.quantity,
        )}`,
    ),
    "",
    `Сума: ${formatPrice(order.total_price)}`,
    `Оплата: ${PAYMENT_METHOD_LABELS[order.payment_method]} (${
      PAYMENT_STATUS_LABELS[order.payment_status]
    })`,
    ...(order.notes ? ["", `Коментар: ${order.notes}`] : []),
  ];

  return lines.join("\n");
}

export function itemsTotal(order: AdminOrder): number {
  return order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
