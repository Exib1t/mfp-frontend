# Product Detail Page

**URL:** `/products/[slug]`  
**File:** `src/pages/ProductPage/ProductPage.tsx` *(to be created)*

## Purpose

Product presentation + option selection + add to cart.

## Layout

Two-column on desktop: media (left) + options panel (right).  
Mobile: media on top, options below.

## Sections

### Media
- Main photo + thumbnail gallery
- Photo changes based on selected options

### Product info
- Name, price (updates based on options)
- Short description
- Available options:
  - Fabric color — color swatches
  - Accessories toggles — checkboxes or chips (подушки, прапорці, килимок, гірлянда)
- Quantity selector
- "Додати в кошик" button
- "Зібрати комплект" CTA → links to related products in same style *(phase 2)*

### Description tabs
- Опис / Характеристики / Догляд / Доставка

### Related products
- Same category or same style tag, 4 items

## Data

- `GET /products/[slug]` — product detail, options, base price
- `GET /products/[slug]/related` — related products

## Notes

- URL slug must be human-readable (e.g. `/products/vigvam-krémovyi-s-kushlonom`)
- Price shown always reflects selected options
- OG image = main product photo
- Breadcrumb: Головна → Каталог → [product name]
