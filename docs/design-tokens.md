# Design Tokens

All tokens live in `src/assets/styles/variables.css` as CSS custom properties.

## Colors

| Token | Value | Use |
|---|---|---|
| `--background` | `#ffffff` | Page background |
| `--background-variant` | `#e4dcd4` | Section background |
| `--foreground` | `#171717` | Default text |
| `--primary` | `#ba6200` | Brand accent |
| `--color-muted` | `#6b7280` | Secondary text |
| `--color-error` | `#dc2626` | Error states |
| `--color-success` | `#16a34a` | Success states |
| `--color-warning` | `#d97706` | Warning states |

## Font Family

| Token | Value |
|---|---|
| `--font-inter` | `"Inter", sans-serif` |

Inter loaded via `next/font/google` in `app/layout.tsx`.

## Font Sizes

| Token | rem | px |
|---|---|---|
| `--font-size-xs` | `0.75rem` | 12px |
| `--font-size-sm` | `0.875rem` | 14px |
| `--font-size-base` | `1rem` | 16px |
| `--font-size-md` | `1.125rem` | 18px |
| `--font-size-lg` | `1.25rem` | 20px |
| `--font-size-xl` | `1.5rem` | 24px |
| `--font-size-2xl` | `1.875rem` | 30px |
| `--font-size-3xl` | `2.25rem` | 36px |
| `--font-size-4xl` | `3rem` | 48px |
| `--font-size-5xl` | `3.75rem` | 60px |

## Font Weights

| Token | Value |
|---|---|
| `--font-weight-regular` | `400` |
| `--font-weight-medium` | `500` |
| `--font-weight-semibold` | `600` |
| `--font-weight-bold` | `700` |

## Line Heights

| Token | Value |
|---|---|
| `--line-height-tight` | `1.2` |
| `--line-height-snug` | `1.35` |
| `--line-height-normal` | `1.5` |
| `--line-height-relaxed` | `1.65` |

## Letter Spacing

| Token | Value |
|---|---|
| `--letter-spacing-tight` | `-0.02em` |
| `--letter-spacing-normal` | `0em` |
| `--letter-spacing-wide` | `0.05em` |
| `--letter-spacing-wider` | `0.1em` |
