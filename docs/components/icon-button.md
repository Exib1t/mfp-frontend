# IconButton

**File:** `src/components/controls/IconButton/IconButton.tsx`

## Purpose

Standalone icon-only button (remove, close, toggle). Replaces the repeated
hand-rolled `<button className="..."><X /></button>` pattern that showed up
independently in CartPage, ProductsPage and Toast.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"ghost" \| "outline"` | `"ghost"` | Visual style |
| `size` | `"sm" \| "md"` | `"md"` | Size |
| `aria-label` | `string` | — | **Required** — icon buttons have no visible text |
| `className` | `string` | — | Extension (e.g. per-use hover color) |
| `children` | `ReactNode` | — | Icon element (e.g. `<X size={16} />`) |

All native `<button>` attributes also accepted. `type` defaults to `"button"`
unless explicitly overridden.

## Variants

| `variant` | Use case |
|---|---|
| `ghost` | No border, transparent bg, bg tint on hover — remove/close/toggle buttons |
| `outline` | Bordered square, bg tint on hover — standalone stepper-style buttons |

## Sizes

| `size` | Box |
|---|---|
| `sm` | 28×28px |
| `md` | 36×36px |

## DOM output

```html
<button class="icon-button" data-variant="ghost" data-size="md" type="button" aria-label="Видалити">
  <svg ... />
</button>
```

## Usage

```tsx
<IconButton aria-label="Видалити" onClick={removeItem}>
  <X size={16} strokeWidth={2} />
</IconButton>

<IconButton variant="outline" size="sm" aria-label="Закрити" onClick={close}>
  <X size={18} strokeWidth={2} />
</IconButton>
```

## Implementation

```tsx
const BASE_CLASS = "icon-button"; // defined before component function

className={cn(BASE_CLASS, className)}
```

## Notes

- Pure presentational wrapper — no built-in confirm/undo behavior.
- `aria-label` is required at the type level (not optional) since the button has no text content.
- Not used inside `QuantityStepper` — that control has its own grouped-border buttons with different layout needs.
