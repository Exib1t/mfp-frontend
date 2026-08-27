import { ChevronLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Button from "@/components/controls/Button/Button";
import QuantityStepper from "@/components/controls/QuantityStepper/QuantityStepper";
import Typography from "@/components/controls/Typography/Typography";

import "../../ProductPage.styles.scss";

interface ProductActionsProps {
  canBuy: boolean;
  quantity: number;
  variantStock: number;
  onQuantityChange: (quantity: number) => void;
  onAddToCart: () => void;
}

const BASE_CLASS = "product-page";

function ProductActions({
  canBuy,
  quantity,
  variantStock,
  onQuantityChange,
  onAddToCart,
}: ProductActionsProps) {
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
              max={variantStock}
              onChange={onQuantityChange}
            />
            <Typography variant="caption" color="muted">
              В наявності: {variantStock}
            </Typography>
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
