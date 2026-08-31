"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useAttributes } from "@/entities/attributes/api";
import {
  type AttributeFacets,
  countActiveFacets,
  facetsToQuery,
} from "@/entities/attributes/types";
import { useProducts } from "@/entities/products/api";
import type { ProductStatus, ProductsQuery } from "@/entities/products/types";
import { useDebouncedValue } from "@/lib/utils/useDebouncedValue";

const PAGE_SIZE = 24;

/**
 * Catalogue state. Filtering runs on the server — attribute facets need
 * EXISTS subqueries the client cannot fake, and a client-side pass would only
 * ever see the current page.
 */
export function useCatalogFilters() {
  // `?category=<id>` deep-links into a filtered catalogue — the admin panel
  // links here from a category row. Read once, at mount: from then on the
  // sidebar owns the choice, and rewriting the URL on every click is not what
  // the rest of the filters do.
  const categoryParam = useSearchParams().get("category");
  const [categoryId, setCategoryId] = useState<number | null>(
    Number(categoryParam) || null,
  );
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ProductStatus | null>(null);
  const [priceMin, setPriceMin] = useState<number | null>(null);
  const [priceMax, setPriceMax] = useState<number | null>(null);
  const [facets, setFacets] = useState<AttributeFacets>({});
  const [sort, setSort] =
    useState<NonNullable<ProductsQuery["sort"]>>("newest");
  const [page, setPage] = useState(1);

  // Only the chosen category's attributes are offered; with none picked the
  // sidebar shows every filterable attribute in the shop.
  const { data: attributes = [] } = useAttributes({
    categoryId,
    filterableOnly: true,
  });

  // The box updates on every keystroke; the query trails it.
  const debouncedSearch = useDebouncedValue(search.trim());

  const query: ProductsQuery = {
    page,
    limit: PAGE_SIZE,
    sort,
    include_descendants: true,
    ...(categoryId ? { category_id: categoryId } : {}),
    ...(debouncedSearch ? { search: debouncedSearch } : {}),
    ...(status ? { status } : {}),
    ...(priceMin !== null ? { min_price: priceMin } : {}),
    ...(priceMax !== null ? { max_price: priceMax } : {}),
    ...(facetsToQuery(facets) ? { attributes: facetsToQuery(facets) } : {}),
  };

  const { data, isLoading, isError } = useProducts(query);

  /** Every filter change resets paging — page 5 of a new filter is nonsense. */
  const withReset =
    <T>(setter: (value: T) => void) =>
    (value: T) => {
      setter(value);
      setPage(1);
    };

  const toggleFacet = (code: string, value: string) => {
    setPage(1);
    setFacets((current) => {
      const picked = current[code] ?? [];
      const next = picked.includes(value)
        ? picked.filter((entry) => entry !== value)
        : [...picked, value];

      return { ...current, [code]: next };
    });
  };

  const setRangeFacet = (code: string, range: string | null) => {
    setPage(1);
    setFacets((current) => ({ ...current, [code]: range ? [range] : [] }));
  };

  const activeCount =
    countActiveFacets(facets) +
    (categoryId !== null ? 1 : 0) +
    (status !== null ? 1 : 0) +
    (debouncedSearch ? 1 : 0) +
    (priceMin !== null || priceMax !== null ? 1 : 0);

  const reset = () => {
    setCategoryId(null);
    setSearch("");
    setStatus(null);
    setPriceMin(null);
    setPriceMax(null);
    setFacets({});
    setPage(1);
  };

  return {
    products: data?.items ?? [],
    meta: data?.meta,
    isLoading,
    isError,
    attributes,
    categoryId,
    search,
    status,
    priceMin,
    priceMax,
    facets,
    sort,
    page,
    activeCount,
    hasFilters: activeCount > 0,
    selectCategory: withReset(setCategoryId),
    setSearch: withReset(setSearch),
    setStatus: withReset(setStatus),
    setPriceMin: withReset(setPriceMin),
    setPriceMax: withReset(setPriceMax),
    setSort: withReset(setSort),
    setPage,
    toggleFacet,
    setRangeFacet,
    reset,
  };
}

export { PAGE_SIZE };
