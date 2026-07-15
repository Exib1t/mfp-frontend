import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import IconButton from "@/components/controls/IconButton/IconButton";
import QuantityStepper from "@/components/controls/QuantityStepper/QuantityStepper";
import Typography from "@/components/controls/Typography/Typography";
import type { CartItem } from "@/entities/cart/types";
import { formatPrice } from "@/lib/utils/formatPrice";

import "../../CartPage.styles.scss";

interface CartItemRowProps {
  item: CartItem;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}

const BASE_CLASS = "cart-page";

function CartItemRow({ item, onQuantityChange, onRemove }: CartItemRowProps) {
  const lineTotal = item.unitPrice * item.quantity;
  const hasDiscount = item.unitPrice < item.basePrice;

  return (
    <div className={`${BASE_CLASS}_item`}>
      <Link
        href={`/products/${item.slug}`}
        className={`${BASE_CLASS}_item-image-wrap`}
      >
        {item.image ? (
          <Image
            className={`${BASE_CLASS}_item-image`}
            src={item.image}
            alt={item.name}
            fill
            sizes="120px"
          />
        ) : (
          <span className={`${BASE_CLASS}_item-glyph`} aria-hidden="true">
            ✦
          </span>
        )}
      </Link>

      <div className={`${BASE_CLASS}_item-body`}>
        <Typography variant="overline" color="muted">
          {item.variantLabel}
        </Typography>
        <Link
          href={`/products/${item.slug}`}
          className={`${BASE_CLASS}_item-name-link`}
        >
          <Typography
            variant="subtitle1"
            as="h3"
            className={`${BASE_CLASS}_item-name`}
          >
            {item.name}
          </Typography>
        </Link>

        <div className={`${BASE_CLASS}_item-footer`}>
          <QuantityStepper
            size="sm"
            value={item.quantity}
            min={1}
            max={item.maxStock}
            onChange={onQuantityChange}
          />

          <div className={`${BASE_CLASS}_item-price-wrap`}>
            <span
              className={`${BASE_CLASS}_item-price`}
              data-sale={hasDiscount}
            >
              {formatPrice(lineTotal)}
            </span>
            {hasDiscount && (
              <span className={`${BASE_CLASS}_item-price-original`}>
                {formatPrice(item.basePrice * item.quantity)}
              </span>
            )}
          </div>
        </div>
      </div>

      <IconButton
        variant="ghost"
        size="sm"
        className={`${BASE_CLASS}_item-remove`}
        aria-label="Видалити"
        onClick={onRemove}
      >
        <X size={16} strokeWidth={2} />
      </IconButton>
    </div>
  );
}

export default CartItemRow;
