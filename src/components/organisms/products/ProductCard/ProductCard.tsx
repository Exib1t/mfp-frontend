"use client";

import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import Badge from "@/components/controls/Badge/Badge";
import Button from "@/components/controls/Button/Button";
import Price from "@/components/controls/Price/Price";
import { useToast } from "@/components/controls/Toast/ToastProvider";
import Typography from "@/components/controls/Typography/Typography";
import { useCart } from "@/entities/cart/CartContext";
import { MAX_CARD_SWATCHES } from "@/entities/products/constants";
import {
  getColourSwatches,
  getInitialVariant,
  getLowStockCount,
  getMainImageUrl,
  getProductDiscountPercent,
  hasPriceRange,
  isProductAvailableToBuy,
} from "@/entities/products/helpers";
import type { Product } from "@/entities/products/types";
import { cn } from "@/lib/utils/cn";

import "./ProductCard.styles.scss";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const BASE_CLASS = "product-card";

function ProductCard({ product, className }: ProductCardProps) {
  const { addItem } = useCart();
  const { toast } = useToast();
  const { slug, name, category, status, short_description } = product;

  const mainImage = getMainImageUrl(product);
  const discount = getProductDiscountPercent(product);
  const isRange = hasPriceRange(product);
  // Stock is advisory: the status column alone decides whether this sells.
  const canBuy = isProductAvailableToBuy(product);
  const lowStock = getLowStockCount(product);
  const swatches = getColourSwatches(product);
  const shownSwatches = swatches.slice(0, MAX_CARD_SWATCHES);
  const hiddenSwatches = swatches.length - shownSwatches.length;
  const href = `/products/${slug}`;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!canBuy) return;
    addItem(product, getInitialVariant(product));
    toast(`«${name}» додано в кошик`, "success");
  };

  return (
    <article className={cn(BASE_CLASS, className)} data-status={status}>
      <Link
        href={href}
        className={`${BASE_CLASS}_media-link`}
        tabIndex={-1}
        transitionTypes={["nav-forward"]}
      >
        <ViewTransition name={`product-image-${slug}`} share="product-image">
          <div className={`${BASE_CLASS}_image-wrap`}>
            {mainImage ? (
              <Image
                className={`${BASE_CLASS}_image`}
                src={mainImage}
                alt={name}
                fill
                sizes="(max-width: 560px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            ) : (
              <div className={`${BASE_CLASS}_placeholder`}>
                <span
                  className={`${BASE_CLASS}_placeholder-glyph`}
                  aria-hidden="true"
                >
                  ✦
                </span>
              </div>
            )}

            <div className={`${BASE_CLASS}_badges`}>
              {discount !== null && (
                <Badge variant="error" size="sm">
                  −{discount}%
                </Badge>
              )}
              {product.is_featured && (
                <Badge variant="primary" size="sm">
                  Хіт
                </Badge>
              )}
              {status === "made_to_order" && (
                <Badge variant="warning" size="sm">
                  Під замовлення
                </Badge>
              )}
            </div>
          </div>
        </ViewTransition>
      </Link>

      <div className={`${BASE_CLASS}_body`}>
        <Link href={href} className={`${BASE_CLASS}_body-link`}>
          <Typography variant="overline" color="muted">
            {category.name}
          </Typography>
          <Typography
            variant="subtitle1"
            as="h3"
            className={`${BASE_CLASS}_name`}
          >
            {name}
          </Typography>
          {short_description && (
            <Typography
              variant="body2"
              color="muted"
              className={`${BASE_CLASS}_lead`}
            >
              {short_description}
            </Typography>
          )}
        </Link>

        {swatches.length > 0 && (
          <ul className={`${BASE_CLASS}_swatches`}>
            {shownSwatches.map((swatch) => (
              <li key={swatch.id}>
                <span
                  className={`${BASE_CLASS}_swatch`}
                  style={{ background: swatch.color_hex }}
                  title={swatch.label}
                />
              </li>
            ))}
            {hiddenSwatches > 0 && (
              <li className={`${BASE_CLASS}_swatch-more`}>+{hiddenSwatches}</li>
            )}
          </ul>
        )}

        <div className={`${BASE_CLASS}_price-row`}>
          {isRange ? (
            <Price
              className={`${BASE_CLASS}_price`}
              value={product.price_range.min}
              prefix="від"
            />
          ) : (
            <Price
              className={`${BASE_CLASS}_price`}
              value={product.effective_price}
              compareAt={product.sale_active ? product.price : null}
            />
          )}
          {lowStock !== null && (
            <Typography variant="caption" color="muted">
              Залишилось {lowStock}
            </Typography>
          )}
        </div>
      </div>

      <div className={`${BASE_CLASS}_footer`}>
        <Button
          size="sm"
          fullWidth
          disabled={!canBuy}
          onClick={handleAddToCart}
        >
          <ShoppingBag size={14} strokeWidth={2} />
          {canBuy ? "В кошик" : "Немає в наявності"}
        </Button>
      </div>
    </article>
  );
}

export default ProductCard;
