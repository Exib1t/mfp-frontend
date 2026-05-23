# Catalog Page

**URL:** `/products`  
**File:** `src/app/products/page.tsx`

## Purpose

Browse and filter all products. Entry point to product detail.

## Layout

Two-column on desktop: filters sidebar (left) + product grid (right).  
Mobile: filters in bottom sheet or collapsible panel above grid.

## Sections

### Filters
- Category (вігвам, подушки, корзина, комплект...)
- Price range
- Color / fabric (tags)
- In stock toggle
- Active filters shown as removable chips

### Product Grid
- 3 columns desktop, 2 tablet, 1–2 mobile
- Each card: photo, name, price, "В кошик" or "Обрати" button
- Skeleton loading on initial load
- "Немає результатів" empty state

### Sort
- Dropdown: новинки, ціна ↑, ціна ↓, популярні

### Pagination or infinite scroll
- TBD — decide before implementation

## Data

- `GET /products` with query params: `category`, `minPrice`, `maxPrice`, `color`, `inStock`, `sort`, `page`

## URL state

Filters and sort reflected in URL query params for shareability:  
`/products?category=wigwam&color=cream&sort=price_asc`

## Notes

- SSR preferred for SEO (initial render with products)
- Filter state synced to URL
