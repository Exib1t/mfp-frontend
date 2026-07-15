# Input

**File:** `src/components/controls/Input/Input.tsx`

## Purpose

Text field control. Replaces raw `<input className="..._input">` /
`<textarea className="..._textarea">` that was duplicated per-view in
CartPage (checkout form) and ProductReviews (review form) with its own
copy of the same visual styling.

## Props

Polymorphic — same pattern as `Button`/`Typography`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `as` | `"input" \| "textarea"` | `"input"` | Rendered tag |
| `className` | `string` | — | Extension |

All native attributes of the rendered element also accepted (`type`,
`value`, `onChange`, `placeholder`, `required`, `rows`, ...).

## DOM output

```html
<input class="input" type="email" placeholder="Email *" />
<textarea class="input" rows="4"></textarea>
```

## Usage

```tsx
<Input placeholder="Ім'я та прізвище *" value={form.guest_name} onChange={setField("guest_name")} required />
<Input type="email" placeholder="Email *" value={form.guest_email} onChange={setField("guest_email")} required />
<Input as="textarea" rows={2} placeholder="Коментар" value={form.notes} onChange={setField("notes")} />
```

## Implementation

```tsx
const BASE_CLASS = "input"; // defined before component function

className={cn(BASE_CLASS, className)}
```

## Notes

- One visual style for both tags — `resize: vertical` applies only to the `textarea` case via `&:is(textarea)` in CSS, no extra prop needed.
- No built-in label/error/validation UI — forms compose their own `<label>` wrapper around it (see CartPage/ProductReviews checkout forms).
- Forwards `ref` to the underlying `input`/`textarea` element — required so `react-hook-form`'s `register()` can attach to it. The generic `as` inference is preserved across `forwardRef` via a manual re-cast (see implementation).
