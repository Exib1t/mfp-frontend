# Modal

**File:** `src/components/controls/Modal/Modal.tsx`

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | — | Controls mount/render (unmounts when `false`) |
| `onClose` | `() => void` | — | Called on overlay click, `Escape`, and the close button |
| `title` | `string` | — | Header text |
| `className` | `string` | — | Extension for the dialog box |
| `children` | `ReactNode` | — | Body content (forms, confirmation text, …) |

## DOM output

```html
<div class="modal_overlay">
  <div class="modal" role="dialog" aria-modal="true" aria-label="...">
    <div class="modal_header">
      <p class="typography" data-variant="h4" data-weight="semibold">Title</p>
      <button class="icon-button" aria-label="Закрити">...</button>
    </div>
    <div class="modal_content"><!-- children --></div>
  </div>
</div>
```

## Usage

```tsx
<Modal open={isOpen} onClose={() => setOpen(false)} title="Додати категорію">
  <CategoryForm onSubmit={handleSubmit} />
</Modal>
```

## Implementation

No `createPortal` — same approach as `ToastProvider` (`src/components/controls/Toast/ToastProvider.tsx`), just `position: fixed` on the overlay. `z-index: 500` — above `Header`/`AdminShell` topbar (100), below `Toast` (1000) so toasts stay visible over an open modal.

## Notes

- Renders `null` when `open` is `false` — no exit animation.
- Closes on overlay click, `Escape` key, and the header close button. Clicking inside the dialog box does not close it (`stopPropagation`).
- No focus trap — acceptable for the admin-only surface this is used on; revisit if reused in the public storefront.
