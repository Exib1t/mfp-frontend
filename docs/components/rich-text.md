# RichText

**File:** `src/components/controls/RichText/RichText.tsx`

## Purpose

Render admin-authored HTML — `product.description` and anything else written in
the admin's rich-text editor — as formatted markup instead of raw tags.

## Props

| Prop | Type | Description |
|---|---|---|
| `html` | `string` | HTML as stored by the API |
| `className` | `string` | Optional extension |

## Sanitizing

The markup is admin-authored, not user-authored, but it still goes through
`dompurify` before it reaches the DOM — an admin account is one compromise away
from stored XSS on every product page. The allowlist is exactly what the editor
can produce:

```
p br strong b em i u s ul ol li h2 h3 h4 blockquote a
href target rel  (on <a> only)
```

Anything else — `script`, `style`, `iframe`, `on*` handlers, inline styles — is
dropped. Links get `rel="noopener noreferrer"` added.

Sanitizing needs a DOM, so it happens in the browser and the component renders
nothing on the server. Product data is fetched client-side, so there is no
flash: the block appears with the rest of the product.

## Rendering

Renders one `<div class="rich-text">` with the sanitized markup inside.
Typography comes from the block's own descendant rules — the children are raw
tags, not `Typography` components, so the styles hang off `.rich-text p`,
`.rich-text h3`, `.rich-text ul` and so on. That is the one place in the project
where element selectors are allowed, because the markup is not ours to class.

## Empty input

`html` that is empty, or that sanitizes down to nothing (e.g. `<p></p>`), renders
`null` — no empty box, no heading above a blank space.
