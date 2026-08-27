# StaticPageLayout

**File:** `src/components/common/StaticPageLayout/StaticPageLayout.tsx`

## Purpose

Shared shell for static content pages (About, Delivery, Contacts, Blog, Privacy) — title + optional subtitle header, content wrapper. Replaces the identical `_header`/`_inner` block that would otherwise be copy-pasted into every one of these pages (same pattern already used ad hoc in CartPage/ProductsPage).

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | — | **Required** page heading (h1) |
| `subtitle` | `string` | — | Optional muted lead line under the title |
| `children` | `ReactNode` | — | Page content |

## DOM output

```html
<div class="static-page">
  <div class="static-page_inner">
    <div class="static-page_header">
      <h1 class="typography">Про нас</h1>
      <p class="typography">Handmade вігвами та дитячий текстиль...</p>
    </div>
    <div class="static-page_content">...</div>
  </div>
</div>
```

## Usage

```tsx
<StaticPageLayout title="Про нас" subtitle="Handmade вігвами та дитячий текстиль з натуральних матеріалів">
  <Typography variant="body1">...</Typography>
</StaticPageLayout>
```

## Implementation

```tsx
const BASE_CLASS = "static-page"; // defined before component function

className={cn(BASE_CLASS, className)}
```

## Notes

- No section/grid primitives baked in — each page composes its own content with `Typography`/`Button`/plain markup inside `children`. Keeps the shared piece to just what's actually duplicated (header shape), per the "three similar lines vs premature abstraction" rule — the header shape repeats 5×, individual section layouts don't.
