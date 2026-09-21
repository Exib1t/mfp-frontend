import { $api } from "@/services/api/apiClient";

/**
 * Create a guest order. Read the created order via `mutation.data?.data`.
 *
 * The API has no public read of an order (ids are sequential, so one would
 * leak every customer's contacts) — the confirmation page renders this
 * response, handed over through `saveConfirmedOrder`.
 */
export function useCreateOrder() {
  return $api.useMutation("post", "/api/v1/orders");
}
