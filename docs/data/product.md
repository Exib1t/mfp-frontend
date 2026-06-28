# Product — Data Model

Types are **generated from the backend OpenAPI schema** — never hand-write them.

- Generated types: `src/lib/api/v1.d.ts` (via `npm run generate`)
- Domain aliases: `src/entities/products/types.ts`
- Helpers: `src/entities/products/helpers.ts`
- Query hooks: `src/entities/products/api.ts`

## Type (from `ProductDto`)

```ts
type ProductStatus = "in_stock" | "made_to_order" | "out_of_stock";

interface ProductVariant {
  id: number;
  color: string | null;
  size: string | null;
  child_name: string | null;
  stock: number;
}

interface Product {
  id: number;
  name: string;
  slug: string;                 // URL: /products/[slug]
  description: string | null;
  price: number;                // base price (UAH)
  sale_price: number | null;    // when set → shown as main, price struck-through
  status: ProductStatus;
  new_category: { id: number; name: string; slug: string };
  variants: ProductVariant[];   // cart items reference variant id
  image_urls: string[];         // [0] = cover
  images: { id: number; url: string }[];
  created_at: string;
  updated_at: string;
}
```

## Categories

Dynamic, fetched from `GET /categories` (`CategoryDto`). No hard-coded enum.

## Status → label

| Value | Label UA |
|---|---|
| `in_stock` | В наявності |
| `made_to_order` | Під замовлення |
| `out_of_stock` | Немає в наявності |

## Display rules

- `sale_price` present → main price = `sale_price`, `price` struck-through.
- Discount badge `−N%` computed from `price` / `sale_price` (`getDiscountPercent`).
- Buyable when `status !== "out_of_stock"` **and** a variant has `stock > 0`.
- Currency: `₴`, format `1 200 ₴` (`formatPrice`).

## API contract

- `GET /products?page&limit&category_id&status` → `Product[]` (envelope `{ data, timestamp }`)
- `GET /products/{slug}` → `Product`
- Order references variants: `POST /orders { items: [{ variant_id, quantity }] }`
