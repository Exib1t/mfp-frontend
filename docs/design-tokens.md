# Design Tokens

All tokens live in `src/assets/styles/variables.scss` as CSS custom properties.

**The system is the admin panel's.** The scales and semantic names are copied
from `mfp-admin/src/assets/styles/theme.css`, so a token learned in one app
means the same thing in the other. Two things differ, both storefront-only:

- **Light theme only.** The admin ships a dark palette; the storefront does not.
- **Display typography and extra spacing/radius steps** above where the admin's
  scales stop — a tool never needs a 56px hero or a 96px gap between sections.
  The display steps are also the only fluid ones; see below.

Keep the two files in step. If a token changes here, change it there too.

## The two layers

Never reach for a raw scale value (`--n-300`, `--p-600`) in a component. Use the
semantic token that names the job (`--border-default`, `--primary-default`).
The raw scales exist so the semantic layer has somewhere to point.

## Typography

Type is set as a whole `font:` shorthand, never as a loose size plus weight plus
line-height. One variable carries all three, so they cannot drift apart.

| Token | Value |
|---|---|
| `--typo-caption` | `400 12px/16px` — hints, errors, counters. The only 12px in the system. |
| `--typo-body-sm` | `400 14px/20px` |
| `--typo-body-md` | `400 16px/24px` |
| `--typo-body-lg` | `400 18px/28px` |
| `--typo-label-sm` | `600 14px/18px` |
| `--typo-label-md` | `600 16px/20px` |
| `--typo-label-lg` | `600 18px/24px` |
| `--typo-title-sm` | `600 18px/24px` |
| `--typo-title-md` | `600 24px/32px` |
| `--typo-title-lg` | `600 30px/38px` |
| `--typo-display-sm` | `600 clamp(28px, …, 36px)/1.2` — storefront only, fluid |
| `--typo-display-md` | `700 clamp(32px, …, 44px)/1.18` — storefront only, fluid |
| `--typo-display-lg` | `700 clamp(36px, …, 56px)/1.14` — storefront only, fluid |

The three display steps are the **only** fluid type in the system. A 56px hero
is right on a desktop and absurd on a 390px phone, where it used to eat 40% of
the first screen. Everything below display is fixed — the `title` steps in
particular, because they are shared verbatim with the admin and a scale that
means one thing in one app and something else in the other is not a shared
scale. Their line-heights are unitless ratios: a fixed px leading would crush
the large end of the clamp.

```css
.card_title {
  font: var(--typo-title-md);
}
```

### Font family

| Token | Value |
|---|---|
| `--font-family-onest` | `var(--font-onest), "Onest", system-ui, sans-serif` |

Onest is loaded via `next/font/google` in `app/layout.tsx`, which puts
`--font-onest` on `<html>`. The `--font-family-onest` token wraps it with the
literal name and a generic, so type still renders before the font arrives.
Latin **and Cyrillic** subsets — the whole storefront is Ukrainian.

## Colors

### Semantic — use these

| Token | Use |
|---|---|
| `--bgd-default` / `--bgd-variant` | Page ground. `default` is the tinted neutral the body paints. |
| `--bgd-hover` / `--bgd-active` | Hover and press for things sitting *on* the ground (ghost buttons). |
| `--srf-default` | A surface on top of the ground — card, panel, header, drawer. White. |
| `--srf-variant` | A recessed surface: input fills, nested cards. |
| `--srf-hover` / `--srf-active` | Hover and press for things sitting *on* a surface. |
| `--text-default` | Body and heading text. |
| `--text-variant` | Secondary text, unpressed icon buttons. |
| `--text-muted` | Captions, hints, placeholders. The lightest step that still clears AA. |
| `--text-white` | Text on a dark fill. |
| `--border-subtle` | Card edges, dividers, row rules. |
| `--border-default` | Input and control frames. |
| `--border-strong` | A frame on hover. |
| `--primary-*` | Brand ramp: `default` / `hover` / `active` fills, `border`, `surface`, `surface-hover`, `text`, `on-primary`. |
| `--secondary-*` | Neutral button ramp, plus `--on-secondary`. |
| `--success-*` `--danger-*` `--warning-*` `--info-*` | Each has `default` / `hover` / `active` fills, a `subtle` tint, a `text` step and an `on-*`. |

**Fills and text take different steps.** A `500` reads at ~3.3–4.1:1 on white:
fine for a swatch or a dot, under AA for anything anyone has to read. So text
takes `--*-text` (the 700) and the 500s stay on fills. Never use
`--danger-default` for an error message; use `--danger-text`.

### Raw scales — for the semantic layer only

`--n-0` … `--n-950` (warm neutral), `--p-50` … `--p-900` (primary), and
`--green-*` / `--red-*` / `--amber-*` / `--blue-*`.

## Effects

| Token | Use |
|---|---|
| `--focus-ring` | The one focus treatment. `box-shadow: var(--focus-ring)` with `outline: none`. |
| `--overlay` | Modal and drawer scrims. |
| `--shadow-sm` | A resting card that needs separation. |
| `--shadow-md` | Hover lift, dropdowns. |
| `--shadow-lg` | Drawers, toasts, anything floating over the page. |

## Spacing

A 4px grid. Layout gaps and paddings come from here, never from a literal.

`--space-1` 4px · `--space-2` 8 · `--space-3` 12 · `--space-4` 16 ·
`--space-5` 20 · `--space-6` 24 · `--space-8` 32 · `--space-10` 40 ·
`--space-12` 48 · `--space-16` 64 · `--space-20` 80 · `--space-24` 96

The last four are storefront-only: page sections need separations a 40px top
step cannot give them.

## Radius

`--radius-sm` 4px · `--radius-md` 6 · `--radius-lg` 8 · `--radius-xl` 12 ·
`--radius-2xl` 16 · `--radius-pill` 999

`sm`/`md`/`lg` are the admin's control corners. `xl`/`2xl` are storefront-only:
a card or a page section needs a bigger corner to read as the same roundness an
8px control has.

## Controls

One scale for every interactive control, so a Button, an Input and a Select of
the same size are the same height and line up in a row without anyone nudging a
padding. Controls set `min-height` and centre their content instead of deriving
a vertical padding, so a taller font or a larger icon never changes the box.

| Family | Steps |
|---|---|
| `--control-height-*` | `xs` 24 · `sm` 32 · `md` 40 · `lg` 48 |
| `--control-padding-x-*` | `xs` 4 · `sm` 10 · `md` 12 · `lg` 16 |
| `--button-padding-x-*` | `sm` 12 · `md` 16 · `lg` 24 — buttons carry more than fields at the same height |
| `--control-padding-y-*` | `sm` 6 · `md` 8 · `lg` 10 — for surfaces that grow (textarea) |
| `--control-gap-*` | `xs` 4 · `sm` 6 · `md` 8 · `lg` 8 |
| `--control-radius-*` | maps to `--radius-sm` / `sm` / `md` / `lg` |
| `--control-font-*` | maps to `--typo-body-*` |
| `--control-label-font-*` | maps to `--typo-label-*` |
| `--control-icon-*` | `xs` 14 · `sm` 16 · `md` 18 · `lg` 20 |

`xs` is for icon-only affordances that live *inside* another control. Nothing
that sits on its own uses it.

A sized control resolves the whole family into local vars once, so a variant
only ever picks colours and a size only ever picks geometry:

```css
.button[data-size="md"] {
  --button-height: var(--control-height-md);
  --button-padding-x: var(--button-padding-x-md);
  --button-font: var(--control-label-font-md);
}
```

## Field

| Token | Use |
|---|---|
| `--field-gap` | Label-to-control and control-to-message spacing. |
| `--field-message-height` | Reserved whether or not there is a message, so a field does not resize when an error appears and neighbouring fields stay aligned. |

## Storefront layout

| Token | Value |
|---|---|
| `--header-height` | `64px` |
| `--page-max-width` | `1280px` |
| `--page-padding-x` | `var(--space-6)` |

## Bridge scale

The `--typo-*` shorthands are the system, and anything that can take a whole
`font:` should. These loose steps are for the places that can only set one axis
— a heading that inherits its weight, a badge that only needs a size. **Every
value is a step of the type scale above, never a new number.**

- `--font-size-xs` 12 · `sm` 14 · `base` 16 · `md` 18 · `lg` 20 · `xl` 24 ·
  `2xl` 30 · `3xl` 36 · `4xl` 44 · `5xl` 56
- `--font-weight-regular` 400 · `medium` 500 · `semibold` 600 · `bold` 700
- `--line-height-tight` 1.15 · `snug` 1.3 · `normal` 1.5 · `relaxed` 1.6
- `--letter-spacing-tight` −0.02em · `normal` 0 · `wide` 0.04em · `wider` 0.08em

The system tracks at 0. `wide`/`wider` survive for the one thing that still
earns letter-spacing: an uppercase overline.
