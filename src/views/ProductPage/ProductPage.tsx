"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import Button from "@/components/controls/Button/Button";
import EmptyState from "@/components/controls/EmptyState/EmptyState";
import Skeleton from "@/components/controls/Skeleton/Skeleton";
import { useToast } from "@/components/controls/Toast/ToastProvider";
import { useCart } from "@/entities/cart/CartContext";
import { useProduct } from "@/entities/products/api";
import {
  DEFAULT_PRODUCT_LAYOUT,
  visibleBlocks,
} from "@/entities/products/layout";
import type { Product } from "@/entities/products/types";
import Breadcrumb from "./parts/Breadcrumb/Breadcrumb";
import ProductBlockRenderer from "./parts/ProductBlockRenderer/ProductBlockRenderer";
import { useProductPurchase } from "./useProductPurchase";

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
  const purchase = useProductPurchase(product);

  const handleAddToCart = () => {
    if (!purchase.canBuy) return;
    addItem(product, purchase.selectedVariant, purchase.quantity);
    toast(`«${product.name}» додано в кошик`, "success");
  };

  const blocks = visibleBlocks(DEFAULT_PRODUCT_LAYOUT);

  return (
    <div className={BASE_CLASS}>
      <Breadcrumb productName={product.name} />

      <div className={`${BASE_CLASS}_grid`}>
        {blocks.map((block) => (
          <div
            key={block.id}
            className={`${BASE_CLASS}_cell`}
            style={{ "--block-span": block.span } as CSSProperties}
          >
            <ProductBlockRenderer
              block={block}
              product={product}
              purchase={purchase}
              onAddToCart={handleAddToCart}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductPage;
