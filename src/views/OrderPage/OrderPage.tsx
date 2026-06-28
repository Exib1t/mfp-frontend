"use client";

import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Button from "@/components/controls/Button/Button";
import Typography from "@/components/controls/Typography/Typography";
import { useOrder } from "@/entities/orders/api";
import { getVariantLabel } from "@/entities/products/helpers";
import { formatPrice } from "@/lib/utils/formatPrice";

import "./OrderPage.styles.scss";

interface OrderPageProps {
  orderId: number;
}

const PAYMENT_LABELS: Record<string, string> = {
  cash_on_delivery: "Оплата при отриманні",
  online: "Оплата онлайн",
};

const BASE_CLASS = "order-page";

function OrderPage({ orderId }: OrderPageProps) {
  const { data: order, isLoading, isError } = useOrder(orderId);

  if (isLoading) {
    return (
      <div className={BASE_CLASS}>
        <div className={`${BASE_CLASS}_skeleton`} />
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className={BASE_CLASS}>
        <div className={`${BASE_CLASS}_state`}>
          <Typography variant="h3" as="h1">
            Замовлення не знайдено
          </Typography>
          <Button variant="primary" size="md" as={Link} href="/">
            На головну
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={BASE_CLASS}>
      <div className={`${BASE_CLASS}_inner`}>
        <div className={`${BASE_CLASS}_head`}>
          <CheckCircle2
            size={48}
            strokeWidth={1.5}
            className={`${BASE_CLASS}_icon`}
          />
          <Typography variant="h2" as="h1">
            Дякуємо за замовлення!
          </Typography>
          <Typography variant="body1" color="muted">
            Замовлення №{order.id} прийнято. Підтвердження надіслано на{" "}
            {order.guest_email}.
          </Typography>
        </div>

        <div className={`${BASE_CLASS}_card`}>
          <Typography variant="overline" color="muted">
            Склад замовлення
          </Typography>
          <div className={`${BASE_CLASS}_items`}>
            {order.items.map((item) => (
              <div key={item.id} className={`${BASE_CLASS}_item`}>
                <div className={`${BASE_CLASS}_item-info`}>
                  <Typography variant="body2">
                    {getVariantLabel(item.variant)}
                  </Typography>
                  <Typography variant="caption" color="muted">
                    × {item.quantity}
                  </Typography>
                </div>
                <Typography variant="body2">
                  {formatPrice(item.price * item.quantity)}
                </Typography>
              </div>
            ))}
          </div>

          <div className={`${BASE_CLASS}_total`}>
            <Typography variant="subtitle1">Разом</Typography>
            <Typography variant="subtitle1">
              {formatPrice(order.total_price)}
            </Typography>
          </div>
        </div>

        <div className={`${BASE_CLASS}_card`}>
          <Typography variant="overline" color="muted">
            Доставка та оплата
          </Typography>
          <div className={`${BASE_CLASS}_rows`}>
            <Typography variant="body2">
              <b>Отримувач:</b> {order.guest_name}
            </Typography>
            <Typography variant="body2">
              <b>Телефон:</b> {order.guest_phone}
            </Typography>
            <Typography variant="body2">
              <b>Адреса:</b> {order.address}
            </Typography>
            <Typography variant="body2">
              <b>Оплата:</b>{" "}
              {PAYMENT_LABELS[order.payment_method] ?? order.payment_method}
            </Typography>
          </div>
        </div>

        <Button variant="primary" size="lg" as={Link} href="/products">
          Повернутись до каталогу
        </Button>
      </div>
    </div>
  );
}

export default OrderPage;
