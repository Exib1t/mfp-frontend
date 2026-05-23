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

If `orderId` invalid or not found:
- "Замовлення не знайдено"
- CTA → `/`

## Data

- `GET /orders/[id]` — order details
- Page accessible without auth (order ID acts as token)

## Notes

- No auth required — order ID in URL is enough
- Future: account linking — "Увійти щоб відстежувати замовлення"
