import type { components } from "@/lib/api/v1";

export type AdminReview = components["schemas"]["ReviewDto"];
export type ReviewStatus = AdminReview["status"];

export const REVIEW_STATUS_LABELS: Record<ReviewStatus, string> = {
  pending: "На модерації",
  approved: "Опубліковані",
  rejected: "Відхилені",
};

export const REVIEW_STATUS_VARIANTS: Record<
  ReviewStatus,
  "default" | "primary" | "success" | "warning" | "error"
> = {
  pending: "warning",
  approved: "success",
  rejected: "error",
};

/** Tab order puts the queue that needs work first. */
export const REVIEW_STATUS_ORDER: ReviewStatus[] = [
  "pending",
  "approved",
  "rejected",
];
