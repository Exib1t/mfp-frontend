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
- Public reviews (`PublicReviewDto`) never carry the author's email
- At most 5 reviews a minute per client — beyond that `429`, shown as its own toast

## Behaviour

- List approved reviews: author, rating (★), date, body. Empty state when none.
- Form: name (required, ≤ 100), email (optional), rating 1–5 (required), text (required, ≤ 5000).
- On success: form resets, shows "review sent, awaiting moderation" notice
  (pending reviews are not returned by the public list).
- On error: inline error message, form stays filled.
