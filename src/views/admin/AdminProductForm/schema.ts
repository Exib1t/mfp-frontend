import { z } from "zod";
import {
  optionalMoney,
  optionalText,
  requiredNumber,
  slugField,
} from "@/lib/forms/schema-fields";

export const ProductFormSchema = z
  .object({
    name: z.string().trim().min(1, { error: "Вкажіть назву" }),
    slug: slugField("Вкажіть slug"),
    sku: optionalText,
    brand: optionalText,
    short_description: optionalText,
    description: optionalText,
    category_id: requiredNumber.pipe(
      z.number().int().positive({ error: "Оберіть категорію" }),
    ),
    /** null = the product is bought as-is, with no build step. */
    configurator_id: z
      .union([z.string(), z.number(), z.null()])
      .transform((value) =>
        value === null || value === "" ? null : Number(value),
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
