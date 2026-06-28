# ProductReviews

**File:** `src/components/organisms/products/ProductReviews/ProductReviews.tsx`
**Base class:** `product-reviews`

## Purpose

Show approved reviews for a product and let visitors submit a new one.
Rendered at the bottom of the product detail page.

## Props

| Prop | Type | Notes |
|---|---|---|
| `productId` | `number` | Backend product id |

## Data

- `GET /reviews/product/{productId}` → approved reviews (`useProductReviews`)
- `POST /reviews` → submit review (`useCreateReview`), created as `pending`

## Behaviour

- List approved reviews: author, rating (★), date, body. Empty state when none.
- Form: name (required), email (optional), rating 1–5 (required), text (required).
- On success: form resets, shows "review sent, awaiting moderation" notice
  (pending reviews are not returned by the public list).
- On error: inline error message, form stays filled.
