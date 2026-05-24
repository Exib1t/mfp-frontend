"use client";

import { useState } from "react";
import Button from "@/components/controls/Button/Button";
import Typography from "@/components/controls/Typography/Typography";
import ProductCard from "@/components/organisms/products/ProductCard/ProductCard";
import { MOCK_PRODUCTS } from "@/entities/products/mocks";
import type { ProductCategory } from "@/entities/products/models";

import "./ProductsPage.styles.scss";

const CATEGORY_LABELS: Record<ProductCategory, string> = {
  wigwam: "Вігвами",
  pillows: "Подушки",
  basket: "Кошики",
  rug: "Килими",
  set: "Комплекти",
  accessory: "Аксесуари",
};

const AVAILABLE_CATEGORIES = Array.from(
  new Set(MOCK_PRODUCTS.map((p) => p.category))
) as ProductCategory[];

const BASE_CLASS = "products-page";

function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | null>(null);

  const filtered =
    activeCategory === null
      ? MOCK_PRODUCTS
      : MOCK_PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <div className={BASE_CLASS}>
      <div className={`${BASE_CLASS}_inner`}>
        <div className={`${BASE_CLASS}_header`}>
          <Typography variant="h1" as="h1">
            Каталог
          </Typography>
        </div>

        <div className={`${BASE_CLASS}_filters`}>
          <Button
            variant="outline"
            size="sm"
            isActive={activeCategory === null}
            onClick={() => setActiveCategory(null)}
          >
            Усі
          </Button>
          {AVAILABLE_CATEGORIES.map((cat) => (
            <Button
              key={cat}
              variant="outline"
              size="sm"
              isActive={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            >
              {CATEGORY_LABELS[cat]}
            </Button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className={`${BASE_CLASS}_empty`}>
            <Typography variant="body1" color="muted">
              Немає товарів у цій категорії
            </Typography>
          </div>
        ) : (
          <div className={`${BASE_CLASS}_grid`}>
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductsPage;
