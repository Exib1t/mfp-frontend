import type { components, operations } from "@/lib/api/v1";

export type AdminProduct = components["schemas"]["ProductDto"];
export type AdminProductOption = AdminProduct["options"][number];
export type AdminProductVariant = AdminProduct["variants"][number];

export type CreateProductPayload = components["schemas"]["CreateProductDto"];
export type UpdateProductPayload = components["schemas"]["UpdateProductDto"];
export type SetProductAttributesPayload =
  components["schemas"]["SetProductAttributesDto"];

export type AdminProductsQuery = NonNullable<
  operations["ProductsAdminController_findAll_v1"]["parameters"]["query"]
>;
