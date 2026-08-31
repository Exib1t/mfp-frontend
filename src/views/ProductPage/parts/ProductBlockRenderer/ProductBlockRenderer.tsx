"use client";

import RichText from "@/components/controls/RichText/RichText";
import Typography from "@/components/controls/Typography/Typography";
import ProductGallery from "@/components/organisms/products/ProductGallery/ProductGallery";
import ProductReviews from "@/components/organisms/products/ProductReviews/ProductReviews";
import { getVariantImages } from "@/entities/products/helpers";
import type { ProductBlock } from "@/entities/products/layout";
import type { Product } from "@/entities/products/types";
import type { useProductPurchase } from "../../useProductPurchase";
import ProductSpecs from "../ProductSpecs/ProductSpecs";
import ProductSummary from "../ProductSummary/ProductSummary";

interface ProductBlockRendererProps {
  block: ProductBlock;
  product: Product;
  purchase: ReturnType<typeof useProductPurchase>;
  onAddToCart: () => void;
}

const BASE_CLASS = "product-page";

/** Maps one layout block onto the component that draws it. */
function ProductBlockRenderer({
  block,
  product,
  purchase,
  onAddToCart,
}: ProductBlockRendererProps) {
  switch (block.type) {
    case "gallery":
      return (
        <ProductGallery
          images={getVariantImages(product, purchase.selectedVariant).map(
            (image) => image.url,
          )}
          name={product.name}
          slug={product.slug}
        />
      );

    case "summary":
      return (
        <ProductSummary
          product={product}
          purchase={purchase}
          onAddToCart={onAddToCart}
        />
      );

    case "description":
      return product.description ? (
        <section className={`${BASE_CLASS}_block`}>
          <Typography variant="h4" as="h2">
            Опис
          </Typography>
          {/* Admin-authored markup, not plain text — see `RichText`. */}
          <RichText html={product.description} />
        </section>
      ) : null;

    case "specs":
      return <ProductSpecs product={product} />;

    case "reviews":
      return <ProductReviews productId={product.id} />;

    default:
      return null;
  }
}

export default ProductBlockRenderer;
