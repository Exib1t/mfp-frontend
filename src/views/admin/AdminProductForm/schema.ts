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
    short_description: optionalText,
    description: optionalText,
    category_id: requiredNumber.pipe(
      z.number().int().positive({ error: "Оберіть категорію" }),
    ),
    status: z.enum(["in_stock", "made_to_order", "out_of_stock"]),
    price: requiredNumber.pipe(
      z.number().nonnegative({ error: "Ціна не може бути відʼємною" }),
    ),
    sale_price: optionalMoney,
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
