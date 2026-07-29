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
    compare_at_price: null,
    effective_price: fallbackPrice,
    sale_active: false,
    option_values: [],
    image_ids: [],
    attributes: [],
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
    brand: null,
    short_description: null,
    description: null,
    status: "in_stock",
    is_featured: false,
    currency: "UAH",
    compare_at_price: null,
    sale_price: null,
    sale_active: false,
    sale_starts_at: null,
    sale_ends_at: null,
    effective_price: effectivePrice,
    price_range: { min: effectivePrice, max: effectivePrice },
    stock: 0,
    category: { id: 1, name: "Одяг", slug: "odyag" },
    configurator: null,
    options: [],
    attributes: [],
    specs: {},
    layout: null,
    images: [],
    meta_title: null,
    meta_description: null,
    published_at: NOW,
    created_at: NOW,
    updated_at: NOW,
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
    variantSeeds: [{ id: 3, label: "Синій / L", stock: 3, is_default: true }],
  }),
];
