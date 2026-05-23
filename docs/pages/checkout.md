# Checkout Page

**URL:** `/checkout`  
**File:** `src/pages/CheckoutPage/CheckoutPage.tsx` *(to be created)*

## Purpose

Collect contact info + delivery details + place order. No registration required.

## Flow

```
/cart → /checkout → POST /orders → /orders/[id]
```

## Sections

### Step 1 — Contact
- First name + Last name
- Phone (required)
- Email (required)
- Checkbox: "Зберегти дані для наступного разу" *(localStorage)*

### Step 2 — Delivery
- Delivery method:
  - Нова Пошта — відділення (city autocomplete + branch select)
  - Нова Пошта — кур'єр (city + address)
  - Укрпошта (city + branch)
  - Самовивіз *(if applicable)*
- Estimated delivery date (if available from API)

### Step 3 — Payment
- Оплата на картку (реквізити після підтвердження)
- Оплата при отриманні (накладений платіж) — if applicable
- LiqPay / Monobank acquiring *(future)*

### Order summary (always visible)
- Items list (collapsed by default on mobile)
- Total price

### Place order button
- "Підтвердити замовлення"
- Sends: contact info + delivery + cart items + selected options

## Validation

- Phone: Ukrainian format (+380...)
- Email: standard format
- All required fields before proceeding to next step

## After submit

- `POST /orders` returns `{ orderId }`
- Redirect to `/orders/[id]`
- Cart cleared from localStorage
- Confirmation email sent to provided email

## Notes

- No auth / no registration — guest only for now
- Contact data optionally saved to localStorage for repeat customers
- Account feature deferred — when implemented, order will be linkable to account via phone/email
