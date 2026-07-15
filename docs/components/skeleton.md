# Skeleton

**File:** `src/components/controls/Skeleton/Skeleton.tsx`

## Purpose

Pulsing loading placeholder block. Replaces the ad hoc `_skeleton` /
`_image-skeleton` / `_info-skeleton` divs that each redefined the same
pulse animation locally in ProductsPage and ProductPage.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | — | Sets width/height/aspect-ratio/shape — this component has no size opinion of its own |

## DOM output

```html
<div class="skeleton products-page_skeleton"></div>
```

## Usage

```tsx
// ProductsPage.styles.scss defines aspect-ratio for ._skeleton
<Skeleton className={`${BASE_CLASS}_skeleton`} />

// ProductPage — two differently-shaped placeholders, same base
<Skeleton className={`${BASE_CLASS}_image-skeleton`} />
<Skeleton className={`${BASE_CLASS}_info-skeleton`} />
```

## Implementation

```tsx
const BASE_CLASS = "skeleton"; // defined before component function

className={cn(BASE_CLASS, className)}
```

## Notes

- Deliberately has no `width`/`height`/`variant` props — every call site needs a different shape (card, image, text block), so sizing stays the caller's job via `className`, same as any other `cn()` extension point in this codebase.
- Animation (`skeleton-pulse`) and base color (`--background-variant`) live once in `Skeleton.styles.scss` instead of being redefined per view.
