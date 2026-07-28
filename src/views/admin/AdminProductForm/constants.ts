import type { AdminTab } from "@/components/admin/AdminTabs/AdminTabs";
import type { ProductFormTab } from "./types";

export const PRODUCT_FORM_TABS: AdminTab<ProductFormTab>[] = [
  { id: "general", label: "Основне" },
  { id: "pricing", label: "Ціни" },
  { id: "options", label: "Опції" },
  { id: "variants", label: "Варіанти" },
  { id: "attributes", label: "Характеристики" },
  { id: "media", label: "Медіа" },
  { id: "seo", label: "SEO" },
];

/** Tabs that need a saved product id before they can do anything. */
export const TABS_REQUIRING_SAVED_PRODUCT: ProductFormTab[] = [
  "options",
  "variants",
  "attributes",
  "media",
];

export const PRODUCT_STATUS_OPTIONS = [
  { value: "in_stock", label: "В наявності" },
  { value: "made_to_order", label: "Під замовлення" },
  { value: "out_of_stock", label: "Немає в наявності" },
] as const;
