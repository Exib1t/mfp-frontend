# Cart Page

**URL:** `/cart`  
**File:** `src/pages/CartPage/CartPage.tsx` *(to be created)*

## Purpose

Review selected items, adjust quantities, proceed to checkout.

## Layout

Single column or two-column on desktop (items left, summary right).

## Sections

### Cart items list
Each item:
- Photo (with selected options reflected if possible)
- Name + selected options summary (кремовий, з подушками, з прапорцями)
- Unit price
- Quantity stepper (+/−)
- Remove button
- Subtotal per line

### Order summary (sticky on desktop)
- Subtotal
- Shipping — "розраховується при оформленні" or estimated
- Total
- "Оформити замовлення" → `/checkout`
- "Продовжити покупки" → `/products`

### Empty state
- Illustration + text + CTA → `/products`

## Cart state

- Stored in `localStorage` (no auth required)
- Cart item = `{ productId, slug, name, photo, selectedOptions, quantity, unitPrice }`
- Selected options stored so they can be shown in cart and sent with order

## Notes

- No login required at this step
- Cart persists across sessions via localStorage
- Mini-cart (drawer/popover in header) shares same state
