# Badge

**File:** `src/components/controls/Badge/Badge.tsx`

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"default" \| "primary" \| "success" \| "warning" \| "error"` | `"default"` | Color style |
| `size` | `"sm" \| "md"` | `"md"` | Size |
| `className` | `string` | — | Extension |

## Variants

| `variant` | Color | Use case |
|---|---|---|
| `default` | neutral gray | теги, категорії |
| `primary` | brand (`--primary`) | акцент, новинка |
| `success` | green | в наявності |
| `warning` | amber | залишилось мало |
| `error` | red | немає в наявності, знижка |

## Sizes

| `size` | Font | Padding |
|---|---|---|
| `sm` | xs (12px) | 2px 6px |
| `md` | sm (14px) | 4px 10px |

## DOM output

```html
<span class="badge" data-variant="primary" data-size="md">Новинка</span>
<span class="badge" data-variant="error" data-size="sm">−20%</span>
```

## Usage

```tsx
<Badge>Категорія</Badge>
<Badge variant="primary">Новинка</Badge>
<Badge variant="error" size="sm">−20%</Badge>
<Badge variant="success">В наявності</Badge>
<Badge variant="warning">Останні 3</Badge>
```

## Implementation

```tsx
const BASE_CLASS = "badge"; // defined before component function

className={cn(BASE_CLASS, className)}
```

`BASE_CLASS` constant placed directly before the component function. All `cn()` calls use `BASE_CLASS` as first argument — never a raw string literal.

## Notes

- Inline element, renders as `<span>`
- No interactive state — pure display
- For interactive chips/tags (filters) → `Chip` component (priority 2)
