# CartDrawer

**File:** `src/components/common/CartDrawer/CartDrawer.tsx`

Slide-in side panel (right edge) showing cart contents without navigating away from
the current page. Opened from the header cart button.

## Behaviour

- Fixed overlay + panel, `z-index: 200` (above header `100`, below toaster `1000`).
- Open state lives in `CartDrawerContext` (`useCartDrawer`): `isOpen / open / close / toggle`.
- Header cart button (`HeaderRight`) toggles it; badge count unchanged.
- Closes on: overlay click, close button, `Escape`, and any route change (`usePathname`).
- Locks `body` scroll while open.
- Reuses `CartItemRow` + `ConfiguratorCartItemRow` from `CartPage/parts` — same
  `cart-page_item` markup, tightened to a `80px 1fr auto` grid for the narrow panel.
- Empty state → `EmptyState` with "До каталогу" link.
- Footer: grand total + "Оформити замовлення" (→ `/cart`) + "Продовжити покупки" (close).

## State / providers

`CartDrawerProvider` sits inside `CartProvider` → `ConfiguratorCartProvider` in
`app/Providers.tsx`. `<CartDrawer />` is rendered once there, as a sibling of `children`.

## DOM output

```html
<div class="cart-drawer -open" aria-hidden="false">
  <button class="cart-drawer_overlay" aria-label="Закрити кошик"></button>
  <aside class="cart-drawer_panel" role="dialog" aria-modal="true" aria-label="Кошик">
    <header class="cart-drawer_head">…</header>
    <div class="cart-drawer_body">…</div>
    <footer class="cart-drawer_foot">…</footer>
  </aside>
</div>
```

## Notes

- No props — reads cart + drawer contexts directly.
- Panel width `min(440px, 100vw)`; transform-based slide, overlay fade.
