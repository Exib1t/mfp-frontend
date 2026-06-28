import { $api } from "@/services/api/apiClient";

/** Approved reviews for a product (public). Unwraps the envelope. */
export function useProductReviews(productId: number | undefined) {
  return $api.useQuery(
    "get",
    "/api/v1/reviews/product/{productId}",
    { params: { path: { productId: productId ?? 0 } } },
    { enabled: Boolean(productId), select: (res) => res.data },
  );
}

/**
 * Submit a review (public). The review is created with `pending` status and
 * appears publicly only after moderation. Read the result via `mutation.data?.data`.
 */
export function useCreateReview() {
  return $api.useMutation("post", "/api/v1/reviews");
}
