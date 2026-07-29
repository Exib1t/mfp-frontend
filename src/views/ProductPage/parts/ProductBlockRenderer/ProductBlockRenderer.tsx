"use client";

import Typography from "@/components/controls/Typography/Typography";
import ProductGallery from "@/components/organisms/products/ProductGallery/ProductGallery";
import ProductReviews from "@/components/organisms/products/ProductReviews/ProductReviews";
import { getVariantImages } from "@/entities/products/helpers";
import { blockSetting, type ProductBlock } from "@/entities/products/layout";
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
            {blockSetting(block, "title") ?? "Опис"}
          </Typography>
          <Typography variant="body1">{product.description}</Typography>
        </section>
      ) : null;

    case "specs":
      return <ProductSpecs product={product} />;

    case "reviews":
      return <ProductReviews productId={product.id} />;

    case "richtext": {
      const body = blockSetting(block, "body");
      if (!body) return null;
      return (
        <section className={`${BASE_CLASS}_block`}>
          {blockSetting(block, "title") && (
            <Typography variant="h4" as="h2">
              {blockSetting(block, "title")}
            </Typography>
          )}
          <Typography variant="body1">{body}</Typography>
        </section>
      );
    }

    default:
      return null;
  }
}

export default ProductBlockRenderer;
