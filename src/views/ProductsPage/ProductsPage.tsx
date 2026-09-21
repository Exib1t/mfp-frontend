"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import Button from "@/components/controls/Button/Button";
import IconButton from "@/components/controls/IconButton/IconButton";
import Input from "@/components/controls/Input/Input";
import Select from "@/components/controls/Select/Select";
import Typography from "@/components/controls/Typography/Typography";
import { useCategories } from "@/entities/categories/api";
import { useCatalogPriceMax } from "@/entities/products/api";
import {
  MAX_SEARCH_LENGTH,
  PRODUCT_SORT_LABELS,
} from "@/entities/products/constants";
import type { ProductSort } from "@/entities/products/types";
import FilterSidebar from "./parts/FilterSidebar/FilterSidebar";
import ProductGrid from "./parts/ProductGrid/ProductGrid";
import { useCatalogFilters } from "./useCatalogFilters";

import "./ProductsPage.styles.scss";

/** Every ordering the API sorts by, labelled once in the entity layer. */
const SORT_OPTIONS = (Object.keys(PRODUCT_SORT_LABELS) as ProductSort[]).map(
  (value) => ({ value, label: PRODUCT_SORT_LABELS[value] }),
);

const PRICE_BOUND_MIN = 0;

/**
 * Stands in only until the real ceiling arrives, and while the catalogue is
 * empty. It used to be the permanent upper bound, which quietly capped the
 * filter below the price of the dearest products: touch the handle once and
 * anything above it dropped out of the results with no way back short of
 * resetting the filters.
 */
const PRICE_BOUND_MAX_FALLBACK = 10000;

const BASE_CLASS = "products-page";

function pluralProducts(count: number): string {
  if (count === 1) return "товар";
  if (count < 5) return "товари";
  return "товарів";
}

function ProductsPage() {
  const state = useCatalogFilters();
  const { data: categories = [] } = useCategories();
  const { data: priceMax } = useCatalogPriceMax();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const total = state.meta?.total ?? 0;

  return (
    <div className={BASE_CLASS}>
      <div className={`${BASE_CLASS}_inner`}>
        <div className={`${BASE_CLASS}_header`}>
          <Typography variant="h1" as="h1">
            Каталог
          </Typography>
          <div className={`${BASE_CLASS}_search`}>
            <Search
              className={`${BASE_CLASS}_search-icon`}
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
            <Input
              className={`${BASE_CLASS}_search-input`}
              type="search"
              value={state.search}
              placeholder="Пошук товарів"
              aria-label="Пошук товарів"
              maxLength={MAX_SEARCH_LENGTH}
              onChange={(event) => state.setSearch(event.target.value)}
            />
            {state.search && (
              <IconButton
                variant="ghost"
                size="sm"
                className={`${BASE_CLASS}_search-clear`}
                aria-label="Очистити пошук"
                onClick={() => state.setSearch("")}
              >
                <X size={14} strokeWidth={2} />
              </IconButton>
            )}
          </div>
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
            boundMax={priceMax ?? PRICE_BOUND_MAX_FALLBACK}
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
                options={SORT_OPTIONS}
                onChange={state.setSort}
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
