# Home Page

**URL:** `/`  
**File:** `src/pages/HomePage/HomePage.tsx`

## Purpose

Landing page. Brand introduction + conversion to catalog or product.

## Sections (top → bottom)

### 1. Hero
- Full-screen or large banner
- Tagline + short description
- CTA button → `/products` or featured product

### 2. Featured products
- 3–6 products, grid or horizontal scroll
- Each: photo, name, price, link to `/products/[slug]`

### 3. How it works / USP
- 3–4 key advantages (quality, customization, delivery, etc.)
- Icon + short text per item

### 4. Configurator teaser *(future)*
- Preview of configurator feature
- CTA → product with configurator

### 5. Inspiration / Gallery
- Photo grid or masquerade
- Optional: link to `/blog`

### 6. Reviews / Social proof
- Customer reviews or UGC photos

### 7. CTA banner
- "Зібрати власний вігвам" → `/products`

## Data

- Featured products — from API (`/products?featured=true`)
- Reviews — static or from API

## Notes

- SEO priority: high (main entry point)
- OG image required for social sharing
