import { z } from "zod";
import {
  optionalText,
  requiredNumber,
  slugField,
} from "@/lib/forms/schema-fields";

export const ConfiguratorFormSchema = z.object({
  name: z.string().trim().min(1, { error: "Вкажіть назву" }),
  slug: slugField("Вкажіть slug"),
  description: optionalText,
  base_price: requiredNumber.pipe(
    z.number().nonnegative({ error: "Ціна не може бути відʼємною" }),
  ),
  is_active: z.boolean(),
});
