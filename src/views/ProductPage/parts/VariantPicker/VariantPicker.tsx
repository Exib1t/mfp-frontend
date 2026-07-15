import Typography from "@/components/controls/Typography/Typography";
import { getVariantLabel } from "@/entities/products/helpers";
import type { ProductVariant } from "@/entities/products/types";
import { cn } from "@/lib/utils/cn";

import "../../ProductPage.styles.scss";

interface VariantPickerProps {
  variants: ProductVariant[];
  selectedVariantId: number | null;
  onSelect: (variantId: number) => void;
}

const BASE_CLASS = "product-page";

function VariantPicker({
  variants,
  selectedVariantId,
  onSelect,
}: VariantPickerProps) {
  if (variants.length === 0) return null;

  return (
    <div className={`${BASE_CLASS}_variants`}>
      <Typography variant="overline" color="muted">
        Варіант
      </Typography>
      <div className={`${BASE_CLASS}_variant-list`}>
        {variants.map((variant) => (
          <button
            key={variant.id}
            type="button"
            className={cn(`${BASE_CLASS}_variant`, {
              "-active": variant.id === selectedVariantId,
              "-disabled": variant.stock === 0,
            })}
            disabled={variant.stock === 0}
            onClick={() => onSelect(variant.id)}
          >
            {getVariantLabel(variant)}
            {variant.stock === 0 && " — немає"}
          </button>
        ))}
      </div>
    </div>
  );
}

export default VariantPicker;
