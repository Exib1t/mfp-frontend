# MobileMenu

**File:** `src/components/common/Header/parts/MobileMenu/MobileMenu.tsx`
**Base class:** `mobile-menu`

## Purpose

Carry the site's navigation on phones. Below 768px the header has room for the
logo and the cart and nothing else — at 375px the inline `NavBar` pushed the
cart button off-screen entirely, and `overflow-x: clip` on `body` hid it with
no scrollbar, so the cart was unreachable. `NavBar` is hidden at that width and
this burger takes over.

## Props

None. Renders its own trigger plus the panel; mounted inside `HeaderLeft`,
before the logo — the trigger sits on the same side the panel slides in from.

## Content

`MOBILE_NAV_ITEMS` (`src/config/navigation.config.ts`) — the header's own
destinations plus the footer's content pages, deduplicated. Delivery and
contacts are pre-purchase questions for made-to-order goods, so they belong one
tap away rather than a full page down.

## Behaviour

- Trigger is `display: none` above 768px; the panel wrapper is always mounted.
- Closed, the wrapper is `visibility: hidden`, which keeps every link out of
  the tab order (the same model as `CartDrawer`).
- Opens as `role="dialog" aria-modal="true"`: focus moves to the panel, Tab
  cycles inside it, Escape closes, body scroll is locked, and closing returns
  focus to the trigger.
- Closes on route change, on Escape, on the ✕, and on the overlay.
- `prefers-reduced-motion: reduce` drops the slide and fade.

## Related

- [nav-link.md](nav-link.md) — the rows rendered inside
- [cart-drawer.md](cart-drawer.md) — the overlay/panel pattern this mirrors
