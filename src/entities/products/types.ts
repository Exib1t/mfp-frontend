import type { components, operations } from "@/lib/api/v1";

export type Product = components["schemas"]["ProductDto"];
export type ProductVariant = Product["variants"][number];
export type ProductImage = Product["images"][number];
export type ProductOption = Product["options"][number];
export type ProductOptionValue = ProductOption["values"][number];
export type ProductAttribute = Product["attributes"][number];
export type ProductOptionValueRef = ProductVariant["option_values"][number];
export type ProductStatus = Product["status"];
export type ProductPriceRange = Product["price_range"];

/** Derived from the generated spec so filters can never drift from the API. */
export type ProductsQuery = NonNullable<
  operations["ProductsController_findAll_v1"]["parameters"]["query"]
>;

export type ProductSort = NonNullable<ProductsQuery["sort"]>;

export type ProductsPage =
  components["schemas"]["ApiPaginatedResponseOfProductDto"]["data"];
