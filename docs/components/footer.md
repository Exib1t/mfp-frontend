# Footer

**File:** `src/components/common/Footer/Footer.tsx`

## Purpose

Global footer. Present on every page. Navigation, contacts, social links, copyright.

## Layout

3 columns on desktop, stacked on mobile.

```
[ Brand + tagline ]  [ Navigation ]  [ Contacts + Social ]
─────────────────────────────────────────────────────────
© 2025 My Fairy Place. All rights reserved.
```

## Sections

### Column 1 — Brand
- Logo
- Short tagline (1–2 lines)

### Column 2 — Navigation
Links:
- Каталог → `/products`
- Про нас → `/about`
- Доставка і оплата → `/delivery`
- Блог → `/blog`
- Контакти → `/contacts`

### Column 3 — Contacts & Social
- Phone (tel: link)
- Email (mailto: link)
- Instagram icon link
- Telegram icon link
- Facebook icon link *(optional)*

### Bottom bar
- `© 2025 My Fairy Place`
- Optional: Політика конфіденційності link

## Props

None — fully static component. Content hardcoded or from config.

## DOM structure

```html
<footer class="footer">
  <div class="footer_inner">
    <div class="footer_brand">...</div>
    <nav class="footer_nav">...</nav>
    <div class="footer_contacts">...</div>
  </div>
  <div class="footer_bottom">...</div>
</footer>
```

## Notes

- Uses `NavLink` component for nav links
- Social icons — SVG inline або icon component (обговорити)
- No dynamic data needed
- Background: `--background-variant` або окремий dark варіант — вирішити при реалізації
