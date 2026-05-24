# ProductsPage

**File:** `src/pages/ProductsPage/ProductsPage.tsx`
**Route:** `src/app/products/page.tsx`

## Purpose

Catalog page. Lists all products with client-side category filter.

## Visual structure

```
┌─────────────────────────────────────────────────┐
│  Каталог                 (h1)                    │
│  [Усі] [Вігвами] [Подушки] [Кошики] ...        │  ← filter tabs
├─────────────────────────────────────────────────┤
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐           │
│  │ card │ │ card │ │ card │ │ card │           │
│  └──────┘ └──────┘ └──────┘ └──────┘           │
└─────────────────────────────────────────────────┘
```

## Filter

- Client-side `useState<ProductCategory | null>` — null = "Усі"
- One tab per category that has ≥1 product in mocks
- Active tab: `-active` modifier

## Category labels (uk)

| value | label |
|---|---|
| wigwam | Вігвами |
| pillows | Подушки |
| basket | Кошики |
| rug | Килими |
| set | Комплекти |
| accessory | Аксесуари |

## DOM structure

```html
<div class="products-page">
  <div class="products-page_inner">
    <h1 class="typography" data-variant="h1">Каталог</h1>
    <div class="products-page_filters">
      <button class="products-page_filter-btn -active">Усі</button>
      <button class="products-page_filter-btn">Вігвами</button>
    </div>
    <div class="products-page_grid">
      <!-- ProductCard × N -->
    </div>
  </div>
</div>
```
