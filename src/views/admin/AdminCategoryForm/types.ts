import type { UseFormReturn } from "react-hook-form";
import type { z } from "zod";
import type { CategoryFormSchema } from "./schema";

export type CategoryFormInput = z.input<typeof CategoryFormSchema>;
export type CategoryFormValues = z.output<typeof CategoryFormSchema>;

export type CategoryForm = UseFormReturn<
  CategoryFormInput,
  unknown,
  CategoryFormValues
>;
