# Catalog Page

**URL:** `/products`
**Files:** `src/views/ProductsPage/` (`ProductsPage.tsx`, `useCatalogFilters.ts`, `parts/`)

## Purpose

Browse and filter the catalogue. Entry point to product detail.

## Layout

Two columns on desktop — filter sidebar (220px) + grid. Below 900px the sidebar
becomes a drawer behind the «Фільтри» toggle, which carries a count of active
filters.

## Header

Title + search box. The box updates on every keystroke and the query trails it
by 300ms (`useDebouncedValue`) — one request per pause, not per letter. Search
runs on the server (`?search=`), across name and description.

## Sidebar

| Section | Source | Query |
|---|---|---|
| Категорія | `GET /api/v1/categories`, nested client-side by `parent_id` (`buildCategoryTree`) | `category_id` + `include_descendants=true` |
| Наявність | `PRODUCT_STATUS_LABELS` | `status` |
| Ціна | Two range inputs, fixed 0–10 000 bounds | `min_price` / `max_price` |
| Characteristics | `GET /api/v1/attributes?is_filterable=true&category_id=…` | `attributes[code]=a,b`, or `80..120` for numbers |

Picking a category re-scopes the characteristic list to that category's
attributes; with none picked, every filterable attribute in the shop is offered.
Clicking the selected category again clears it.

Filtering is server-side throughout: attribute facets need EXISTS subqueries the
client cannot fake, and a client-side pass would only ever see the current page.

## Toolbar

Result count + sort. Sort offers all six orderings the API supports, labelled
once in `PRODUCT_SORT_LABELS`.

## Grid

`ProductCard` at 24 per page, skeletons while loading, «Немає товарів за
вибраними фільтрами» when empty, prev/next pagination under the grid. Every
filter change resets to page 1.

## Data

`GET /api/v1/products` with `page`, `limit`, `sort`, `include_descendants`, plus
whatever is active. Response is `{ items, meta }` — see
[Product data model](../data/product.md#api-contract).

## Not built yet

- Filter state is React state, not URL search params, so a filtered catalogue
  is not shareable or restorable on reload.
- Active filters are not shown as removable chips above the grid.
