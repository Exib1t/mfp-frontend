import type { AdminTab } from "@/components/admin/AdminTabs/AdminTabs";
import type { ProductFormTab } from "./types";

/**
 * «Опції», «Варіанти» and «Сторінка» are gone. The first two merged into the
 * characteristics dictionary and are edited in the new admin panel; the third
 * was a per-product page layout that no longer exists server-side.
 */
export const PRODUCT_FORM_TABS: AdminTab<ProductFormTab>[] = [
  { id: "general", label: "Основне" },
  { id: "pricing", label: "Ціни" },
  { id: "attributes", label: "Характеристики" },
  { id: "media", label: "Медіа" },
  { id: "seo", label: "SEO" },
];

/** Tabs backed by react-hook-form — the only ones rendered inside <form>. */
export const FIELD_TABS: ProductFormTab[] = ["general", "pricing", "seo"];

/** Tabs that need a saved product id before they can do anything. */
export const TABS_REQUIRING_SAVED_PRODUCT: ProductFormTab[] = [
  "attributes",
  "media",
];

export const PRODUCT_STATUS_OPTIONS = [
  { value: "in_stock", label: "В наявності" },
  { value: "made_to_order", label: "Під замовлення" },
  { value: "out_of_stock", label: "Немає в наявності" },
] as const;
