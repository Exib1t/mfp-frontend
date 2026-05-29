import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ShoppingBag } from "lucide-react";
import Badge from "@/components/controls/Badge/Badge";
import Button from "@/components/controls/Button/Button";
import Typography from "@/components/controls/Typography/Typography";
import type { Product, ProductBadge } from "@/entities/products/models";
import { formatPrice } from "@/lib/utils/formatPrice";

import "./ProductPage.styles.scss";

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

interface ProductPageProps {
  product: Product;
}

const BASE_CLASS = "product-page";

function ProductPage({ product }: ProductPageProps) {
  const {
    name,
    description,
    price,
    salePrice,
    images,
    badges,
    inStock,
    category,
  } = product;
  const mainImage = images[0];

  return (
    <div className={BASE_CLASS}>
      <nav className={`${BASE_CLASS}_breadcrumb`} aria-label="Breadcrumb">
        <Link href="/" className={`${BASE_CLASS}_breadcrumb-link`}>
          <Typography variant="caption" color="muted">
            Home
          </Typography>
        </Link>
        <Typography
          variant="caption"
          color="muted"
          className={`${BASE_CLASS}_breadcrumb-sep`}
        >
          /
        </Typography>
        <Link href="/products" className={`${BASE_CLASS}_breadcrumb-link`}>
          <Typography variant="caption" color="muted">
            Products
          </Typography>
        </Link>
        <Typography
          variant="caption"
          color="muted"
          className={`${BASE_CLASS}_breadcrumb-sep`}
        >
          /
        </Typography>
        <Typography variant="caption" color="foreground">
          {name}
        </Typography>
      </nav>

      <div className={`${BASE_CLASS}_grid`}>
        <div className={`${BASE_CLASS}_image-wrap`}>
          {mainImage ? (
            <Image
              className={`${BASE_CLASS}_image`}
              src={mainImage.src}
              alt={mainImage.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className={`${BASE_CLASS}_placeholder`}>
              <span aria-hidden="true">✦</span>
            </div>
          )}
        </div>

        <div className={`${BASE_CLASS}_info`}>
          <div>
            <Typography variant="overline" color="muted">
              {category}
            </Typography>
            <Typography variant="h2" as="h1" className={`${BASE_CLASS}_name`}>
              {name}
            </Typography>
          </div>

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

          <div className={`${BASE_CLASS}_price-row`}>
            <span className={`${BASE_CLASS}_price`} data-sale={!!salePrice}>
              {formatPrice(salePrice ?? price)}
            </span>
            {salePrice && (
              <span className={`${BASE_CLASS}_price-original`}>
                {formatPrice(price)}
              </span>
            )}
          </div>

          <Typography variant="body1" className={`${BASE_CLASS}_description`}>
            {description}
          </Typography>

          {!inStock && (
            <Typography
              variant="caption"
              color="muted"
              className={`${BASE_CLASS}_stock`}
            >
              Немає в наявності
            </Typography>
          )}

          <div className={`${BASE_CLASS}_actions`}>
            <Button variant="primary" size="lg" fullWidth disabled={!inStock}>
              {inStock && <ShoppingBag size={18} strokeWidth={2} />}
              {inStock ? "Додати до кошика" : "Немає в наявності"}
            </Button>
            <Button
              variant="ghost"
              size="md"
              fullWidth
              as={Link}
              href="/products"
            >
              <ChevronLeft size={16} strokeWidth={2} />
              Назад до каталогу
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
