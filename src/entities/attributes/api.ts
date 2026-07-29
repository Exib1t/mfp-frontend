import { $api } from "@/services/api/apiClient";

/** Attribute definitions, optionally scoped to a category. */
export function useAttributes(options: {
  categoryId?: number | null;
  filterableOnly?: boolean;
}) {
  const { categoryId, filterableOnly } = options;

  return $api.useQuery(
    "get",
    "/api/v1/attributes",
    {
      params: {
        query: {
          ...(categoryId ? { category_id: categoryId } : {}),
          ...(filterableOnly ? { is_filterable: true } : {}),
        },
      },
    },
    { select: (res) => res.data },
  );
}
