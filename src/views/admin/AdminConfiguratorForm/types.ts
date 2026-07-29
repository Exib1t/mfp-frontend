import type { UseFormReturn } from "react-hook-form";
import type { z } from "zod";
import type { ConfiguratorFormSchema } from "./schema";

export type ConfiguratorFormInput = z.input<typeof ConfiguratorFormSchema>;
export type ConfiguratorFormValues = z.output<typeof ConfiguratorFormSchema>;

export type ConfiguratorForm = UseFormReturn<
  ConfiguratorFormInput,
  unknown,
  ConfiguratorFormValues
>;
