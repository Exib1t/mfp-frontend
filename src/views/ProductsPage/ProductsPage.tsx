"use client";

import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import Select from "@/components/controls/Select/Select";
import Typography from "@/components/controls/Typography/Typography";
import { useCategories } from "@/entities/categories/api";
import { useProducts } from "@/entities/products/api";
import { getEffectivePrice } from "@/entities/products/helpers";
import FilterSidebar from "./parts/FilterSidebar/FilterSidebar";
import ProductGrid from "./parts/ProductGrid/ProductGrid";

import "./ProductsPage.styles.scss";

type SortKey = "default" | "price-asc" | "price-desc";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "default", label: "За замовчуванням" },
  { value: "price-asc", label: "Ціна: від дешевих" },
  { value: "price-desc", label: "Ціна: від дорогих" },
];

const BASE_CLASS = "products-page";

function ProductsPage() {
  const {
    data: products = [],
    isLoading,
    isError,
  } = useProducts({ limit: 100 });
  const { data: categories = [] } = useCategories();

  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const [priceMin, setPriceMin] = useState<number | null>(null);
  const [priceMax, setPriceMax] = useState<number | null>(null);
  const [sort, setSort] = useState<SortKey>("default");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const prices = products.map(getEffectivePrice);
  const boundMin = prices.length ? Math.floor(Math.min(...prices)) : 0;
  const boundMax = prices.length ? Math.ceil(Math.max(...prices)) : 0;

  const effMin = priceMin ?? boundMin;
  const effMax = priceMax ?? boundMax;

  const hasFilters =
    activeCategoryId !== null || priceMin !== null || priceMax !== null;

  const resetFilters = () => {
    setActiveCategoryId(null);
    setPriceMin(null);
    setPriceMax(null);
  };

  const filtered = products.filter((p) => {
    const effectivePrice = getEffectivePrice(p);
    if (activeCategoryId !== null && p.new_category.id !== activeCategoryId)
      return false;
    return !(effectivePrice < effMin || effectivePrice > effMax);
  });

  const sorted = [...filtered].sort((a, b) => {
    const pa = getEffectivePrice(a);
    const pb = getEffectivePrice(b);
    if (sort === "price-asc") return pa - pb;
    if (sort === "price-desc") return pb - pa;
    return 0;
  });

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
            {hasFilters && (
              <span
                className={`${BASE_CLASS}_filter-toggle-dot`}
                aria-hidden="true"
              />
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
            products={products}
            activeCategoryId={activeCategoryId}
            onSelectCategory={setActiveCategoryId}
            boundMin={boundMin}
            boundMax={boundMax}
            effMin={effMin}
            effMax={effMax}
            onPriceMinChange={setPriceMin}
            onPriceMaxChange={setPriceMax}
            hasFilters={hasFilters}
            onReset={resetFilters}
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          <div className={`${BASE_CLASS}_main`}>
            <div className={`${BASE_CLASS}_toolbar`}>
              <Typography variant="body2" color="muted">
                {sorted.length === 0
                  ? "Нічого не знайдено"
                  : `${sorted.length} ${sorted.length === 1 ? "товар" : sorted.length < 5 ? "товари" : "товарів"}`}
              </Typography>
              <Select
                value={sort}
                options={SORT_OPTIONS}
                onChange={setSort}
                aria-label="Сортування"
              />
            </div>

            <ProductGrid
              products={sorted}
              isLoading={isLoading}
              isError={isError}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
