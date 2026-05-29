"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import Badge from "@/components/controls/Badge/Badge";
import Button from "@/components/controls/Button/Button";
import Typography from "@/components/controls/Typography/Typography";
import { CATEGORY_LABELS } from "@/entities/products/labels";
import type { Product, ProductBadge } from "@/entities/products/models";
import { cn } from "@/lib/utils/cn";
import { formatPrice } from "@/lib/utils/formatPrice";

import "./ProductCard.styles.scss";

interface BadgeConfig {
  label: string;
  variant: "primary" | "error" | "warning";
}

function getBadgeConfig(badge: ProductBadge, product: Product): BadgeConfig {
  if (badge === "sale" && product.salePrice) {
    const pct = Math.round((1 - product.salePrice / product.price) * 100);
    return { label: `−${pct}%`, variant: "error" };
  }
  const map: Record<ProductBadge, BadgeConfig> = {
    new: { label: "Новинка", variant: "primary" },
    sale: { label: "Знижка", variant: "error" },
    bestseller: { label: "Хіт", variant: "warning" },
    limited: { label: "Останні", variant: "warning" },
  };
  return map[badge];
}

interface ProductCardProps {
  product: Product;
  className?: string;
}

const BASE_CLASS = "product-card";

function ProductCard({ product, className }: ProductCardProps) {
  const { slug, name, price, salePrice, images, badges, inStock, category } = product;
  const mainImage = images[0];
  const href = `/products/${slug}`;

  return (
    <article className={cn(BASE_CLASS, className, { "-out-of-stock": !inStock })}>
      <Link href={href} className={`${BASE_CLASS}_media-link`} tabIndex={-1}>
        <div className={`${BASE_CLASS}_image-wrap`}>
          {mainImage ? (
            <Image
              className={`${BASE_CLASS}_image`}
              src={mainImage.src}
              alt={mainImage.alt}
              fill
              sizes="(max-width: 560px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className={`${BASE_CLASS}_placeholder`}>
              <span className={`${BASE_CLASS}_placeholder-glyph`} aria-hidden="true">✦</span>
            </div>
          )}

          {badges && badges.length > 0 && (
            <div className={`${BASE_CLASS}_badges`}>
              {badges.map((badge) => {
                const { label, variant } = getBadgeConfig(badge, product);
                return (
                  <Badge key={badge} variant={variant} size="sm">{label}</Badge>
                );
              })}
            </div>
          )}
        </div>
      </Link>

      <div className={`${BASE_CLASS}_body`}>
        <Link href={href} className={`${BASE_CLASS}_body-link`}>
          <Typography variant="overline" color="muted">
            {CATEGORY_LABELS[category]}
          </Typography>
          <Typography variant="subtitle1" as="h3" className={`${BASE_CLASS}_name`}>
            {name}
          </Typography>
          <div className={`${BASE_CLASS}_price`}>
            <span className={`${BASE_CLASS}_price-current`} data-sale={!!salePrice}>
              {formatPrice(salePrice ?? price)}
            </span>
            {salePrice && (
              <span className={`${BASE_CLASS}_price-original`}>{formatPrice(price)}</span>
            )}
          </div>
        </Link>
      </div>

      <div className={`${BASE_CLASS}_footer`}>
        <Button
          variant="primary"
          size="sm"
          fullWidth
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            // TODO: add to cart
          }}
        >
          <ShoppingBag size={14} strokeWidth={2} />
          В кошик
        </Button>
      </div>
    </article>
  );
}

export default ProductCard;
