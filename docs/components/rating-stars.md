# RatingStars

**File:** `src/components/controls/RatingStars/RatingStars.tsx`

## Purpose

Star rating — display-only (review list) or interactive input (review
form). Replaces the local `Stars` helper and the separate `rating-btn`
markup that both lived inside `ProductReviews.tsx`.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `number` | — | Rating 1–5 |
| `onChange` | `(value: number) => void` | — | If passed, renders as an interactive 5-button input. Omit for read-only display. |
| `size` | `"sm" \| "md"` | `"sm"` | Icon size |
| `className` | `string` | — | Extension |

## DOM output

```html
<!-- read-only (no onChange) -->
<span class="rating-stars" data-size="sm" role="img" aria-label="Оцінка 4 з 5">
  <svg class="rating-stars_star -filled" /> × 4
  <svg class="rating-stars_star" /> × 1
</span>

<!-- interactive (onChange passed) -->
<div class="rating-stars -interactive" data-size="md">
  <button class="rating-stars_btn -active" aria-label="1 з 5"><svg /></button>
  ...
</div>
```

## Usage

```tsx
<RatingStars value={review.rating} />                              // display
<RatingStars value={rating} onChange={setRating} size="md" />       // form input
```

## Implementation

```tsx
const BASE_CLASS = "rating-stars"; // defined before component function

className={cn(BASE_CLASS, className, { "-interactive": !!onChange })}
```

## Notes

- Read-only mode renders `<span role="img">` (matches how a single review's rating was announced before); interactive mode renders 5 real `<button>`s — kept as two branches rather than one because a list of disabled buttons per review is worse a11y than a single labeled image.
- Fixed at 5 stars — not configurable, matches the only rating scale used in the app.
