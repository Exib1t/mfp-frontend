import type { Product, ProductVariant } from "@/entities/products/types";

const NOW = "2026-01-01T00:00:00.000Z";

type VariantSeed = Pick<ProductVariant, "id" | "label" | "stock"> &
  Partial<ProductVariant>;

function makeVariant(seed: VariantSeed, fallbackPrice: number): ProductVariant {
  return {
    sku: null,
    is_default: false,
    sort_order: 0,
    price: fallbackPrice,
    price_override: null,
    effective_price: fallbackPrice,
    is_active: true,
    sale_active: false,
    option_values: [],
    image_ids: [],
    ...seed,
  };
}

type ProductSeed = Pick<Product, "id" | "name" | "slug" | "price"> &
  Partial<Product> & { variantSeeds?: VariantSeed[] };

/** Fills the long tail of `ProductDto` so showcase samples stay readable. */
function makeProduct({ variantSeeds = [], ...seed }: ProductSeed): Product {
  const effectivePrice = seed.effective_price ?? seed.sale_price ?? seed.price;

  return {
    sku: null,
    short_description: null,
    description: null,
    status: "in_stock",
    is_featured: false,
    is_published: true,
    sale_price: null,
    sale_active: false,
    effective_price: effectivePrice,
    price_range: { min: effectivePrice, max: effectivePrice },
    stock: 0,
    category: { id: 1, name: "Одяг", slug: "odyag", deleted_at: null },
    options: [],
    attributes: [],
    images: [],
    meta_title: null,
    meta_description: null,
    created_at: NOW,
    updated_at: NOW,
    deleted_at: null,
    ...seed,
    variants: variantSeeds.map((variant) =>
      makeVariant(variant, effectivePrice),
    ),
  };
}

/** Backend-shaped samples for the component showcase (no network). */
export const SAMPLE_PRODUCTS: Product[] = [
  makeProduct({
    id: 1,
    name: "Сукня вишита «Калина»",
    slug: "suknya-vyshyta-kalyna",
    short_description: "Ніжна вишита сукня з натурального льону.",
    price: 1200,
    is_featured: true,
    stock: 3,
    options: [
      {
        id: 10,
        name: "Колір",
        sort_order: 0,
        values: [
          {
            id: 100,
            label: "Молочний",
            value: "molochnyi",
            color_hex: "#dec395",
            image_url: null,
            sort_order: 0,
          },
          {
            id: 101,
            label: "Шавлія",
            value: "shavliia",
            color_hex: "#9caf88",
            image_url: null,
            sort_order: 1,
          },
        ],
      },
    ],
    variantSeeds: [
      { id: 1, label: "Білий / M", stock: 5, is_default: true },
      { id: 2, label: "Шавлія / L", stock: 2, price: 1350 },
    ],
  }),
  makeProduct({
    id: 2,
    name: "Вишиванка «Дуб»",
    slug: "vyshyvanka-dub",
    short_description: "Класична вишиванка з орнаментом «Дуб».",
    price: 1800,
    sale_price: 1600,
    sale_active: true,
    status: "made_to_order",
    price_range: { min: 1600, max: 2100 },
    variantSeeds: [{ id: 3, label: "Синій / L", stock: 3, is_default: true }],
  }),
  makeProduct({
    id: 3,
    name: "Вігвам «Молочний»",
    slug: "vihvam-molochnyi",
    short_description: "Розпродано — картка в стані «немає в наявності».",
    price: 4000,
    status: "out_of_stock",
  }),
];
