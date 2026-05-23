import { $api } from "@/services/api/apiClient";

export function useProducts() {
  return $api.useQuery("get", "/api/v1/products", { params: { query: {} } });
}
