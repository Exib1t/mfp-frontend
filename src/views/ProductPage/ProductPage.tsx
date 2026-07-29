"use client";

import Link from "next/link";
import Button from "@/components/controls/Button/Button";
import EmptyState from "@/components/controls/EmptyState/EmptyState";
import Skeleton from "@/components/controls/Skeleton/Skeleton";
import { useToast } from "@/components/controls/Toast/ToastProvider";
import { useCart } from "@/entities/cart/CartContext";
import { useProduct } from "@/entities/products/api";
import {
  blocksInColumn,
  type ProductBlock,
  resolveLayout,
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

  // The page is assembled from the product's layout; null falls back to the
  // default arrangement, so pages that were never customised look unchanged.
  const blocks = resolveLayout(product);
  const renderBlock = (block: ProductBlock) => (
    <ProductBlockRenderer
      key={block.id}
      block={block}
      product={product}
      purchase={purchase}
      onAddToCart={handleAddToCart}
    />
  );

  return (
    <div className={BASE_CLASS}>
      <Breadcrumb productName={product.name} />

      <div className={`${BASE_CLASS}_grid`}>
        <div className={`${BASE_CLASS}_column`}>
          {blocksInColumn(blocks, "left").map(renderBlock)}
        </div>
        <div className={`${BASE_CLASS}_column`}>
          {blocksInColumn(blocks, "right").map(renderBlock)}
        </div>
      </div>

      {blocksInColumn(blocks, "full").map(renderBlock)}
    </div>
  );
}

export default ProductPage;
