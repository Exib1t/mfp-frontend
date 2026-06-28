# Toast

**Files:** `src/components/controls/Toast/ToastProvider.tsx`, `Toast.styles.scss`
**Base class:** `toast` (item), `toaster` (container)

## Purpose

Transient feedback for user actions (add to cart, order errors, review sent).
App-wide; mounted once via `ToastProvider` in `app/Providers.tsx`.

## API

```ts
const { toast } = useToast();
toast("Додано в кошик");              // variant defaults to "info"
toast("Замовлення оформлено", "success");
toast("Сталася помилка", "error");
```

- `useToast()` must be used under `<ToastProvider>`.
- Each toast auto-dismisses after ~3.5s; also closable via the × button.
- Variants: `success` | `error` | `info` (drives `data-variant` color).

## Behaviour

- Stacked top-right (top-center on mobile), newest on top, max ~4 visible.
- Non-blocking, `aria-live="polite"` region for screen readers.
