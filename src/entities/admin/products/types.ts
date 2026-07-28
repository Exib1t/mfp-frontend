import type { components, operations } from "@/lib/api/v1";

export type AdminProduct = components["schemas"]["ProductDto"];
export type AdminProductOption = components["schemas"]["ProductOptionDto"];
export type AdminProductVariant = components["schemas"]["ProductVariantDto"];

export type CreateProductPayload = components["schemas"]["CreateProductDto"];
export type UpdateProductPayload = components["schemas"]["UpdateProductDto"];
export type CreateOptionPayload = components["schemas"]["CreateOptionDto"];
export type UpdateOptionPayload = components["schemas"]["UpdateOptionDto"];
export type CreateOptionValuePayload =
  components["schemas"]["CreateOptionValueDto"];
export type UpdateOptionValuePayload =
  components["schemas"]["UpdateOptionValueDto"];
export type CreateVariantPayload = components["schemas"]["CreateVariantDto"];
export type UpdateVariantPayload = components["schemas"]["UpdateVariantDto"];
export type SetProductAttributesPayload =
  components["schemas"]["SetProductAttributesDto"];

export type AdminProductsQuery = NonNullable<
  operations["ProductsAdminController_findAll_v1"]["parameters"]["query"]
>;
