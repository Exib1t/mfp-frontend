"use client";

import Link from "next/link";
import Badge from "@/components/controls/Badge/Badge";
import Button from "@/components/controls/Button/Button";
import RatingStars from "@/components/controls/RatingStars/RatingStars";
import Typography from "@/components/controls/Typography/Typography";
import {
  type AdminReview,
  REVIEW_STATUS_LABELS,
  REVIEW_STATUS_VARIANTS,
  type ReviewStatus,
} from "@/entities/admin/reviews/types";
import { formatDateTime } from "@/lib/utils/formatDate";

interface ReviewCardProps {
  review: AdminReview;
  isBusy: boolean;
  onModerate: (status: ReviewStatus) => void;
  onDelete: () => void;
}

const BASE_CLASS = "admin-reviews";

function ReviewCard({ review, isBusy, onModerate, onDelete }: ReviewCardProps) {
  return (
    <article className={`${BASE_CLASS}_card`}>
      <header className={`${BASE_CLASS}_card-head`}>
        <RatingStars value={review.rating} />
        <span className={`${BASE_CLASS}_author`}>{review.author_name}</span>
        {review.author_email && (
          <span className={`${BASE_CLASS}_email`}>{review.author_email}</span>
        )}
        <Badge variant={REVIEW_STATUS_VARIANTS[review.status]} size="sm">
          {REVIEW_STATUS_LABELS[review.status]}
        </Badge>
      </header>

      <Typography variant="body2" className={`${BASE_CLASS}_body`}>
        {review.body}
      </Typography>

      <footer className={`${BASE_CLASS}_card-foot`}>
        <Typography variant="caption" color="muted">
          {review.product ? (
            <Link href={`/admin/products/${review.product.id}`}>
              {review.product.name}
            </Link>
          ) : (
            `Товар #${review.product_id}`
          )}
          {" · "}
          {formatDateTime(review.created_at)}
        </Typography>

        <div className={`${BASE_CLASS}_actions`}>
          {review.status !== "approved" && (
            <Button
              type="button"
              size="sm"
              disabled={isBusy}
              onClick={() => onModerate("approved")}
            >
              Опублікувати
            </Button>
          )}
          {review.status !== "rejected" && (
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={isBusy}
              onClick={() => onModerate("rejected")}
            >
              Відхилити
            </Button>
          )}
          <button
            type="button"
            className={`${BASE_CLASS}_delete`}
            onClick={onDelete}
          >
            Видалити
          </button>
        </div>
      </footer>
    </article>
  );
}

export default ReviewCard;
