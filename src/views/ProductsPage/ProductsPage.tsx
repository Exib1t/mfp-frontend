"use client";

import { RotateCcw, SlidersHorizontal, X } from "lucide-react";
import type React from "react";
import { useState } from "react";
import Button from "@/components/controls/Button/Button";
import Select from "@/components/controls/Select/Select";
import Typography from "@/components/controls/Typography/Typography";
import ProductCard from "@/components/organisms/products/ProductCard/ProductCard";
import { useCategories } from "@/entities/categories/api";
import { useProducts } from "@/entities/products/api";
import { getEffectivePrice } from "@/entities/products/helpers";

import "./ProductsPage.styles.scss";

type SortKey = "default" | "price-asc" | "price-desc";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "default", label: "За замовчуванням" },
  { value: "price-asc", label: "Ціна: від дешевих" },
  { value: "price-desc", label: "Ціна: від дорогих" },
];

const BASE_CLASS = "products-page";
const SKELETON_KEYS = ["s1", "s2", "s3", "s4", "s5", "s6"];

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
  const range = boundMax - boundMin;

  const effMin = priceMin ?? boundMin;
  const effMax = priceMax ?? boundMax;

  const hasFilters =
    activeCategoryId !== null || priceMin !== null || priceMax !== null;

  const resetFilters = () => {
    setActiveCategoryId(null);
    setPriceMin(null);
    setPriceMax(null);
  };

  const minPct = range > 0 ? ((effMin - boundMin) / range) * 100 : 0;
  const maxPct = range > 0 ? ((effMax - boundMin) / range) * 100 : 100;

  const filtered = products.filter((p) => {
    const effectivePrice = getEffectivePrice(p);
    if (activeCategoryId !== null && p.new_category.id !== activeCategoryId)
      return false;
    if (effectivePrice < effMin || effectivePrice > effMax) return false;
    return true;
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
          {/* ─── Sidebar ─── */}
          <aside className={`${BASE_CLASS}_sidebar`} data-open={sidebarOpen}>
            <button
              type="button"
              className={`${BASE_CLASS}_sidebar-close`}
              onClick={() => setSidebarOpen(false)}
              aria-label="Закрити фільтри"
            >
              <X size={18} strokeWidth={2} />
            </button>
            <div className={`${BASE_CLASS}_sidebar-section`}>
              <Typography
                variant="overline"
                color="muted"
                className={`${BASE_CLASS}_sidebar-title`}
              >
                Категорія
              </Typography>
              <ul className={`${BASE_CLASS}_cat-list`}>
                <li>
                  <button
                    type="button"
                    className={`${BASE_CLASS}_cat-item`}
                    data-active={activeCategoryId === null}
                    onClick={() => setActiveCategoryId(null)}
                  >
                    <span>Усі</span>
                    <span className={`${BASE_CLASS}_cat-count`}>
                      {products.length}
                    </span>
                  </button>
                </li>
                {categories.map((cat) => {
                  const count = products.filter(
                    (p) => p.new_category.id === cat.id,
                  ).length;
                  return (
                    <li key={cat.id}>
                      <button
                        type="button"
                        className={`${BASE_CLASS}_cat-item`}
                        data-active={activeCategoryId === cat.id}
                        onClick={() => setActiveCategoryId(cat.id)}
                      >
                        <span>{cat.name}</span>
                        <span className={`${BASE_CLASS}_cat-count`}>
                          {count}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className={`${BASE_CLASS}_sidebar-section`}>
              <Typography
                variant="overline"
                color="muted"
                className={`${BASE_CLASS}_sidebar-title`}
              >
                Ціна, ₴
              </Typography>
              <div
                className={`${BASE_CLASS}_range-wrap`}
                style={
                  {
                    "--min-pct": `${minPct}%`,
                    "--max-pct": `${maxPct}%`,
                  } as React.CSSProperties
                }
              >
                <input
                  type="range"
                  className={`${BASE_CLASS}_range-input`}
                  value={effMin}
                  min={boundMin}
                  max={boundMax}
                  step={50}
                  disabled={range === 0}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    if (v < effMax) setPriceMin(v);
                  }}
                  aria-label="Мінімальна ціна"
                />
                <input
                  type="range"
                  className={`${BASE_CLASS}_range-input`}
                  value={effMax}
                  min={boundMin}
                  max={boundMax}
                  step={50}
                  disabled={range === 0}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    if (v > effMin) setPriceMax(v);
                  }}
                  aria-label="Максимальна ціна"
                />
              </div>
              <div className={`${BASE_CLASS}_price-vals`}>
                <span className={`${BASE_CLASS}_price-val`}>
                  {effMin.toLocaleString("uk-UA")} ₴
                </span>
                <span className={`${BASE_CLASS}_price-val`}>
                  {effMax.toLocaleString("uk-UA")} ₴
                </span>
              </div>
            </div>

            {hasFilters && (
              <Button variant="ghost" size="sm" onClick={resetFilters}>
                <RotateCcw size={14} strokeWidth={2} />
                Скинути фільтри
              </Button>
            )}
          </aside>

          {/* ─── Main ─── */}
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

            {isError ? (
              <div className={`${BASE_CLASS}_empty`}>
                <Typography variant="body1" color="muted">
                  Не вдалося завантажити каталог. Спробуйте оновити сторінку.
                </Typography>
              </div>
            ) : isLoading ? (
              <div className={`${BASE_CLASS}_grid`}>
                {SKELETON_KEYS.map((key) => (
                  <div key={key} className={`${BASE_CLASS}_skeleton`} />
                ))}
              </div>
            ) : sorted.length === 0 ? (
              <div className={`${BASE_CLASS}_empty`}>
                <Typography variant="body1" color="muted">
                  Немає товарів за вибраними фільтрами
                </Typography>
              </div>
            ) : (
              <div className={`${BASE_CLASS}_grid`}>
                {sorted.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
