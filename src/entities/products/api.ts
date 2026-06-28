import { $api } from "@/services/api/apiClient";
import type { ProductsQuery } from "./types";

/** List products (public, paginated + optional filters). Unwraps the envelope. */
export function useProducts(query: ProductsQuery = {}) {
  return $api.useQuery(
    "get",
    "/api/v1/products",
    { params: { query } },
    { select: (res) => res.data },
  );
}

/** Single product by slug (public). Unwraps the envelope. */
export function useProduct(slug: string | undefined) {
  return $api.useQuery(
    "get",
    "/api/v1/products/{slug}",
    { params: { path: { slug: slug ?? "" } } },
    { enabled: Boolean(slug), select: (res) => res.data },
  );
}
