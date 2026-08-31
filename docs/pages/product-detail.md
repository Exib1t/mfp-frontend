# Product Detail Page

**URL:** `/products/[slug]`
**Files:** `src/views/ProductPage/` (`ProductPage.tsx`, `useProductPurchase.ts`, `parts/`)

## Purpose

Present one product, pick a variant, add it to the cart.

## Layout

One 12-column grid, arranged by `entities/products/layout.ts`. The arrangement
is fixed for every product — it used to be per-product and editable, and is not
any more.

| Block | Span | Component |
|---|---|---|
| `gallery` | 6 | `ProductGallery`, images of the selected variant first |
| `summary` | 6 | `ProductSummary` — identity, price, picker, buy box |
| `description` | 12 | «Опис» — `product.description` through [`RichText`](../components/rich-text.md) |
| `specs` | 12 | `ProductSpecs` — characteristics grouped by `group_name` |
| `reviews` | 12 | `ProductReviews` — approved reviews + submit form |

`description` is admin-authored HTML, so it gets a full-width section of its own
rather than a column: dropped into the 6-column summary it would push the buy
box far below the fold. The summary keeps `short_description` as the lead.

## Summary

- Category overline, name, badges (`−N%`, `Хіт`, status when not `in_stock`)
- Price from the **selected variant**, with the listed price struck through
  while a sale is running
- `short_description` as the lead; the long description lives in its own block
- `VariantPicker` — one row per variation axis (`product.options`), colour
  values as swatches, everything else as chips. Picking a value moves to the
  variant that keeps the rest of the selection (`findVariantFor`). A product
  whose variants carry no axes falls back to a flat list of variant labels.
- Buy box: quantity stepper capped by `getMaxQuantity`, the note under it says
  «Виготовляємо на замовлення» for `made_to_order` or «Залишилось N» when the
  counter is low. The CTA is enabled whenever `status !== "out_of_stock"` —
  see [Product data model](../data/product.md#availability).

## Data

- `GET /api/v1/products/{slug}` — the whole product, variants and attributes
  included; no second request for options or specs.
- `GET /api/v1/reviews/product/{id}` — approved reviews only.
- `POST /api/v1/reviews` — creates a `pending` review, invisible until moderated
  in the admin.

## Notes

- Breadcrumb: Головна → Каталог → [name]
- The card→page image uses a shared view transition (`product-image-{slug}`)
- Related products: not built — the API has no endpoint for them yet
