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
  const listedPrice = selectedVariant?.price ?? product.price;
  const compareAt = getCompareAtPrice(effectivePrice, listedPrice);
  const discount = getDiscountPercent(effectivePrice, listedPrice);

  const hasBadges =
    discount !== null || product.is_featured || product.status !== "in_stock";

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
          {product.is_featured && (
            <Badge variant="primary" size="sm">
              Хіт
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

      <VariantPicker
        options={product.options}
        variants={product.variants}
        selectedVariant={selectedVariant}
        onSelect={purchase.selectVariant}
      />

      <ProductActions
        canBuy={purchase.canBuy}
        status={product.status}
        quantity={purchase.quantity}
        maxQuantity={purchase.maxQuantity}
        lowStock={purchase.lowStock}
        onQuantityChange={purchase.setQuantity}
        onAddToCart={onAddToCart}
      />
    </div>
  );
}

export default ProductSummary;
