import { $api } from "@/services/api/apiClient";

/** All categories (public), sorted by the backend. Unwraps the envelope. */
export function useCategories() {
  return $api.useQuery(
    "get",
    "/api/v1/categories",
    {},
    { select: (res) => res.data },
  );
}
