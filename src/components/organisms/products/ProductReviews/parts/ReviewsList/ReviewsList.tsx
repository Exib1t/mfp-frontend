import RatingStars from "@/components/controls/RatingStars/RatingStars";
import Typography from "@/components/controls/Typography/Typography";
import type { Review } from "@/entities/reviews/types";

import "../../ProductReviews.styles.scss";

interface ReviewsListProps {
  reviews: Review[];
  isLoading: boolean;
}

const BASE_CLASS = "product-reviews";

// What a parent can tell the next parent — the column would otherwise hold a
// single grey line while the form sits beside it.
const PROMPTS = [
  "Який розмір обрали й у яку кімнату він став",
  "Яка тканина на дотик і як тримає колір після прання",
  "Як дитина грається всередині",
];

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
      <div className={`${BASE_CLASS}_empty`}>
        <Typography variant="subtitle1" as="h3">
          Відгуків ще немає
        </Typography>
        <Typography variant="body2" color="muted">
          Цей вігвам уже вдома? Розкажіть, як його прийняла дитина — ваш відгук
          буде першим, який побачать інші батьки.
        </Typography>
        <ul className={`${BASE_CLASS}_prompts`}>
          {PROMPTS.map((prompt) => (
            <li key={prompt}>
              <Typography variant="body2" color="muted">
                {prompt}
              </Typography>
            </li>
          ))}
        </ul>
      </div>
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
