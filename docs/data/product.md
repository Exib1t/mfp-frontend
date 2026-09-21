# Product — Data Model

Types are **generated from the backend OpenAPI schema** — never hand-write them.

- Generated types: `src/lib/api/v1.d.ts` (`npm run generate` against a local
  backend — production does not serve the OpenAPI document)
- Domain aliases: `src/entities/products/types.ts`
- Helpers: `src/entities/products/helpers.ts`
- Labels and limits: `src/entities/products/constants.ts`
- Query hooks: `src/entities/products/api.ts`

## Shape (from `PublicProductDto`)

```ts
type ProductStatus = "in_stock" | "made_to_order" | "out_of_stock";

interface Product {
  id: number;
  name: string;
  slug: string;                  // URL: /products/[slug]
  sku: string | null;
  short_description: string | null;
  description: string | null;
  status: ProductStatus;
  is_featured: boolean;          // "Хіт" badge, and the home page row
  price: number;                 // listed price
  sale_price: number | null;
  sale_active: boolean;          // a sale that is actually running now
  effective_price: number;       // what the buyer pays
  price_range: { min: number; max: number };  // across active variants
  stock: number;                 // advisory — see below
  category: { id; name; slug; deleted_at: string | null };
  options: ProductOption[];      // variation axes, derived from `is_variant` attributes
  variants: ProductVariant[];    // one per option combination; disabled ones are never served
  attributes: ProductAttribute[];// characteristics, typed values, grouped
  images: ProductImage[];        // `variant_id` set on variant-specific shots
  meta_title / meta_description: string | null;
  created_at / updated_at: string;
}
```

Public reads carry no `is_published` / `deleted_at` — unpublished and archived
products are simply not returned. The admin-only `ProductDto` still has them.

`ProductOption` is a variation axis (id = the attribute's id) with its picked
`values` (`label`, `value`, `color_hex`, `image_url`). `ProductVariant` carries
`option_values` pointing back at those, plus `price`, `price_override`,
`effective_price`, `stock`, `is_default`, `image_ids`.

`ProductAttribute.value` is typed by `type`: string, number, boolean, one
option object, an array of them (multiselect and every variation axis), or
`null` when the attribute is attached but blank.

## Availability

**Status decides whether a product sells; `stock` is advisory.** The shop keeps
counters loosely, so a product left `in_stock` with a zero counter is still
sold — blocking on the counter would hide live goods.

| Rule | Helper |
|---|---|
| Buyable ⇔ `status !== "out_of_stock"` | `isProductAvailableToBuy` |
| Order cap = counter when > 0, else `MAX_ORDER_QUANTITY` (100, the API's per-line limit), never above it | `getMaxQuantity` |
| "Залишилось N" when `0 < stock ≤ LOW_STOCK_THRESHOLD` (5) | `getLowStockCount` |

Variant stock follows the same rule: a depleted variant stays selectable and
just reads thinner in the picker.

## Price rules

- `sale_active` → `effective_price` as the main price, `price` struck through.
- Discount `−N%` from `price` / `effective_price` (`getProductDiscountPercent`).
- `price_range.min !== max` → the card shows `від {min}` instead of one price.
- A selected variant's own `effective_price` / `price` replace the product's.
- Currency `₴`, format `1 200 ₴` (`formatPrice`).

## Colours

`getColourSwatches` reads the colour axis from `options`, and falls back to a
plain `color` attribute for products that come in one colour — most of the
catalogue has no variants yet.

## Status → label

`PRODUCT_STATUS_LABELS`: `in_stock` → В наявності, `made_to_order` → Під
замовлення, `out_of_stock` → Немає в наявності.

## API contract

- `GET /api/v1/products` — `page`, `limit`, `category_id`, `include_descendants`,
  `status`, `search`, `min_price`, `max_price`, `is_featured`, `in_stock`,
  `sort`, `attributes[code]=a,b` (or `80..120` for a numeric range).
  Returns `{ items, meta }` inside the `{ data, timestamp }` envelope.
  At most `MAX_ATTRIBUTE_FACETS` (20) attribute facets and a
  `MAX_SEARCH_LENGTH` (100) character search term per request.
- `GET /api/v1/products/{slug}` — one product.
- Orders reference `variant_id` **or** `product_id`:
  `POST /api/v1/orders { items: [{ variant_id?, product_id?, quantity }] }` —
  at most `MAX_ORDER_LINES` (50) lines, each `quantity ≤ 100`. A line that is
  no longer sellable or lacks stock fails the whole order with `400`.
