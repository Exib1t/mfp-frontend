"use client";

import { useState } from "react";
import { useToast } from "@/components/controls/Toast/ToastProvider";
import {
  useAdminReviews,
  useDeleteReview,
  useUpdateReviewStatus,
} from "@/entities/admin/reviews/api";
import type { AdminReview, ReviewStatus } from "@/entities/admin/reviews/types";

const PAGE_SIZE = 50;

/** Moderation queue: one status at a time, approve/reject/delete in place. */
export function useReviewsQueue() {
  const { toast } = useToast();
  const [status, setStatus] = useState<ReviewStatus>("pending");
  const [pendingDelete, setPendingDelete] = useState<AdminReview | null>(null);

  const {
    data: reviews = [],
    isLoading,
    isError,
  } = useAdminReviews({ status, limit: PAGE_SIZE });

  const updateStatus = useUpdateReviewStatus();
  const deleteReview = useDeleteReview();

  const moderate = (review: AdminReview, next: ReviewStatus) =>
    updateStatus.mutate(
      { params: { path: { id: review.id } }, body: { status: next } },
      {
        onSuccess: () =>
          toast(
            next === "approved" ? "Відгук опубліковано" : "Відгук відхилено",
            "success",
          ),
        onError: () => toast("Не вдалося змінити статус", "error"),
      },
    );

  const confirmDelete = () => {
    if (!pendingDelete) return;

    deleteReview.mutate(
      { params: { path: { id: pendingDelete.id } } },
      {
        onSuccess: () => toast("Відгук видалено", "info"),
        onError: () => toast("Не вдалося видалити відгук", "error"),
        onSettled: () => setPendingDelete(null),
      },
    );
  };

  return {
    reviews,
    status,
    setStatus,
    isLoading,
    isError,
    isModerating: updateStatus.isPending,
    moderate,
    pendingDelete,
    isDeleting: deleteReview.isPending,
    requestDelete: setPendingDelete,
    cancelDelete: () => setPendingDelete(null),
    confirmDelete,
  };
}
