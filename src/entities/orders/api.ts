import { $api } from "@/services/api/apiClient";

/** Create a guest order. Read the created order via `mutation.data?.data`. */
export function useCreateOrder() {
  return $api.useMutation("post", "/api/v1/orders");
}

/** Single order by id (public — the id acts as an access token). */
export function useOrder(id: number | undefined) {
  return $api.useQuery(
    "get",
    "/api/v1/orders/{id}",
    { params: { path: { id: id ?? 0 } } },
    { enabled: Boolean(id), select: (res) => res.data },
  );
}
