"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { $adminApi } from "@/services/api/adminClient";
import type { ReviewStatus } from "./types";

const LIST_PATH = "/api/v1/admin/reviews";
const DETAIL_PATH = "/api/v1/admin/reviews/{id}";
const STATUS_PATH = "/api/v1/admin/reviews/{id}/status";

export function useInvalidateReviews() {
  const queryClient = useQueryClient();

  return useCallback(() => {
    void queryClient.invalidateQueries({ queryKey: ["get", LIST_PATH] });
    void queryClient.invalidateQueries({ queryKey: ["get", DETAIL_PATH] });
  }, [queryClient]);
}

interface ReviewsQuery {
  status?: ReviewStatus;
  product_id?: number;
  page?: number;
  limit?: number;
}

export function useAdminReviews(query: ReviewsQuery = {}) {
  return $adminApi.useQuery(
    "get",
    LIST_PATH,
    { params: { query } },
    { select: (res) => res.data },
  );
}

export function useUpdateReviewStatus() {
  const invalidate = useInvalidateReviews();
  return $adminApi.useMutation("patch", STATUS_PATH, { onSuccess: invalidate });
}

export function useDeleteReview() {
  const invalidate = useInvalidateReviews();
  return $adminApi.useMutation("delete", DETAIL_PATH, {
    onSuccess: invalidate,
  });
}
