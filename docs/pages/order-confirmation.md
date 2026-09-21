# Order Confirmation Page

**URL:** `/orders/[id]`  
**File:** `src/pages/OrderPage/OrderPage.tsx` *(to be created)*

## Purpose

Confirm order was placed. Show order summary. Set expectations for next steps.

## Sections

### Success state
- ✓ icon + "Дякуємо за замовлення!"
- Order number
- "Ми надішлемо підтвердження на [email]"
- Expected delivery info

### Order summary
- Items + options
- Total paid / to pay
- Delivery address

### Next steps block
- "Статус замовлення надійде на [phone] через SMS" *(or email)*
- Contact info if questions: phone / telegram

### CTA
- "Повернутись до каталогу" → `/products`

## Error / not found state

If `orderId` is invalid, or this tab did not place that order:
- "Замовлення не знайдено"
- CTA → `/`

## Data

- There is **no** `GET /orders/[id]`: order ids are sequential, so a public
  read would expose every customer's contacts.
- The order comes from the `POST /orders` response. `CartPage` stores it with
  `saveConfirmedOrder` (session storage) before navigating here, and
  `OrderPage` reads it back with `readConfirmedOrder(id)` — so a reload in the
  same tab still works, while a different tab or device sees the not-found state.

## Notes

- No auth required
- Future: account linking — "Увійти щоб відстежувати замовлення"
