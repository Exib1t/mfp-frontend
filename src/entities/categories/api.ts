import { useQueryClient } from "@tanstack/react-query";
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

/** All categories (admin — same fields, no filtering). */
export function useAdminCategories() {
  return $api.useQuery(
    "get",
    "/api/v1/admin/categories",
    {},
    { select: (res) => res.data },
  );
}

function useInvalidateAdminCategories() {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({
      queryKey: $api.queryOptions("get", "/api/v1/admin/categories").queryKey,
    });
}

export function useCreateCategory() {
  const invalidate = useInvalidateAdminCategories();
  return $api.useMutation("post", "/api/v1/admin/categories", {
    onSuccess: invalidate,
  });
}

export function useUpdateCategory() {
  const invalidate = useInvalidateAdminCategories();
  return $api.useMutation("patch", "/api/v1/admin/categories/{id}", {
    onSuccess: invalidate,
  });
}

export function useDeleteCategory() {
  const invalidate = useInvalidateAdminCategories();
  return $api.useMutation("delete", "/api/v1/admin/categories/{id}", {
    onSuccess: invalidate,
  });
}
