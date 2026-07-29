import Link from "next/link";
import type { DataTableColumn } from "@/components/admin/DataTable/types";
import Badge from "@/components/controls/Badge/Badge";
import Button from "@/components/controls/Button/Button";
import CopyButton from "@/components/controls/CopyButton/CopyButton";
import Price from "@/components/controls/Price/Price";
import {
  type AdminOrder,
  nextStatus,
  ORDER_STATUS_LABELS,
  ORDER_STATUS_VARIANTS,
  type OrderStatus,
  PAYMENT_STATUS_LABELS,
  PAYMENT_STATUS_VARIANTS,
} from "@/entities/admin/orders/types";
import { formatDateTime } from "@/lib/utils/formatDate";
import { itemsSummary } from "../helpers";

const BASE_CLASS = "admin-orders";

interface ColumnsOptions {
  isAdvancing: boolean;
  onAdvance: (order: AdminOrder, next: OrderStatus) => void;
}

export function buildOrderColumns({
  isAdvancing,
  onAdvance,
}: ColumnsOptions): DataTableColumn<AdminOrder>[] {
  return [
    {
      key: "id",
      header: "№",
      width: "110px",
      render: (order) => (
        <div className={`${BASE_CLASS}_id-cell`}>
          <Link
            href={`/admin/orders/${order.id}`}
            className={`${BASE_CLASS}_id`}
          >
            #{order.id}
          </Link>
          <span className={`${BASE_CLASS}_date`}>
            {formatDateTime(order.created_at)}
          </span>
        </div>
      ),
    },
    {
      key: "customer",
      header: "Покупець",
      width: "minmax(0, 1.6fr)",
      render: (order) => (
        <div className={`${BASE_CLASS}_customer`}>
          <span className={`${BASE_CLASS}_customer-name`}>
            {order.guest_name}
          </span>
          <span className={`${BASE_CLASS}_phone`}>
            {order.guest_phone}
            <CopyButton value={order.guest_phone} label="Скопіювати телефон" />
          </span>
        </div>
      ),
    },
    {
      key: "items",
      header: "Товари",
      width: "minmax(0, 1.6fr)",
      render: (order) => (
        <span className={`${BASE_CLASS}_items`}>{itemsSummary(order)}</span>
      ),
    },
    {
      key: "total",
      header: "Сума",
      width: "130px",
      align: "right",
      render: (order) => <Price value={order.total_price} size="sm" />,
    },
    {
      key: "payment",
      header: "Оплата",
      width: "150px",
      render: (order) => (
        <Badge
          variant={PAYMENT_STATUS_VARIANTS[order.payment_status]}
          size="sm"
        >
          {PAYMENT_STATUS_LABELS[order.payment_status]}
        </Badge>
      ),
    },
    {
      key: "status",
      header: "Статус",
      width: "130px",
      render: (order) => (
        <Badge variant={ORDER_STATUS_VARIANTS[order.status]} size="sm">
          {ORDER_STATUS_LABELS[order.status]}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "",
      width: "150px",
      align: "right",
      // The single most-repeated action in order handling gets its own button,
      // so the common case never needs the detail page.
      render: (order) => {
        const next = nextStatus(order.status);
        if (!next) return null;

        return (
          <Button
            type="button"
            size="sm"
            variant="outline"
            disabled={isAdvancing}
            onClick={() => onAdvance(order, next)}
          >
            {ORDER_STATUS_LABELS[next]}
          </Button>
        );
      },
    },
  ];
}
