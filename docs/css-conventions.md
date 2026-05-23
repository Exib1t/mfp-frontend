# CSS Conventions

## Naming structure

Three layers, each with own syntax:

| Layer | Syntax | CSS selector | Use for |
|---|---|---|---|
| Sub-element | `block_element` | `.block_element` | Parts inside component |
| Boolean modifier | `-modifier` | `.block.-modifier` | Toggled states (truncate, disabled, active) |
| Value modifier | `data-*` attribute | `.block[data-key="value"]` | Enum-like props (variant, color, size, align) |

### Example

```html
<div class="card -selected" data-size="lg">
  <div class="card_header">...</div>
  <div class="card_body">...</div>
</div>
```

```css
.card { ... }
.card_header { ... }
.card_body { ... }

.card[data-size="sm"] { ... }
.card[data-size="lg"] { ... }

.card.-selected { ... }
```

## Rules

- One `BASE_CLASS` constant per component file: `const BASE_CLASS = "card"`
- Component root always gets `BASE_CLASS` as className
- No global element selectors for styling (except in `globals.css`)
- No inline styles — use CSS vars or class modifiers
- CSS file lives next to component: `Card/Card.styles.css`

## `cn()` utility

Located at `src/lib/utils/cn.ts`. Wraps `classnames`.

```tsx
import { cn } from "@/lib/utils/cn";

className={cn(BASE_CLASS, className, { "-disabled": disabled })}
```

## Sub-elements

Sub-elements always use `${BASE_CLASS}_element` — never repeat the block name as a raw string:

```tsx
const BASE_CLASS = "card";

// ✅ correct
<div className={BASE_CLASS}>
  <div className={`${BASE_CLASS}_header`}>...</div>
  <div className={`${BASE_CLASS}_body`}>...</div>
</div>

// ❌ wrong — raw string literals
<div className="card">
  <div className="card_header">...</div>
</div>
```

Rename `BASE_CLASS` in one place → all sub-elements update automatically.

## CSS nesting

All CSS files use native CSS nesting. Sub-elements, modifiers, pseudo-classes, and media queries nest inside the block rule:

```css
.card {
  /* base */

  &_header { /* .card_header */ }
  &_body   { /* .card_body */   }

  &.-selected { /* .card.-selected */ }

  &[data-size="lg"] { /* .card[data-size="lg"] */ }

  &:hover { /* .card:hover */ }

  /* compound: parent state affects child */
  &:hover &_image { transform: scale(1.04); }
  &.-loading &_label { opacity: 0.35; }

  /* double nesting for compound sub-elements */
  &_contacts {
    &_link { /* .card_contacts_link */ }
  }

  @media (max-width: 768px) {
    /* responsive — & still refers to .card */
    &_header { flex-direction: column; }
  }
}
```

`@keyframes` stay at top level (cannot nest inside a rule).

## Specificity

- Base `.block` — element defaults
- `.block[data-key="value"]` — value variants (specificity 0-2-0)
- `.block.-modifier` — boolean states (specificity 0-2-0)
- External `className` prop — consumer overrides, apply last via `cn()`
