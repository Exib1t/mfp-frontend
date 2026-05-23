# Button

**File:** `src/components/controls/Button/Button.tsx`

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"primary" \| "secondary" \| "ghost" \| "link"` | `"primary"` | Visual style |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size |
| `as` | `HtmlTag` | `"button"` | Override tag (e.g. `"a"` for link buttons) |
| `loading` | `boolean` | `false` | Shows spinner, disables interaction |
| `disabled` | `boolean` | `false` | Native disabled |
| `fullWidth` | `boolean` | `false` | `width: 100%` |
| `className` | `string` | — | Extension |

All native HTML attributes of rendered element also accepted.

## Variants

| `variant` | Use case |
|---|---|
| `primary` | Main CTA — "Додати в кошик", "Оформити замовлення" |
| `secondary` | Secondary action — "Продовжити покупки" |
| `ghost` | Tertiary, low emphasis — filters, icon buttons |
| `link` | Looks like a text link, no background |

## Sizes

| `size` | Height | Font | Padding |
|---|---|---|---|
| `sm` | 32px | sm | 0 12px |
| `md` | 44px | base | 0 20px |
| `lg` | 52px | md | 0 28px |

## Boolean modifiers (CSS)

- `-loading` — spinner replaces or overlays text, pointer-events none
- `-disabled` — reduced opacity, pointer-events none (in addition to native disabled)
- `-full-width` — 100% width

## DOM output

```html
<button class="button" data-variant="primary" data-size="md">
  Додати в кошик
</button>

<!-- loading state -->
<button class="button -loading" data-variant="primary" data-size="md" disabled>
  <span class="button_spinner" />
  <span class="button_label">Додати в кошик</span>
</button>

<!-- as link -->
<a class="button" data-variant="secondary" data-size="md" href="/products">
  До каталогу
</a>
```

## Usage

```tsx
<Button>Додати в кошик</Button>
<Button variant="secondary" size="sm">Скасувати</Button>
<Button variant="ghost" size="sm">Фільтри</Button>
<Button variant="link" as="a" href="/products">До каталогу</Button>
<Button loading>Оформлення...</Button>
<Button fullWidth>Підтвердити замовлення</Button>
```

## Notes

- `loading` автоматично додає `disabled` атрибут
- Spinner — CSS анімація, без зовнішньої бібліотеки
- `as="a"` + `href` = семантично правильне посилання зі стилем кнопки
