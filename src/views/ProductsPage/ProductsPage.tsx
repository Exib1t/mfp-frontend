"use client";

import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import Button from "@/components/controls/Button/Button";
import Select from "@/components/controls/Select/Select";
import Typography from "@/components/controls/Typography/Typography";
import { useCategories } from "@/entities/categories/api";
import type { ProductsQuery } from "@/entities/products/types";
import FilterSidebar from "./parts/FilterSidebar/FilterSidebar";
import ProductGrid from "./parts/ProductGrid/ProductGrid";
import { useCatalogFilters } from "./useCatalogFilters";

import "./ProductsPage.styles.scss";

const SORT_OPTIONS = [
  { value: "newest", label: "Спочатку нові" },
  { value: "price_asc", label: "Ціна: від дешевих" },
  { value: "price_desc", label: "Ціна: від дорогих" },
  { value: "name_asc", label: "Назва: А–Я" },
] as const;

/** Bounds for the price slider. Server-side filtering means the page never
 *  sees the whole catalogue, so these stay fixed rather than derived. */
const PRICE_BOUND_MIN = 0;
const PRICE_BOUND_MAX = 10000;

const BASE_CLASS = "products-page";

function pluralProducts(count: number): string {
  if (count === 1) return "товар";
  if (count < 5) return "товари";
  return "товарів";
}

function ProductsPage() {
  const state = useCatalogFilters();
  const { data: categories = [] } = useCategories();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const total = state.meta?.total ?? 0;

  return (
    <div className={BASE_CLASS}>
      <div className={`${BASE_CLASS}_inner`}>
        <div className={`${BASE_CLASS}_header`}>
          <Typography variant="h1" as="h1">
            Каталог
          </Typography>
          <button
            type="button"
            className={`${BASE_CLASS}_filter-toggle`}
            onClick={() => setSidebarOpen(true)}
            aria-label="Відкрити фільтри"
          >
            <SlidersHorizontal size={18} strokeWidth={1.75} />
            Фільтри
            {state.hasFilters && (
              <span className={`${BASE_CLASS}_filter-count`}>
                {state.activeCount}
              </span>
            )}
          </button>
        </div>

        {sidebarOpen && (
          <div
            className={`${BASE_CLASS}_backdrop`}
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        <div className={`${BASE_CLASS}_layout`}>
          <FilterSidebar
            categories={categories}
            state={state}
            boundMin={PRICE_BOUND_MIN}
            boundMax={PRICE_BOUND_MAX}
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          <div className={`${BASE_CLASS}_main`}>
            <div className={`${BASE_CLASS}_toolbar`}>
              <Typography variant="body2" color="muted">
                {total === 0
                  ? "Нічого не знайдено"
                  : `${total} ${pluralProducts(total)}`}
              </Typography>
              <Select
                value={state.sort}
                options={[...SORT_OPTIONS]}
                onChange={(value) =>
                  state.setSort(value as NonNullable<ProductsQuery["sort"]>)
                }
                aria-label="Сортування"
              />
            </div>

            <ProductGrid
              products={state.products}
              isLoading={state.isLoading}
              isError={state.isError}
            />

            {state.meta && state.meta.pages > 1 && (
              <div className={`${BASE_CLASS}_pagination`}>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={state.page <= 1}
                  onClick={() => state.setPage(state.page - 1)}
                >
                  Назад
                </Button>
                <Typography variant="caption" color="muted">
                  {state.meta.page} / {state.meta.pages}
                </Typography>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={state.page >= state.meta.pages}
                  onClick={() => state.setPage(state.page + 1)}
                >
                  Далі
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
