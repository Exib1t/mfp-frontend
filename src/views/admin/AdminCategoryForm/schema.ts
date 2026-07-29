import { z } from "zod";

const optionalText = z.union([z.string(), z.null()]).transform((value) => {
  const trimmed = value?.trim() ?? "";
  return trimmed === "" ? null : trimmed;
});

export const CategoryFormSchema = z.object({
  name: z.string().trim().min(1, { error: "Вкажіть назву" }),
  slug: z
    .string()
    .trim()
    .min(1, { error: "Вкажіть slug" })
    .regex(/^[a-z0-9-]+$/, {
      error: "Лише малі латинські літери, цифри та дефіс",
    }),
  description: optionalText,
  /** 0 in the picker means "root". */
  parent_id: z.union([z.string(), z.number(), z.null()]).transform((value) => {
    const parsed = Number(value ?? 0);
    return Number.isNaN(parsed) || parsed <= 0 ? null : parsed;
  }),
  image_url: optionalText,
  meta_title: optionalText,
  meta_description: optionalText,
  sort_order: z
    .union([z.string(), z.number()])
    .transform((value) => Number(value))
    .pipe(z.number().int().nonnegative()),
});
