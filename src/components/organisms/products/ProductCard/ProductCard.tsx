"use client";

import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import Badge from "@/components/controls/Badge/Badge";
import Button from "@/components/controls/Button/Button";
import { useToast } from "@/components/controls/Toast/ToastProvider";
import Typography from "@/components/controls/Typography/Typography";
import { useCart } from "@/entities/cart/CartContext";
import {
  getDiscountPercent,
  getEffectivePrice,
  getFirstAvailableVariant,
  getMainImageUrl,
  isProductAvailableToBuy,
} from "@/entities/products/helpers";
import type { Product } from "@/entities/products/types";
import { cn } from "@/lib/utils/cn";
import { formatPrice } from "@/lib/utils/formatPrice";

import "./ProductCard.styles.scss";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const BASE_CLASS = "product-card";

function ProductCard({ product, className }: ProductCardProps) {
  const { addItem } = useCart();
  const { toast } = useToast();
  const { slug, name, price, sale_price, new_category } = product;

  const mainImage = getMainImageUrl(product);
  const discount = getDiscountPercent(product);
  const inStock = isProductAvailableToBuy(product);
  const firstVariant = getFirstAvailableVariant(product);
  const canBuy = inStock && firstVariant !== null;
  const href = `/products/${slug}`;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (firstVariant) {
      addItem(product, firstVariant);
      toast(`«${name}» додано в кошик`, "success");
    }
  };

  return (
    <article
      className={cn(BASE_CLASS, className, { "-out-of-stock": !inStock })}
    >
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

            {(discount !== null || product.status === "made_to_order") && (
              <div className={`${BASE_CLASS}_badges`}>
                {discount !== null && (
                  <Badge variant="error" size="sm">
                    −{discount}%
                  </Badge>
                )}
                {product.status === "made_to_order" && (
                  <Badge variant="warning" size="sm">
                    Під замовлення
                  </Badge>
                )}
              </div>
            )}
          </div>
        </ViewTransition>
      </Link>

      <div className={`${BASE_CLASS}_body`}>
        <Link href={href} className={`${BASE_CLASS}_body-link`}>
          <Typography variant="overline" color="muted">
            {new_category.name}
          </Typography>
          <Typography
            variant="subtitle1"
            as="h3"
            className={`${BASE_CLASS}_name`}
          >
            {name}
          </Typography>
          <div className={`${BASE_CLASS}_price`}>
            <span
              className={`${BASE_CLASS}_price-current`}
              data-sale={sale_price !== null}
            >
              {formatPrice(getEffectivePrice(product))}
            </span>
            {sale_price !== null && (
              <span className={`${BASE_CLASS}_price-original`}>
                {formatPrice(price)}
              </span>
            )}
          </div>
        </Link>
      </div>

      <div className={`${BASE_CLASS}_footer`}>
        <Button
          variant="primary"
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
