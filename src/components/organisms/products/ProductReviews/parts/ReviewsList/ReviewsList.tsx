import RatingStars from "@/components/controls/RatingStars/RatingStars";
import Typography from "@/components/controls/Typography/Typography";
import type { Review } from "@/entities/reviews/types";

import "../../ProductReviews.styles.scss";

interface ReviewsListProps {
  reviews: Review[];
  isLoading: boolean;
}

const BASE_CLASS = "product-reviews";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function ReviewsList({ reviews, isLoading }: ReviewsListProps) {
  if (isLoading) {
    return (
      <Typography variant="body2" color="muted">
        Завантаження…
      </Typography>
    );
  }

  if (reviews.length === 0) {
    return (
      <Typography variant="body2" color="muted">
        Ще немає відгуків. Будьте першим!
      </Typography>
    );
  }

  return (
    <>
      {reviews.map((review) => (
        <article key={review.id} className={`${BASE_CLASS}_item`}>
          <div className={`${BASE_CLASS}_item-head`}>
            <Typography variant="subtitle2" as="h3">
              {review.author_name}
            </Typography>
            <RatingStars value={review.rating} />
          </div>
          <Typography variant="caption" color="muted">
            {formatDate(review.created_at)}
          </Typography>
          <Typography variant="body2" className={`${BASE_CLASS}_item-body`}>
            {review.body}
          </Typography>
        </article>
      ))}
    </>
  );
}

export default ReviewsList;
