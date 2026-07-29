"use client";

import { blocksInColumn, type ProductBlock } from "@/entities/products/layout";
import type { Product } from "@/entities/products/types";
import ProductBlockRenderer from "@/views/ProductPage/parts/ProductBlockRenderer/ProductBlockRenderer";
import { useProductPurchase } from "@/views/ProductPage/useProductPurchase";

import "@/views/ProductPage/ProductPage.styles.scss";
import "./LayoutPreview.styles.scss";

interface LayoutPreviewProps {
  product: Product;
  blocks: ProductBlock[];
}

const BASE_CLASS = "layout-preview";
const PAGE_CLASS = "product-page";

/**
 * Draws the draft layout with the real storefront components — the point of
 * moving the admin into the shop app. Inert: no clicks, no cart writes.
 */
function LayoutPreview({ product, blocks }: LayoutPreviewProps) {
  const purchase = useProductPurchase(product);

  const render = (block: ProductBlock) => (
    <ProductBlockRenderer
      key={block.id}
      block={block}
      product={product}
      purchase={purchase}
      onAddToCart={() => {}}
    />
  );

  return (
    <div className={BASE_CLASS}>
      <div className={`${BASE_CLASS}_frame`} aria-hidden="true">
        <div className={PAGE_CLASS}>
          <div className={`${PAGE_CLASS}_grid`}>
            <div className={`${PAGE_CLASS}_column`}>
              {blocksInColumn(blocks, "left").map(render)}
            </div>
            <div className={`${PAGE_CLASS}_column`}>
              {blocksInColumn(blocks, "right").map(render)}
            </div>
          </div>
          {blocksInColumn(blocks, "full").map(render)}
        </div>
      </div>
    </div>
  );
}

export default LayoutPreview;
