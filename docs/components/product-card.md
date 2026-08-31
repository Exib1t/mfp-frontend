# ProductCard

**File:** `src/components/organisms/products/ProductCard/ProductCard.tsx`

## Purpose

One product in a grid — catalogue, home page row, search results. Links to
`/products/[slug]`; adds to the cart without leaving the grid.

## Props

| Prop | Type | Description |
|---|---|---|
| `product` | `Product` | `ProductDto` as served by the public API |
| `className` | `string` | Optional extension |

## Visual structure

```
┌─────────────────────────┐
│  [−20%] [Хіт]           │  ← badges overlay the image, top-left
│        IMAGE            │  ← 4:5, cover, scales 1.04 on hover
│                         │
├─────────────────────────┤
│  ВІГВАМИ                │  ← category, overline / muted
│  Молочний вігвам        │  ← subtitle1, h3
│  Затишний дитячий…      │  ← short_description, clamped to 2 lines
│  ● ● ●                  │  ← colour swatches, up to 5 then "+N"
│  4 000 ₴   Залишилось 3 │  ← price row, low-stock note on the right
├─────────────────────────┤
│  [ В кошик ]            │  ← appears on hover
└─────────────────────────┘
```

## Data rules

All derived through `entities/products/helpers` — the card computes nothing of
its own.

| Element | Rule |
|---|---|
| Image | `images[0].url`, else the `✦` placeholder |
| Badges | `−N%` when discounted, `Хіт` when `is_featured`, `Під замовлення` when `status === "made_to_order"` |
| Swatches | `getColourSwatches` — the colour axis, or the plain `color` attribute; `MAX_CARD_SWATCHES` (5) shown, the rest collapse into `+N` |
| Price | `price_range.min !== max` → `від {min}`; otherwise `effective_price` with `price` struck through while `sale_active` |
| Low stock | `Залишилось N` when `0 < stock ≤ LOW_STOCK_THRESHOLD` |
| CTA | Enabled ⇔ `isProductAvailableToBuy` — **the status decides, not the counter** |
| Add to cart | `addItem(product, getInitialVariant(product))`, then a success toast |

`status === "out_of_stock"` also veils the image with «Немає в наявності» and
the button reads the same.

## DOM structure

```html
<article class="product-card" data-status="in_stock|made_to_order|out_of_stock">
  <a class="product-card_media-link">
    <div class="product-card_image-wrap">
      <img class="product-card_image" />
      <div class="product-card_badges">…</div>
    </div>
  </a>

  <div class="product-card_body">
    <a class="product-card_body-link">
      <span class="typography" data-variant="overline">Категорія</span>
      <h3 class="typography" data-variant="subtitle1">Назва</h3>
      <p class="typography product-card_lead">Короткий опис</p>
    </a>
    <ul class="product-card_swatches"><li><span class="product-card_swatch" /></li></ul>
    <div class="product-card_price-row">…</div>
  </div>

  <div class="product-card_footer"><button class="button">В кошик</button></div>
</article>
```

The media link and the body link are separate anchors — the CTA sits outside
both, so a click on it never navigates.

## Hover states

- Card: `translate(-2px, -2px)` + `4px 4px 0` shadow (brutalist, matches Button)
- Image: `scale(1.04)` inside the `overflow: hidden` wrap, `400ms`
- Footer: fades in from `translateY(6px)`, `200ms`

## CSS conventions

Follows [CSS Conventions](../css-conventions.md): `product-card_element` for
sub-elements, `-modifier` for booleans, `data-*` for value props — the status
is a value, so it is `data-status`, and the out-of-stock veil hangs off it.

```tsx
const BASE_CLASS = "product-card"; // directly before the component function
className={cn(BASE_CLASS, className)} data-status={status}
```
