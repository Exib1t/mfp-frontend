import Typography from "@/components/controls/Typography/Typography";
import { formatPrice } from "@/lib/utils/formatPrice";

import "../../CartPage.styles.scss";

interface OrderSummaryProps {
  itemsCount: number;
  originalTotal: number;
  configuratorTotal?: number;
  discount: number;
  grandTotal: number;
}

const BASE_CLASS = "cart-page";

function OrderSummary({
  itemsCount,
  originalTotal,
  configuratorTotal,
  discount,
  grandTotal,
}: OrderSummaryProps) {
  return (
    <div className={`${BASE_CLASS}_summary-rows`}>
      {itemsCount > 0 && (
        <div className={`${BASE_CLASS}_summary-row`}>
          <Typography variant="body2" color="muted">
            Товари ({itemsCount})
          </Typography>
          <Typography variant="body2">{formatPrice(originalTotal)}</Typography>
        </div>
      )}
      {configuratorTotal !== undefined && (
        <div className={`${BASE_CLASS}_summary-row`}>
          <Typography variant="body2" color="muted">
            Вігвам (кастомний)
          </Typography>
          <Typography variant="body2">
            {formatPrice(configuratorTotal)}
          </Typography>
        </div>
      )}
      {discount > 0 && (
        <div className={`${BASE_CLASS}_summary-row`}>
          <Typography variant="body2" color="muted">
            Знижка
          </Typography>
          <Typography variant="body2" color="error">
            −{formatPrice(discount)}
          </Typography>
        </div>
      )}
      <div className={`${BASE_CLASS}_summary-row -total`}>
        <Typography variant="subtitle1">Разом</Typography>
        <Typography variant="subtitle1">{formatPrice(grandTotal)}</Typography>
      </div>
    </div>
  );
}

export default OrderSummary;
