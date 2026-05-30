"use client";

import React, { useState } from "react";
import { RotateCcw, SlidersHorizontal, X } from "lucide-react";
import Button from "@/components/controls/Button/Button";
import Select from "@/components/controls/Select/Select";
import Typography from "@/components/controls/Typography/Typography";
import ProductCard from "@/components/organisms/products/ProductCard/ProductCard";
import { CATEGORY_LABELS } from "@/entities/products/labels";
import { MOCK_PRODUCTS } from "@/entities/products/mocks";
import type { ProductCategory } from "@/entities/products/models";

import "./ProductsPage.styles.scss";

type SortKey = "default" | "price-asc" | "price-desc";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "default", label: "За замовчуванням" },
  { value: "price-asc", label: "Ціна: від дешевих" },
  { value: "price-desc", label: "Ціна: від дорогих" },
];

const ALL_CATEGORIES = Array.from(
  new Set(MOCK_PRODUCTS.map((p) => p.category)),
) as ProductCategory[];

const PRICES = MOCK_PRODUCTS.map((p) => p.salePrice ?? p.price);
const PRICE_MIN_BOUND = Math.min(...PRICES);
const PRICE_MAX_BOUND = Math.max(...PRICES);

const BASE_CLASS = "products-page";

function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | null>(null);
  const [priceMin, setPriceMin] = useState(PRICE_MIN_BOUND);
  const [priceMax, setPriceMax] = useState(PRICE_MAX_BOUND);
  const [sort, setSort] = useState<SortKey>("default");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const hasFilters = activeCategory !== null || priceMin !== PRICE_MIN_BOUND || priceMax !== PRICE_MAX_BOUND;

  const resetFilters = () => {
    setActiveCategory(null);
    setPriceMin(PRICE_MIN_BOUND);
    setPriceMax(PRICE_MAX_BOUND);
  };

  const range = PRICE_MAX_BOUND - PRICE_MIN_BOUND;
  const minPct = ((priceMin - PRICE_MIN_BOUND) / range) * 100;
  const maxPct = ((priceMax - PRICE_MIN_BOUND) / range) * 100;

  const filtered = MOCK_PRODUCTS.filter((p) => {
    const effectivePrice = p.salePrice ?? p.price;
    if (activeCategory && p.category !== activeCategory) return false;
    if (effectivePrice < priceMin || effectivePrice > priceMax) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    const pa = a.salePrice ?? a.price;
    const pb = b.salePrice ?? b.price;
    if (sort === "price-asc") return pa - pb;
    if (sort === "price-desc") return pb - pa;
    return 0;
  });

  return (
    <div className={BASE_CLASS}>
      <div className={`${BASE_CLASS}_inner`}>
        <div className={`${BASE_CLASS}_header`}>
          <Typography variant="h1" as="h1">Каталог</Typography>
          <button
            type="button"
            className={`${BASE_CLASS}_filter-toggle`}
            onClick={() => setSidebarOpen(true)}
            aria-label="Відкрити фільтри"
          >
            <SlidersHorizontal size={18} strokeWidth={1.75} />
            Фільтри
            {hasFilters && <span className={`${BASE_CLASS}_filter-toggle-dot`} aria-hidden="true" />}
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
              <Typography variant="overline" color="muted" className={`${BASE_CLASS}_sidebar-title`}>
                Категорія
              </Typography>
              <ul className={`${BASE_CLASS}_cat-list`}>
                <li>
                  <button
                    type="button"
                    className={`${BASE_CLASS}_cat-item`}
                    data-active={activeCategory === null}
                    onClick={() => setActiveCategory(null)}
                  >
                    <span>Усі</span>
                    <span className={`${BASE_CLASS}_cat-count`}>{MOCK_PRODUCTS.length}</span>
                  </button>
                </li>
                {ALL_CATEGORIES.map((cat) => {
                  const count = MOCK_PRODUCTS.filter((p) => p.category === cat).length;
                  return (
                    <li key={cat}>
                      <button
                        type="button"
                        className={`${BASE_CLASS}_cat-item`}
                        data-active={activeCategory === cat}
                        onClick={() => setActiveCategory(cat)}
                      >
                        <span>{CATEGORY_LABELS[cat]}</span>
                        <span className={`${BASE_CLASS}_cat-count`}>{count}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className={`${BASE_CLASS}_sidebar-section`}>
              <Typography variant="overline" color="muted" className={`${BASE_CLASS}_sidebar-title`}>
                Ціна, ₴
              </Typography>
              <div
                className={`${BASE_CLASS}_range-wrap`}
                style={{ "--min-pct": `${minPct}%`, "--max-pct": `${maxPct}%` } as React.CSSProperties}
              >
                <input
                  type="range"
                  className={`${BASE_CLASS}_range-input`}
                  value={priceMin}
                  min={PRICE_MIN_BOUND}
                  max={PRICE_MAX_BOUND}
                  step={50}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    if (v < priceMax) setPriceMin(v);
                  }}
                  aria-label="Мінімальна ціна"
                />
                <input
                  type="range"
                  className={`${BASE_CLASS}_range-input`}
                  value={priceMax}
                  min={PRICE_MIN_BOUND}
                  max={PRICE_MAX_BOUND}
                  step={50}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    if (v > priceMin) setPriceMax(v);
                  }}
                  aria-label="Максимальна ціна"
                />
              </div>
              <div className={`${BASE_CLASS}_price-vals`}>
                <span className={`${BASE_CLASS}_price-val`}>{priceMin.toLocaleString("uk-UA")} ₴</span>
                <span className={`${BASE_CLASS}_price-val`}>{priceMax.toLocaleString("uk-UA")} ₴</span>
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

            {sorted.length === 0 ? (
              <div className={`${BASE_CLASS}_empty`}>
                <Typography variant="body1" color="muted">Немає товарів за вибраними фільтрами</Typography>
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
