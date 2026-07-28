import { z } from "zod";

/**
 * Inputs hand back strings, the API wants numbers and nulls — so the schema
 * transforms. That makes input and output types differ; both are exported from
 * `./types` and the form is generic over the pair.
 */
const optionalText = z.union([z.string(), z.null()]).transform((value) => {
  const trimmed = value?.trim() ?? "";
  return trimmed === "" ? null : trimmed;
});

const optionalMoney = z
  .union([z.string(), z.number(), z.null()])
  .transform((value) => {
    if (value === null || value === "") return null;
    const parsed = Number(value);
    return Number.isNaN(parsed) ? null : parsed;
  });

const requiredNumber = z
  .union([z.string(), z.number()])
  .transform((value) => Number(value));

export const ProductFormSchema = z
  .object({
    name: z.string().trim().min(1, { error: "Вкажіть назву" }),
    slug: z
      .string()
      .trim()
      .min(1, { error: "Вкажіть slug" })
      .regex(/^[a-z0-9-]+$/, {
        error: "Лише малі латинські літери, цифри та дефіс",
      }),
    sku: optionalText,
    brand: optionalText,
    short_description: optionalText,
    description: optionalText,
    category_id: requiredNumber.pipe(
      z.number().int().positive({ error: "Оберіть категорію" }),
    ),
    status: z.enum(["in_stock", "made_to_order", "out_of_stock"]),
    price: requiredNumber.pipe(
      z.number().nonnegative({ error: "Ціна не може бути відʼємною" }),
    ),
    compare_at_price: optionalMoney,
    sale_price: optionalMoney,
    sale_starts_at: optionalText,
    sale_ends_at: optionalText,
    stock: requiredNumber.pipe(z.number().int().nonnegative()),
    is_featured: z.boolean(),
    is_published: z.boolean(),
    meta_title: optionalText,
    meta_description: optionalText,
  })
  .refine(
    (values) => values.sale_price === null || values.sale_price <= values.price,
    {
      error: "Акційна ціна не може бути більшою за основну",
      path: ["sale_price"],
    },
  );
