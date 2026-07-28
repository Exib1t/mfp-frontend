import type { UseFormReturn } from "react-hook-form";
import type { z } from "zod";
import type { ProductFormSchema } from "./schema";

/** What the inputs hold (strings, possibly empty). */
export type ProductFormInput = z.input<typeof ProductFormSchema>;
/** What validation produces and the API receives. */
export type ProductFormValues = z.output<typeof ProductFormSchema>;

export type ProductForm = UseFormReturn<
  ProductFormInput,
  unknown,
  ProductFormValues
>;

export type ProductFormTab =
  | "general"
  | "pricing"
  | "options"
  | "variants"
  | "attributes"
  | "media"
  | "seo";
