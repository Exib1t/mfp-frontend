# QuantityStepper

**File:** `src/components/controls/QuantityStepper/QuantityStepper.tsx`

## Purpose

Minus / value / Plus quantity control. Replaces the near-identical
hand-rolled markup duplicated in CartPage (cart line items) and ProductPage
(add-to-cart quantity).

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `number` | — | Current quantity |
| `onChange` | `(value: number) => void` | — | Called with the next quantity |
| `min` | `number` | `1` | Lower bound, decrease disabled at this value |
| `max` | `number` | — | Upper bound, increase disabled at this value (unbounded if omitted) |
| `size` | `"sm" \| "md"` | `"md"` | Size |
| `className` | `string` | — | Extension |

## Sizes

| `size` | Button box | Use case |
|---|---|---|
| `sm` | 32×32px | Compact contexts — cart line items |
| `md` | 36×36px | Primary quantity picker — product page |

## DOM output

```html
<div class="quantity-stepper" data-size="md">
  <button class="quantity-stepper_btn" type="button" aria-label="Зменшити" disabled>
    <svg /> <!-- Minus -->
  </button>
  <span class="quantity-stepper_value">2</span>
  <button class="quantity-stepper_btn" type="button" aria-label="Збільшити">
    <svg /> <!-- Plus -->
  </button>
</div>
```

## Usage

```tsx
<QuantityStepper
  value={item.quantity}
  min={1}
  max={item.maxStock}
  onChange={(qty) => setQuantity(item.variantId, qty)}
  size="sm"
/>
```

## Implementation

```tsx
const BASE_CLASS = "quantity-stepper"; // defined before component function

className={cn(BASE_CLASS, className)}
```

## Notes

- Decrease button disabled at `min`, increase disabled at `max` (or never, if `max` omitted).
- Clamps `onChange` output to `[min, max]` internally — callers don't need to re-clamp.
- Not built from `IconButton` — the grouped/bordered layout (shared border, no gap
  between buttons and value) is specific to this control.
