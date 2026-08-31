import type { ProductSort, ProductStatus } from "./types";

export const PRODUCT_STATUS_LABELS: Record<ProductStatus, string> = {
  in_stock: "В наявності",
  made_to_order: "Під замовлення",
  out_of_stock: "Немає в наявності",
};

export const PRODUCT_SORT_LABELS: Record<ProductSort, string> = {
  newest: "Спочатку нові",
  oldest: "Спочатку старі",
  price_asc: "Ціна: за зростанням",
  price_desc: "Ціна: за спаданням",
  name_asc: "Назва: А–Я",
  name_desc: "Назва: Я–А",
};

/** Shown when a variant carries no option values to build a label from. */
export const DEFAULT_VARIANT_LABEL = "Стандарт";

/**
 * Stock is advisory, not a gate — the status column decides whether a product
 * can be bought (see `isProductAvailableToBuy`). A product kept `in_stock`
 * with a zero counter is still sold; the counter only caps the quantity when
 * the shop actually tracks it.
 */
export const MAX_ORDER_QUANTITY = 99;

/** At or below this the card and the buy box say how few are left. */
export const LOW_STOCK_THRESHOLD = 5;

/** Colour swatches shown on a card before the rest collapse into "+N". */
export const MAX_CARD_SWATCHES = 5;
