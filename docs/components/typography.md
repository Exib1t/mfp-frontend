# Typography

**File:** `src/components/controls/Typography/Typography.tsx`

Polymorphic text component. Decouples visual style (`variant`) from HTML semantics (`as`).

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `TypographyVariant` | `"body1"` | Visual style |
| `as` | `ElementType` | derived from `variant` | Override HTML tag |
| `color` | `TypographyColor` | — | Named color from design tokens |
| `weight` | `TypographyWeight` | — | Override variant's font-weight |
| `align` | `TypographyAlign` | — | Text alignment |
| `truncate` | `boolean` | `false` | Single-line overflow ellipsis |
| `className` | `string` | — | Additional classes |

All native HTML attributes of the rendered element are also accepted and typed correctly.

## Variants

| `variant` | Default tag | Size | Weight | Line-height |
|---|---|---|---|---|
| `h1` | `<h1>` | 5xl (60px) | bold | tight |
| `h2` | `<h2>` | 4xl (48px) | bold | tight |
| `h3` | `<h3>` | 3xl (36px) | semibold | snug |
| `h4` | `<h4>` | 2xl (30px) | semibold | snug |
| `h5` | `<h5>` | xl (24px) | semibold | snug |
| `h6` | `<h6>` | lg (20px) | semibold | snug |
| `subtitle1` | `<p>` | md (18px) | medium | normal |
| `subtitle2` | `<p>` | base (16px) | medium | normal |
| `body1` | `<p>` | base (16px) | regular | relaxed |
| `body2` | `<p>` | sm (14px) | regular | relaxed |
| `caption` | `<span>` | xs (12px) | regular | normal |
| `overline` | `<span>` | xs (12px) | semibold | normal + UPPERCASE + wide spacing |
| `label` | `<label>` | sm (14px) | medium | normal |

## Colors

```ts
type TypographyColor =
  | "foreground"   // var(--foreground)
  | "primary"      // var(--primary)
  | "muted"        // var(--color-muted)
  | "error"        // var(--color-error)
  | "success"      // var(--color-success)
  | "warning"      // var(--color-warning)
  | "background";  // var(--background) — for inverted text
```

No `color` prop = inherits from parent.

## Usage

```tsx
// Basic
<Typography variant="h1">Title</Typography>

// Decouple semantics from visual
<Typography variant="h1" as="h2">Visual h1, semantic h2</Typography>

// Color
<Typography variant="body1" color="muted">Secondary text</Typography>
<Typography variant="overline" color="primary">CATEGORY</Typography>

// Weight override
<Typography variant="body2" weight="bold">Emphasized</Typography>

// Truncate
<Typography variant="caption" truncate>Long text that gets cut off...</Typography>

// label htmlFor — native attr typed to the rendered element
<Typography variant="label" htmlFor="email">Email</Typography>

// id, aria-*, data-* — all natively typed
<Typography variant="h1" id="hero-title" aria-label="Page title">...</Typography>
```

## DOM output

```html
<h1 class="typography" data-variant="h1" data-color="primary">Title</h1>
<p class="typography -truncate" data-variant="body2" data-weight="bold">Text</p>
```

## CSS structure

Follows [CSS Conventions](../css-conventions.md):

```css
.typography { ... }                          /* base */
.typography[data-variant="h1"] { ... }       /* value → data attribute */
.typography[data-color="primary"] { ... }    /* value → data attribute */
.typography[data-weight="bold"] { ... }      /* value → data attribute */
.typography.-truncate { ... }               /* boolean → -modifier class */
```
