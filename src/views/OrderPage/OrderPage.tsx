"use client";

import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "@/components/controls/Button/Button";
import Skeleton from "@/components/controls/Skeleton/Skeleton";
import Typography from "@/components/controls/Typography/Typography";
import { readConfirmedOrder } from "@/entities/orders/storage";
import type { Order } from "@/entities/orders/types";
import { DEFAULT_VARIANT_LABEL } from "@/entities/products/constants";
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
  // undefined until mounted: session storage is not there during SSR.
  const [order, setOrder] = useState<Order | null>();

  useEffect(() => {
    setOrder(readConfirmedOrder(orderId));
  }, [orderId]);

  if (order === undefined) {
    return (
      <div className={BASE_CLASS}>
        <Skeleton className={`${BASE_CLASS}_skeleton`} />
      </div>
    );
  }

  // Only the tab that placed the order has it — there is no public read.
  if (!order) {
    return (
      <div className={BASE_CLASS}>
        <div className={`${BASE_CLASS}_state`}>
          <Typography variant="h3" as="h1">
            Замовлення не знайдено
          </Typography>
          <Button as={Link} href="/">
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
                  {/* Snapshots win — the catalogue may have changed since checkout. */}
                  <Typography variant="body2">
                    {item.product_name ??
                      item.product?.name ??
                      DEFAULT_VARIANT_LABEL}
                  </Typography>
                  <Typography variant="caption" color="muted">
                    {item.variant_label ? `${item.variant_label} · ` : ""}×{" "}
                    {item.quantity}
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

        <Button size="lg" as={Link} href="/products">
          Повернутись до каталогу
        </Button>
      </div>
    </div>
  );
}

export default OrderPage;
