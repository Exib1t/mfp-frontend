import type { components } from "@/lib/api/v1";

export type Product = components["schemas"]["ProductDto"];
export type ProductVariant = Product["variants"][number];
export type ProductImage = Product["images"][number];
export type ProductStatus = Product["status"];

export interface ProductsQuery {
  page?: number;
  limit?: number;
  category_id?: number;
  status?: ProductStatus;
}
