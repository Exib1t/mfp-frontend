# EmptyState

**File:** `src/components/controls/EmptyState/EmptyState.tsx`

## Purpose

Centered icon + title + description + action block. Replaces the repeated
`_empty` / `_not-found` wrapper markup duplicated across CartPage (empty
cart), ProductPage (product not found) and ProductsPage (no results / load
error).

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | — | **Required** headline |
| `titleAs` | `ElementType` | `"p"` | Tag for the title — use `"h1"` for page-level empty states (empty cart, not found) |
| `description` | `string` | — | Optional supporting line |
| `icon` | `ReactNode` | — | Optional icon above the title |
| `action` | `ReactNode` | — | Optional CTA (usually a `Button`) |
| `className` | `string` | — | Extension |

## DOM output

```html
<div class="empty-state">
  <div class="empty-state_icon"><svg /></div>
  <h1 class="typography">Кошик порожній</h1>
  <p class="typography">Додайте товари з каталогу, щоб оформити замовлення.</p>
  <div class="empty-state_action"><button class="button">До каталогу</button></div>
</div>
```

## Usage

```tsx
<EmptyState
  icon={<ShoppingBag size={48} strokeWidth={1.5} />}
  title="Кошик порожній"
  titleAs="h1"
  description="Додайте товари з каталогу, щоб оформити замовлення."
  action={<Button variant="primary" size="md" as={Link} href="/products">До каталогу</Button>}
/>

// title + description only, no icon/action
<EmptyState title="Товар не знайдено" titleAs="h1" action={<Button as={Link} href="/products">До каталогу</Button>} />
```

## Implementation

```tsx
const BASE_CLASS = "empty-state"; // defined before component function

className={cn(BASE_CLASS, className)}
```

## Notes

- `icon`/`description`/`action` render only when passed.
- Title uses `Typography variant="h3"`; `titleAs` only changes the rendered tag for a11y (h1 when it's the page's actual heading), not the visual size.
- For simple single-line "nothing found" / error messages that aren't full empty states (see ProductsPage catalog grid), keep using a plain muted `Typography` — this component is for the icon+title+description+action shape specifically.
