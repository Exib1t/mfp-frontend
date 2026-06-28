"use client";

import { ChevronLeft, Minus, Plus, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Badge from "@/components/controls/Badge/Badge";
import Button from "@/components/controls/Button/Button";
import { useToast } from "@/components/controls/Toast/ToastProvider";
import Typography from "@/components/controls/Typography/Typography";
import ProductGallery from "@/components/organisms/products/ProductGallery/ProductGallery";
import ProductReviews from "@/components/organisms/products/ProductReviews/ProductReviews";
import { useCart } from "@/entities/cart/CartContext";
import { useProduct } from "@/entities/products/api";
import {
  getDiscountPercent,
  getEffectivePrice,
  getFirstAvailableVariant,
  getVariantLabel,
  isProductAvailableToBuy,
  PRODUCT_STATUS_LABELS,
} from "@/entities/products/helpers";
import type { Product } from "@/entities/products/types";
import { cn } from "@/lib/utils/cn";
import { formatPrice } from "@/lib/utils/formatPrice";

import "./ProductPage.styles.scss";

interface ProductPageProps {
  slug: string;
}

const BASE_CLASS = "product-page";

function ProductPage({ slug }: ProductPageProps) {
  const { data: product, isLoading, isError } = useProduct(slug);

  if (isLoading) {
    return (
      <div className={BASE_CLASS}>
        <div className={`${BASE_CLASS}_grid`}>
          <div className={`${BASE_CLASS}_image-skeleton`} />
          <div className={`${BASE_CLASS}_info-skeleton`} />
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className={BASE_CLASS}>
        <div className={`${BASE_CLASS}_not-found`}>
          <Typography variant="h3" as="h1">
            Товар не знайдено
          </Typography>
          <Button variant="primary" size="md" as={Link} href="/products">
            До каталогу
          </Button>
        </div>
      </div>
    );
  }

  return <ProductPageContent product={product} />;
}

function ProductPageContent({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { toast } = useToast();

  const images = product.image_urls.length
    ? product.image_urls
    : product.images.map((img) => img.url);
  const discount = getDiscountPercent(product);

  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(
    getFirstAvailableVariant(product)?.id ?? product.variants[0]?.id ?? null,
  );
  const [quantity, setQuantity] = useState(1);

  const selectedVariant =
    product.variants.find((v) => v.id === selectedVariantId) ?? null;
  const variantStock = selectedVariant?.stock ?? 0;
  const canBuy = isProductAvailableToBuy(product) && variantStock > 0;

  const handleSelectVariant = (variantId: number) => {
    setSelectedVariantId(variantId);
    setQuantity(1);
  };

  const handleAddToCart = () => {
    if (selectedVariant && canBuy) {
      addItem(product, selectedVariant, quantity);
      toast(`«${product.name}» додано в кошик`, "success");
    }
  };

  return (
    <div className={BASE_CLASS}>
      <nav className={`${BASE_CLASS}_breadcrumb`} aria-label="Хлібні крихти">
        <Link href="/" className={`${BASE_CLASS}_breadcrumb-link`}>
          <Typography variant="caption" color="muted">
            Головна
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
            Каталог
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
          {product.name}
        </Typography>
      </nav>

      <div className={`${BASE_CLASS}_grid`}>
        <ProductGallery
          images={images}
          name={product.name}
          slug={product.slug}
        />

        <div className={`${BASE_CLASS}_info`}>
          <div>
            <Typography variant="overline" color="muted">
              {product.new_category.name}
            </Typography>
            <Typography variant="h2" as="h1" className={`${BASE_CLASS}_name`}>
              {product.name}
            </Typography>
          </div>

          {(discount !== null || product.status !== "in_stock") && (
            <div className={`${BASE_CLASS}_badges`}>
              {discount !== null && (
                <Badge variant="error" size="sm">
                  −{discount}%
                </Badge>
              )}
              {product.status !== "in_stock" && (
                <Badge variant="warning" size="sm">
                  {PRODUCT_STATUS_LABELS[product.status]}
                </Badge>
              )}
            </div>
          )}

          <div className={`${BASE_CLASS}_price-row`}>
            <span
              className={`${BASE_CLASS}_price`}
              data-sale={product.sale_price !== null}
            >
              {formatPrice(getEffectivePrice(product))}
            </span>
            {product.sale_price !== null && (
              <span className={`${BASE_CLASS}_price-original`}>
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {product.description && (
            <Typography variant="body1" className={`${BASE_CLASS}_description`}>
              {product.description}
            </Typography>
          )}

          {product.variants.length > 0 && (
            <div className={`${BASE_CLASS}_variants`}>
              <Typography variant="overline" color="muted">
                Варіант
              </Typography>
              <div className={`${BASE_CLASS}_variant-list`}>
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    type="button"
                    className={cn(`${BASE_CLASS}_variant`, {
                      "-active": variant.id === selectedVariantId,
                      "-disabled": variant.stock === 0,
                    })}
                    disabled={variant.stock === 0}
                    onClick={() => handleSelectVariant(variant.id)}
                  >
                    {getVariantLabel(variant)}
                    {variant.stock === 0 && " — немає"}
                  </button>
                ))}
              </div>
            </div>
          )}

          {canBuy && (
            <div className={`${BASE_CLASS}_qty`}>
              <Typography variant="overline" color="muted">
                Кількість
              </Typography>
              <div className={`${BASE_CLASS}_qty-control`}>
                <button
                  type="button"
                  className={`${BASE_CLASS}_qty-btn`}
                  aria-label="Зменшити"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  <Minus size={16} strokeWidth={2} />
                </button>
                <span className={`${BASE_CLASS}_qty-value`}>{quantity}</span>
                <button
                  type="button"
                  className={`${BASE_CLASS}_qty-btn`}
                  aria-label="Збільшити"
                  disabled={quantity >= variantStock}
                  onClick={() =>
                    setQuantity((q) => Math.min(variantStock, q + 1))
                  }
                >
                  <Plus size={16} strokeWidth={2} />
                </button>
                <Typography variant="caption" color="muted">
                  В наявності: {variantStock}
                </Typography>
              </div>
            </div>
          )}

          <div className={`${BASE_CLASS}_actions`}>
            <Button
              variant="primary"
              size="lg"
              fullWidth
              disabled={!canBuy}
              onClick={handleAddToCart}
            >
              {canBuy && <ShoppingBag size={18} strokeWidth={2} />}
              {canBuy ? "Додати до кошика" : "Немає в наявності"}
            </Button>
            <Button
              variant="ghost"
              size="md"
              fullWidth
              as={Link}
              href="/products"
              transitionTypes={["nav-back"]}
            >
              <ChevronLeft size={16} strokeWidth={2} />
              Назад до каталогу
            </Button>
          </div>
        </div>
      </div>

      <ProductReviews productId={product.id} />
    </div>
  );
}

export default ProductPage;
