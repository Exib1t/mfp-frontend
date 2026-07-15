"use client";

import Link from "next/link";
import { useState } from "react";
import Badge from "@/components/controls/Badge/Badge";
import Button from "@/components/controls/Button/Button";
import EmptyState from "@/components/controls/EmptyState/EmptyState";
import Skeleton from "@/components/controls/Skeleton/Skeleton";
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
  isProductAvailableToBuy,
  PRODUCT_STATUS_LABELS,
} from "@/entities/products/helpers";
import type { Product } from "@/entities/products/types";
import { formatPrice } from "@/lib/utils/formatPrice";
import Breadcrumb from "./parts/Breadcrumb/Breadcrumb";
import ProductActions from "./parts/ProductActions/ProductActions";
import VariantPicker from "./parts/VariantPicker/VariantPicker";

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
          <Skeleton className={`${BASE_CLASS}_image-skeleton`} />
          <Skeleton className={`${BASE_CLASS}_info-skeleton`} />
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className={BASE_CLASS}>
        <EmptyState
          title="Товар не знайдено"
          titleAs="h1"
          action={
            <Button as={Link} href="/products">
              До каталогу
            </Button>
          }
        />
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
      <Breadcrumb productName={product.name} />

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

          <VariantPicker
            variants={product.variants}
            selectedVariantId={selectedVariantId}
            onSelect={handleSelectVariant}
          />

          <ProductActions
            canBuy={canBuy}
            quantity={quantity}
            variantStock={variantStock}
            onQuantityChange={setQuantity}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>

      <ProductReviews productId={product.id} />
    </div>
  );
}

export default ProductPage;
