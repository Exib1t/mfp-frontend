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

## Specificity

- Base `.block` — element defaults
- `.block[data-key="value"]` — value variants (specificity 0-2-0)
- `.block.-modifier` — boolean states (specificity 0-2-0)
- External `className` prop — consumer overrides, apply last via `cn()`
