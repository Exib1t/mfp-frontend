import { ChevronLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Button from "@/components/controls/Button/Button";
import QuantityStepper from "@/components/controls/QuantityStepper/QuantityStepper";
import Typography from "@/components/controls/Typography/Typography";
import type { ProductStatus } from "@/entities/products/types";

import "../../ProductPage.styles.scss";

interface ProductActionsProps {
  canBuy: boolean;
  status: ProductStatus;
  quantity: number;
  maxQuantity: number;
  lowStock: number | null;
  onQuantityChange: (quantity: number) => void;
  onAddToCart: () => void;
}

const BASE_CLASS = "product-page";

/** What the buy box says about availability under the quantity stepper. */
function availabilityNote(
  status: ProductStatus,
  lowStock: number | null,
): string | null {
  if (status === "made_to_order") return "Виготовляємо на замовлення";
  if (lowStock !== null) return `Залишилось ${lowStock}`;
  return null;
}

function ProductActions({
  canBuy,
  status,
  quantity,
  maxQuantity,
  lowStock,
  onQuantityChange,
  onAddToCart,
}: ProductActionsProps) {
  const note = availabilityNote(status, lowStock);

  return (
    <>
      {canBuy && (
        <div className={`${BASE_CLASS}_qty`}>
          <Typography variant="overline" color="muted">
            Кількість
          </Typography>
          <div className={`${BASE_CLASS}_qty-control`}>
            <QuantityStepper
              value={quantity}
              min={1}
              max={maxQuantity}
              onChange={onQuantityChange}
            />
            {note && (
              <Typography variant="caption" color="muted">
                {note}
              </Typography>
            )}
          </div>
        </div>
      )}

      <div className={`${BASE_CLASS}_actions`}>
        <Button size="lg" fullWidth disabled={!canBuy} onClick={onAddToCart}>
          {canBuy && <ShoppingBag size={18} strokeWidth={2} />}
          {canBuy ? "Додати до кошика" : "Немає в наявності"}
        </Button>
        <Button
          variant="ghost"
          fullWidth
          as={Link}
          href="/products"
          transitionTypes={["nav-back"]}
        >
          <ChevronLeft size={16} strokeWidth={2} />
          Назад до каталогу
        </Button>
      </div>
    </>
  );
}

export default ProductActions;
