# Price

**File:** `src/components/controls/Price/Price.tsx`

Renders the amount a buyer pays, with an optional struck-through original next
to it. Single source of truth for price markup — used by `ProductCard`,
`ProductPage`, the cart and the admin panel.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `number` | — | What the buyer pays |
| `compareAt` | `number \| null` | `null` | Original price; struck through when it is higher than `value` |
| `prefix` | `string` | — | Leading word, e.g. `"від"` for a price range |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size |
| `className` | `string` | — | Extension |

A `compareAt` that is not strictly greater than `value` is ignored, so callers
can pass `compare_at_price` straight from the API without pre-checking.

## Sizes

| `size` | Current | Original | Use case |
|---|---|---|---|
| `sm` | sm (14px) | xs (12px) | cart lines, admin tables |
| `md` | lg (20px) | sm (14px) | product card |
| `lg` | 2xl (30px) | md (18px) | product page |

## DOM output

```html
<span class="price" data-size="md" class="-sale">
  <span class="price_current">1 200 ₴</span>
  <span class="price_original">1 400 ₴</span>
</span>
```

## Usage

```tsx
<Price value={product.effective_price} compareAt={product.compare_at_price} />
<Price value={variant.effective_price} size="lg" />
<Price value={product.price_range.min} prefix="від" size="md" />
```

## Notes

- Inline element, renders as `<span>` — safe inside links and headings
- Formatting goes through `formatPrice()` from `@/lib/utils/formatPrice`
- Discount percentage is a separate concern — render a `Badge` alongside
