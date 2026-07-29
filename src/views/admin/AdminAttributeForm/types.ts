import type { UseFormReturn } from "react-hook-form";
import type { z } from "zod";
import type { AttributeFormSchema, AttributeOptionFormSchema } from "./schema";

export type AttributeFormInput = z.input<typeof AttributeFormSchema>;
export type AttributeFormValues = z.output<typeof AttributeFormSchema>;

export type AttributeForm = UseFormReturn<
  AttributeFormInput,
  unknown,
  AttributeFormValues
>;

export type AttributeOptionInput = z.input<typeof AttributeOptionFormSchema>;
export type AttributeOptionValues = z.output<typeof AttributeOptionFormSchema>;

export const EMPTY_OPTION_DRAFT: AttributeOptionInput = {
  label: "",
  value: "",
  color_hex: null,
  image_url: null,
};
