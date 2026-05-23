import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/controls/Badge/Badge";
import Button from "@/components/controls/Button/Button";
import Typography from "@/components/controls/Typography/Typography";
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
  const { slug, name, price, salePrice, images, badges, inStock, category } =
    product;
  const mainImage = images[0];

  return (
    <article
      className={cn(BASE_CLASS, className, { "-out-of-stock": !inStock })}
    >
      <Link href={`/products/${slug}`} className={`${BASE_CLASS}_link`}>
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
              <span
                className={`${BASE_CLASS}_placeholder-glyph`}
                aria-hidden="true"
              >
                ✦
              </span>
            </div>
          )}

          {badges && badges.length > 0 && (
            <div className={`${BASE_CLASS}_badges`}>
              {badges.map((badge) => {
                const { label, variant } = getBadgeConfig(badge, product);
                return (
                  <Badge key={badge} variant={variant} size="sm">
                    {label}
                  </Badge>
                );
              })}
            </div>
          )}
        </div>

        <div className={`${BASE_CLASS}_body`}>
          <Typography variant="overline" color="muted">
            {category}
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
              data-sale={!!salePrice}
            >
              {formatPrice(salePrice ?? price)}
            </span>
            {salePrice && (
              <span className={`${BASE_CLASS}_price-original`}>
                {formatPrice(price)}
              </span>
            )}
          </div>
        </div>

        <div className={`${BASE_CLASS}_footer`}>
          <Button variant="secondary" size="sm" fullWidth as="span">
            Обрати
          </Button>
        </div>
      </Link>
    </article>
  );
}

export default ProductCard;
