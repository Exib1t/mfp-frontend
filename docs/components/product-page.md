# ProductPage

**File:** `src/pages/ProductPage/ProductPage.tsx`
**Route:** `src/app/products/[slug]/page.tsx`

## Purpose

Full product detail page. Renders for `/products/[slug]`.

## Props

| Prop | Type | Description |
|---|---|---|
| `product` | `Product` | Resolved from slug, passed from page |

## Visual structure

```
┌─────────────────────────────────────────────────────┐
│  Home / Products / {name}   ← breadcrumb            │
├─────────────────────┬───────────────────────────────┤
│                     │  Category (overline, muted)   │
│                     │  Product Name (h1)            │
│      IMAGE          │                               │
│   4:5 ratio         │  [badge] [badge]              │
│                     │                               │
│                     │  2 900 ₴  ~~3 600 ₴~~        │
│                     │                               │
│                     │  Description (body1)          │
│                     │                               │
│                     │  [Додати до кошика]   ← primary│
│                     │  [← Назад до каталогу] ← ghost│
└─────────────────────┴───────────────────────────────┘
```

## Route file pattern

`params` is `Promise` in this Next.js version — must `await params`.

```tsx
// src/app/products/[slug]/page.tsx
interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  ...
}
```

## DOM structure

```html
<div class="product-page">
  <nav class="product-page_breadcrumb">...</nav>
  <div class="product-page_grid">
    <div class="product-page_image-wrap">
      <img class="product-page_image" />
      <div class="product-page_badges">...</div>
    </div>
    <div class="product-page_info">
      <span class="typography" data-variant="overline">Category</span>
      <h1 class="typography" data-variant="h2">Name</h1>
      <div class="product-page_price-row">...</div>
      <p class="typography" data-variant="body1">Description</p>
      <div class="product-page_actions">...</div>
    </div>
  </div>
</div>
```

## CSS conventions

- BEM-style: `product-page_element`
- `data-*` for value props
- `-modifier` for booleans
