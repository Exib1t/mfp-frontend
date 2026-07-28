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
