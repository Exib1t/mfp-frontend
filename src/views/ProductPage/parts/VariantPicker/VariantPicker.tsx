import Typography from "@/components/controls/Typography/Typography";
import { getVariantLabel } from "@/entities/products/helpers";
import type {
  ProductOption,
  ProductOptionValue,
  ProductVariant,
} from "@/entities/products/types";
import { cn } from "@/lib/utils/cn";
import { findVariantFor, isValueInStock, selectionOf } from "./helpers";

import "../../ProductPage.styles.scss";

interface VariantPickerProps {
  options: ProductOption[];
  variants: ProductVariant[];
  selectedVariant: ProductVariant | null;
  onSelect: (variantId: number) => void;
}

const BASE_CLASS = "product-page";

/**
 * One row per variation axis — the shape the admin actually builds variants
 * in. A product whose variants carry no axes (a plain combination list) falls
 * back to picking whole variants by label.
 */
function VariantPicker({
  options,
  variants,
  selectedVariant,
  onSelect,
}: VariantPickerProps) {
  if (variants.length === 0) return null;
  if (options.length === 0) {
    return (
      <VariantList
        variants={variants}
        selectedVariantId={selectedVariant?.id ?? null}
        onSelect={onSelect}
      />
    );
  }

  const selection = selectionOf(selectedVariant);

  const pick = (option: ProductOption, value: ProductOptionValue) => {
    const variant = findVariantFor(variants, selection, option.id, value.id);
    if (variant) onSelect(variant.id);
  };

  return (
    <div className={`${BASE_CLASS}_options`}>
      {options.map((option) => {
        const selectedValueId = selection[option.id];
        const selectedValue = option.values.find(
          (value) => value.id === selectedValueId,
        );

        return (
          <div key={option.id} className={`${BASE_CLASS}_option`}>
            <Typography variant="overline" color="muted">
              {option.name}
              {selectedValue && `: ${selectedValue.label}`}
            </Typography>
            <div className={`${BASE_CLASS}_option-values`}>
              {option.values.map((value) => {
                const isActive = value.id === selectedValueId;
                const inStock = isValueInStock(variants, option.id, value.id);

                return (
                  <button
                    key={value.id}
                    type="button"
                    title={value.label}
                    aria-label={value.label}
                    aria-pressed={isActive}
                    className={cn(
                      value.color_hex
                        ? `${BASE_CLASS}_swatch`
                        : `${BASE_CLASS}_variant`,
                      { "-active": isActive, "-depleted": !inStock },
                    )}
                    style={
                      value.color_hex
                        ? { background: value.color_hex }
                        : undefined
                    }
                    onClick={() => pick(option, value)}
                  >
                    {value.color_hex ? null : value.label}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface VariantListProps {
  variants: ProductVariant[];
  selectedVariantId: number | null;
  onSelect: (variantId: number) => void;
}

function VariantList({
  variants,
  selectedVariantId,
  onSelect,
}: VariantListProps) {
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
              "-depleted": variant.stock === 0,
            })}
            onClick={() => onSelect(variant.id)}
          >
            {getVariantLabel(variant)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default VariantPicker;
