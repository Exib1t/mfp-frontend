import type {
  AdminProductOption,
  AdminProductVariant,
} from "@/entities/admin/products/types";

/** Order-independent key for a set of option-value ids. */
export function signatureOf(optionValueIds: number[]): string {
  return [...optionValueIds].sort((a, b) => a - b).join("-");
}

export function variantSignature(variant: AdminProductVariant): string {
  return signatureOf(variant.option_values.map((value) => value.value_id));
}

/**
 * Cartesian product across every axis — one value per axis, in axis order.
 * Axes with no values are skipped so a half-filled option list still generates.
 */
export function buildCombinations(options: AdminProductOption[]): number[][] {
  const usable = options.filter((option) => option.values.length > 0);
  if (usable.length === 0) return [];

  return usable.reduce<number[][]>(
    (combinations, option) =>
      combinations.flatMap((combination) =>
        option.values.map((value) => [...combination, value.id]),
      ),
    [[]],
  );
}

/** "Білий / M" for a combination, using the axis order of `options`. */
export function labelForCombination(
  options: AdminProductOption[],
  optionValueIds: number[],
): string {
  const chosen = new Set(optionValueIds);

  return options
    .flatMap((option) =>
      option.values
        .filter((value) => chosen.has(value.id))
        .map((value) => value.label),
    )
    .join(" / ");
}

/** Combinations that have no live variant yet. */
export function missingCombinations(
  options: AdminProductOption[],
  variants: AdminProductVariant[],
): number[][] {
  const existing = new Set(variants.map(variantSignature));
  return buildCombinations(options).filter(
    (combination) => !existing.has(signatureOf(combination)),
  );
}
