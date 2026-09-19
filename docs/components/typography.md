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

| `variant` | Default tag | Token | Size / line-height |
|---|---|---|---|
| `h1` | `<h1>` | `--typo-display-lg` | 36→56 fluid, 700, tight tracking |
| `h2` | `<h2>` | `--typo-display-md` | 32→44 fluid, 700, tight tracking |
| `h3` | `<h3>` | `--typo-display-sm` | 28→36 fluid, 600 |
| `h4` | `<h4>` | `--typo-title-lg` | 30/38, 600 |
| `h5` | `<h5>` | `--typo-title-md` | 24/32, 600 |
| `h6` | `<h6>` | `--typo-title-sm` | 18/24, 600 |
| `subtitle1` | `<p>` | `--typo-body-lg` | 18/28, 400 |
| `subtitle2` | `<p>` | `--typo-label-md` | 16/20, 600 |
| `body1` | `<p>` | `--typo-body-md` | 16/24, 400 |
| `body2` | `<p>` | `--typo-body-sm` | 14/20, 400 |
| `caption` | `<span>` | `--typo-caption` | 12/16, 400 |
| `overline` | `<span>` | `--typo-caption` | 12/16, 600 + UPPERCASE + wider tracking |
| `label` | `<label>` | `--typo-label-sm` | 14/18, 600 |

Every variant resolves to one `--typo-*` shorthand, so size, weight and
line-height are never picked apart and cannot drift out of step. `h1`–`h3` use
the storefront-only display steps; everything from `h4` down is shared verbatim
with the admin panel.

The `data-weight` override rules are declared **after** the variants on purpose:
the `font:` shorthand resets weight, so a rule placed before it would be
overwritten rather than applied.

## Colors

```ts
type TypographyColor =
  | "foreground"   // var(--text-default)
  | "primary"      // var(--primary-text)
  | "muted"        // var(--text-muted)
  | "error"        // var(--danger-text)
  | "success"      // var(--success-text)
  | "warning"      // var(--warning-text)
  | "background";  // var(--text-white) — for inverted text
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

## Implementation

```tsx
const BASE_CLASS = "typography"; // defined before component function

className={cn(BASE_CLASS, className, { "-truncate": truncate })}
```

`BASE_CLASS` constant placed directly before the component function. All `cn()` calls use `BASE_CLASS` as first argument — never a raw string literal.
