import type { components } from "@/lib/api/v1";

export type AdminCategory = components["schemas"]["CategoryDto"];
export type CreateCategoryPayload = components["schemas"]["CreateCategoryDto"];
export type UpdateCategoryPayload = components["schemas"]["UpdateCategoryDto"];

/** A category plus its children, as rendered in the admin tree. */
export interface CategoryNode extends AdminCategory {
  children: CategoryNode[];
  depth: number;
}
