import Link from "next/link";
import AdminCard from "@/components/admin/AdminCard/AdminCard";
import Typography from "@/components/controls/Typography/Typography";
import type { AdminOrder } from "@/entities/admin/orders/types";
import { formatPrice } from "@/lib/utils/formatPrice";
import { itemName } from "../../AdminOrdersPage/helpers";
import { itemsTotal } from "../helpers";

interface OrderItemsCardProps {
  order: AdminOrder;
}

const BASE_CLASS = "admin-order";

/** Line items as captured at checkout, with a live link when it still exists. */
function OrderItemsCard({ order }: OrderItemsCardProps) {
  const linesTotal = itemsTotal(order);
  const mismatch = Math.abs(linesTotal - order.total_price) > 0.009;

  return (
    <AdminCard title={`Товари (${order.items.length})`}>
      <div className={`${BASE_CLASS}_items`}>
        {order.items.map((item) => (
          <div key={item.id} className={`${BASE_CLASS}_item`}>
            <div className={`${BASE_CLASS}_item-name`}>
              {item.product ? (
                <Link href={`/admin/products/${item.product.id}`}>
                  {itemName(item)}
                </Link>
              ) : (
                <span>{itemName(item)}</span>
              )}
              {item.sku && (
                <code className={`${BASE_CLASS}_sku`}>{item.sku}</code>
              )}
              {!item.product && !item.variant && (
                <Typography variant="caption" color="muted">
                  Товар вилучено з каталогу — дані взяті зі знімка замовлення
                </Typography>
              )}
            </div>

            <span className={`${BASE_CLASS}_item-qty`}>×{item.quantity}</span>
            <span className={`${BASE_CLASS}_item-unit`}>
              {formatPrice(item.price)}
            </span>
            <span className={`${BASE_CLASS}_item-sum`}>
              {formatPrice(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      {mismatch && (
        // Worth surfacing: the stored total is what the customer agreed to,
        // so a drift means the lines were edited or a rounding bug slipped in.
        <Typography variant="caption" className={`${BASE_CLASS}_warning`}>
          Сума позицій ({formatPrice(linesTotal)}) не збігається із загальною
          сумою замовлення ({formatPrice(order.total_price)}).
        </Typography>
      )}
    </AdminCard>
  );
}

export default OrderItemsCard;
