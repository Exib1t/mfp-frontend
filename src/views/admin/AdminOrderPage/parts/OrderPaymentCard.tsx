"use client";

import AdminCard from "@/components/admin/AdminCard/AdminCard";
import Badge from "@/components/controls/Badge/Badge";
import Button from "@/components/controls/Button/Button";
import Price from "@/components/controls/Price/Price";
import Typography from "@/components/controls/Typography/Typography";
import {
  type AdminOrder,
  PAYMENT_METHOD_LABELS,
  PAYMENT_STATUS_LABELS,
  PAYMENT_STATUS_VARIANTS,
  type PaymentStatus,
} from "@/entities/admin/orders/types";
import { formatDateTime } from "@/lib/utils/formatDate";

interface OrderPaymentCardProps {
  order: AdminOrder;
  isSaving: boolean;
  onPaymentStatus: (status: PaymentStatus) => void;
}

const BASE_CLASS = "admin-order";

function OrderPaymentCard({
  order,
  isSaving,
  onPaymentStatus,
}: OrderPaymentCardProps) {
  return (
    <AdminCard title="Оплата">
      <div className={`${BASE_CLASS}_row`}>
        <Typography variant="body2" color="muted">
          Спосіб
        </Typography>
        <Typography variant="body2">
          {PAYMENT_METHOD_LABELS[order.payment_method]}
        </Typography>
      </div>

      <div className={`${BASE_CLASS}_row`}>
        <Typography variant="body2" color="muted">
          Статус
        </Typography>
        <Badge
          variant={PAYMENT_STATUS_VARIANTS[order.payment_status]}
          size="sm"
        >
          {PAYMENT_STATUS_LABELS[order.payment_status]}
        </Badge>
      </div>

      <div className={`${BASE_CLASS}_row -total`}>
        <Typography variant="body2" color="muted">
          До сплати
        </Typography>
        <Price value={order.total_price} />
      </div>

      <div className={`${BASE_CLASS}_payment-actions`}>
        {order.payment_status !== "paid" && (
          <Button
            type="button"
            size="sm"
            disabled={isSaving}
            onClick={() => onPaymentStatus("paid")}
          >
            Позначити оплаченим
          </Button>
        )}
        {order.payment_status === "paid" && (
          <Button
            type="button"
            size="sm"
            variant="ghost"
            disabled={isSaving}
            onClick={() => onPaymentStatus("pending")}
          >
            Скасувати оплату
          </Button>
        )}
      </div>

      <Typography variant="caption" color="muted">
        Створено {formatDateTime(order.created_at)} · оновлено{" "}
        {formatDateTime(order.updated_at)}
      </Typography>
    </AdminCard>
  );
}

export default OrderPaymentCard;
