import { z } from "zod";
import {
  codeField,
  optionalText,
  requiredNumber,
} from "@/lib/forms/schema-fields";

export const ATTRIBUTE_TYPES = [
  "text",
  "richtext",
  "number",
  "boolean",
  "select",
  "multiselect",
  "color",
  "image",
  "url",
  "date",
] as const;

export const AttributeFormSchema = z.object({
  name: z.string().trim().min(1, { error: "Вкажіть назву" }),
  code: codeField("Вкажіть код"),
  type: z.enum(ATTRIBUTE_TYPES),
  unit: optionalText,
  group_name: optionalText,
  is_filterable: z.boolean(),
  is_visible: z.boolean(),
  sort_order: requiredNumber.pipe(z.number().int().nonnegative()),
});

export const AttributeOptionFormSchema = z.object({
  label: z.string().trim().min(1, { error: "Вкажіть підпис" }),
  value: z.string().trim().min(1, { error: "Вкажіть значення" }),
  color_hex: z
    .union([z.string(), z.null()])
    .transform((value) => (value?.trim() ? value.trim() : null))
    .pipe(
      z
        .string()
        .regex(/^#[0-9a-fA-F]{6}$/, { error: "Очікується колір #rrggbb" })
        .nullable(),
    ),
  image_url: optionalText,
});
