# Product — Data Model

**File:** `src/entities/products/models.ts`  
**Mocks:** `src/entities/products/mocks.ts`  
**Queries:** `src/entities/products/queries.ts`

## Type

```ts
type ProductCategory = "wigwam" | "pillows" | "basket" | "rug" | "set" | "accessory";
type ProductBadge    = "new" | "sale" | "bestseller" | "limited";

type ProductImage = {
  src: string;
  alt: string;
};

type Product = {
  id:          string;
  slug:        string;           // URL: /products/[slug]
  name:        string;
  description: string;
  price:       number;           // UAH, base price
  salePrice?:  number;           // if set → shown instead of price, price struck-through
  category:    ProductCategory;
  badges?:     ProductBadge[];   // shown on card: "Новинка", "−20%", etc.
  images:      ProductImage[];   // [0] = main/cover image
  inStock:     boolean;
  featured?:   boolean;          // shown on Home → featured products section
};
```

## Categories

| Value | Label UA |
|---|---|
| `wigwam` | Вігвами |
| `pillows` | Подушки |
| `basket` | Корзини |
| `rug` | Килимки |
| `set` | Комплекти |
| `accessory` | Аксесуари |

## Badges

| Value | Displayed as | Color |
|---|---|---|
| `new` | Новинка | primary |
| `sale` | Знижка | error |
| `bestseller` | Хіт | warning |
| `limited` | Останні | warning |

## Price display rules

- `salePrice` present → show `salePrice` as main, `price` struck-through
- Badge `"sale"` → auto-compute label `"−N%"` from `price` / `salePrice`
- Currency: `UAH` / `₴`, format: `1 200 ₴`

## Mock data

6 products for development:

| # | Name | Category | Badges | Featured |
|---|---|---|---|---|
| 1 | Вігвам "Лісова фея" | wigwam | new | ✓ |
| 2 | Вігвам "Бохо крем" | wigwam | bestseller | ✓ |
| 3 | Вігвам "Рожевий сон" | wigwam | sale | ✓ |
| 4 | Набір подушок "Бохо" | pillows | new | ✓ |
| 5 | Корзина плетена | basket | — | — |
| 6 | Комплект "Лісова казка" | set | limited | ✓ |

Images: placeholder via `https://picsum.photos/seed/[id]/600/700`

## Notes

- `id` = nanoid or simple string for mocks
- Future: type extended with `options` for configurator (see `docs/features/configurator.md`)
- API contract: `GET /products` returns `Product[]`, `GET /products/[slug]` returns `Product`
