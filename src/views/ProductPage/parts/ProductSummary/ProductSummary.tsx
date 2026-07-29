import Badge from "@/components/controls/Badge/Badge";
import Price from "@/components/controls/Price/Price";
import Typography from "@/components/controls/Typography/Typography";
import { PRODUCT_STATUS_LABELS } from "@/entities/products/constants";
import {
  getCompareAtPrice,
  getDiscountPercent,
  getEffectivePrice,
} from "@/entities/products/helpers";
import type { Product } from "@/entities/products/types";
import type { useProductPurchase } from "../../useProductPurchase";
import ProductActions from "../ProductActions/ProductActions";
import VariantPicker from "../VariantPicker/VariantPicker";

import "../../ProductPage.styles.scss";

interface ProductSummaryProps {
  product: Product;
  purchase: ReturnType<typeof useProductPurchase>;
  onAddToCart: () => void;
}

const BASE_CLASS = "product-page";

/** Right-hand column of the product page: identity, price and buy box. */
function ProductSummary({
  product,
  purchase,
  onAddToCart,
}: ProductSummaryProps) {
  const { selectedVariant } = purchase;

  const effectivePrice = getEffectivePrice(product, selectedVariant);
  const compareAt = getCompareAtPrice(
    effectivePrice,
    selectedVariant?.price ?? product.price,
    selectedVariant?.compare_at_price ?? product.compare_at_price,
  );
  const discount = getDiscountPercent(
    effectivePrice,
    selectedVariant?.price ?? product.price,
    selectedVariant?.compare_at_price ?? product.compare_at_price,
  );

  const hasBadges = discount !== null || product.status !== "in_stock";

  return (
    <div className={`${BASE_CLASS}_info`}>
      <div>
        <Typography variant="overline" color="muted">
          {product.category.name}
        </Typography>
        <Typography variant="h2" as="h1" className={`${BASE_CLASS}_name`}>
          {product.name}
        </Typography>
      </div>

      {hasBadges && (
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

      <Price
        className={`${BASE_CLASS}_price-row`}
        value={effectivePrice}
        compareAt={compareAt}
        size="lg"
      />

      {product.short_description && (
        <Typography variant="body1" className={`${BASE_CLASS}_lead`}>
          {product.short_description}
        </Typography>
      )}

      {product.description && (
        <Typography variant="body1" className={`${BASE_CLASS}_description`}>
          {product.description}
        </Typography>
      )}

      <VariantPicker
        variants={product.variants}
        selectedVariantId={purchase.selectedVariantId}
        onSelect={purchase.selectVariant}
      />

      <ProductActions
        canBuy={purchase.canBuy}
        quantity={purchase.quantity}
        variantStock={purchase.stock}
        configurator={product.configurator}
        onQuantityChange={purchase.setQuantity}
        onAddToCart={onAddToCart}
      />
    </div>
  );
}

export default ProductSummary;
