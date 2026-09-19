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

/**
 * The catalogue's highest price, for the filter slider's upper bound.
 *
 * The list endpoint filters server-side, so no page ever holds the whole
 * catalogue to measure — and the response carries no bounds of its own. One
 * row sorted by `price_desc` is the cheapest way to ask the question the API
 * can already answer.
 *
 * Deliberately unfiltered: bounds taken from the current result set would
 * collapse the moment a buyer dragged the handle, and could never be widened
 * again.
 */
export function useCatalogPriceMax() {
  return $api.useQuery(
    "get",
    "/api/v1/products",
    { params: { query: { sort: "price_desc", limit: 1 } } },
    {
      select: (res) => {
        const dearest = res.data.items[0];
        if (!dearest) return null;

        /* `price_range.max`, not `effective_price`: a product priced per
           variant is only fully covered by the top of its range. */
        return roundUpToNiceStep(
          Math.max(dearest.price_range.max, dearest.effective_price),
        );
      },
    },
  );
}

/**
 * Rounds up to a step one order of magnitude below the value, so the slider
 * ends on a number worth printing — 12 345 becomes 13 000, 4 000 stays 4 000.
 */
function roundUpToNiceStep(value: number): number {
  if (value <= 0) return 0;

  const step = 10 ** Math.max(1, Math.floor(Math.log10(value)) - 1);
  return Math.ceil(value / step) * step;
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
