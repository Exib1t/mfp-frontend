# ProductCard

**File:** `src/components/organisms/products/ProductCard/ProductCard.tsx`

## Purpose

Display a single product in a grid. Clickable → `/products/[slug]`.

## Props

| Prop | Type | Description |
|---|---|---|
| `product` | `Product` | From `entities/products/models.ts` |
| `className` | `string` | Optional extension |

## Visual structure

```
┌─────────────────────────┐
│                         │
│        IMAGE            │  ← square-ish ratio ~4:5
│                         │
│  [badge]      [status]  │  ← overlaid on image
│                         │
├─────────────────────────│
│  Category name          │  ← overline variant, muted
│  Product name           │  ← subtitle1, bold
│                         │
│  1 200 ₴  ~~1 500 ₴~~  │  ← price row
│                         │
│  [Обрати]               │  ← ghost/secondary button, appears on hover
└─────────────────────────┘
```

## Image area

- Aspect ratio: `4 / 5`
- Object-fit: cover
- On missing image: placeholder with brand glyph (✦)
- On hover: subtle scale `1.04`, `overflow: hidden` on wrap
- Transition: `400ms ease`

## Badges (top-left overlay)

Shown from `product.badges[]`:

| Badge value | Label | Variant |
|---|---|---|
| `new` | Новинка | primary |
| `sale` | −N% (computed from price/salePrice) | error |
| `bestseller` | Хіт | warning |
| `limited` | Останні | warning |

Multiple badges stack vertically.

## Status (bottom-left overlay on image)

Derived from `product.inStock`:
- `true` → не показуємо (default = in stock)
- `false` → "Немає в наявності" (muted overlay)

## Price row

- `salePrice` set → `salePrice` bold + `price` struck-through muted
- No `salePrice` → `price` only
- Format: `1 200 ₴` (space as thousands separator)

## CTA button

- Hidden by default
- Appears on card hover (opacity + translateY transition)
- Text: "Обрати"
- Variant: `secondary`, size: `sm`
- Full width

## DOM structure

```html
<article class="product-card" data-in-stock="true|false">
  <a class="product-card_link" href="/products/[slug]">

    <div class="product-card_image-wrap">
      <img class="product-card_image" />
      <div class="product-card_badges">
        <span class="badge" data-variant="primary">Новинка</span>
      </div>
    </div>

    <div class="product-card_body">
      <span class="typography" data-variant="overline" data-color="muted">Вігвами</span>
      <h3 class="typography" data-variant="subtitle1">Назва товару</h3>
      <div class="product-card_price">...</div>
    </div>

    <div class="product-card_footer">
      <button class="button" data-variant="secondary" data-size="sm">Обрати</button>
    </div>

  </a>
</article>
```

## Hover states

- Card: `box-shadow` offset (brutalist, matches Button style) + slight lift `translateY(-2px)`
- Image: `scale(1.04)` inside `overflow:hidden` wrap
- CTA button: fade in + `translateY(0)` from `translateY(4px)`
- Transition: `200ms ease` for card, `400ms ease` for image

## CSS conventions

Follows [CSS Conventions](../css-conventions.md):
- `product-card_element` for sub-elements
- `data-*` for value props
- `-modifier` for booleans (e.g. `.-out-of-stock`)

```tsx
const BASE_CLASS = "product-card"; // defined before component function

className={cn(BASE_CLASS, className, { "-out-of-stock": !inStock })}
```

`BASE_CLASS` constant placed directly before the component function. All `cn()` calls use `BASE_CLASS` as first argument — never a raw string literal.

## Notes

- Uses `Typography` and `Badge` components
- Uses `Button` component for CTA
- `<article>` + `<a>` wrap = semantic, entire card clickable
- `formatPrice(n)` util needed: `1200 → "1 200 ₴"`
