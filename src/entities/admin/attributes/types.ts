import type { components } from "@/lib/api/v1";

export type AdminAttribute = components["schemas"]["AttributeDto"];
export type AdminAttributeOption = AdminAttribute["options"][number];
export type AttributeType = AdminAttribute["type"];

export type CreateAttributePayload =
  components["schemas"]["CreateAttributeDto"];
export type UpdateAttributePayload =
  components["schemas"]["UpdateAttributeDto"];
export type CreateAttributeOptionPayload =
  components["schemas"]["CreateAttributeOptionDto"];
export type SetCategoryAttributesPayload =
  components["schemas"]["SetCategoryAttributesDto"];

/** Attribute types whose value is one (or many) of `options`. */
export const OPTION_BACKED_TYPES: AttributeType[] = [
  "select",
  "multiselect",
  "color",
];

/** Types that may become a variation axis on a product. */
export const VARIANT_CAPABLE_TYPES: AttributeType[] = ["select", "color"];

export const ATTRIBUTE_TYPE_LABELS: Record<AttributeType, string> = {
  text: "Текст",
  number: "Число",
  boolean: "Так / Ні",
  select: "Вибір одного",
  multiselect: "Вибір кількох",
  color: "Колір",
};
