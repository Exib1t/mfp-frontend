"use client";

import { Star } from "lucide-react";
import { useState } from "react";
import Button from "@/components/controls/Button/Button";
import { useToast } from "@/components/controls/Toast/ToastProvider";
import Typography from "@/components/controls/Typography/Typography";
import { useCreateReview, useProductReviews } from "@/entities/reviews/api";
import { cn } from "@/lib/utils/cn";

import "./ProductReviews.styles.scss";

interface ProductReviewsProps {
  productId: number;
}

const BASE_CLASS = "product-reviews";

const STAR_KEYS = ["s1", "s2", "s3", "s4", "s5"];

function Stars({ value }: { value: number }) {
  return (
    <span
      className={`${BASE_CLASS}_stars`}
      role="img"
      aria-label={`Оцінка ${value} з 5`}
    >
      {STAR_KEYS.map((key, i) => (
        <Star
          key={key}
          size={15}
          strokeWidth={2}
          className={cn(`${BASE_CLASS}_star`, { "-filled": i < value })}
        />
      ))}
    </span>
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function ProductReviews({ productId }: ProductReviewsProps) {
  const { data: reviews = [], isLoading } = useProductReviews(productId);
  const createReview = useCreateReview();
  const { toast } = useToast();

  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [rating, setRating] = useState(5);
  const [body, setBody] = useState("");

  const canSubmit =
    authorName.trim().length > 0 &&
    body.trim().length > 0 &&
    !createReview.isPending;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    createReview.mutate(
      {
        body: {
          product_id: productId,
          author_name: authorName.trim(),
          author_email: authorEmail.trim() || undefined,
          rating,
          body: body.trim(),
        },
      },
      {
        onSuccess: () => {
          setAuthorName("");
          setAuthorEmail("");
          setRating(5);
          setBody("");
          toast("Дякуємо! Відгук надіслано на модерацію.", "success");
        },
        onError: () => {
          toast("Не вдалося надіслати відгук. Спробуйте ще раз.", "error");
        },
      },
    );
  };

  return (
    <section className={BASE_CLASS}>
      <Typography variant="h3" as="h2" className={`${BASE_CLASS}_title`}>
        Відгуки
      </Typography>

      <div className={`${BASE_CLASS}_layout`}>
        {/* ─── List ─── */}
        <div className={`${BASE_CLASS}_list`}>
          {isLoading ? (
            <Typography variant="body2" color="muted">
              Завантаження…
            </Typography>
          ) : reviews.length === 0 ? (
            <Typography variant="body2" color="muted">
              Ще немає відгуків. Будьте першим!
            </Typography>
          ) : (
            reviews.map((review) => (
              <article key={review.id} className={`${BASE_CLASS}_item`}>
                <div className={`${BASE_CLASS}_item-head`}>
                  <Typography variant="subtitle2" as="h3">
                    {review.author_name}
                  </Typography>
                  <Stars value={review.rating} />
                </div>
                <Typography variant="caption" color="muted">
                  {formatDate(review.created_at)}
                </Typography>
                <Typography
                  variant="body2"
                  className={`${BASE_CLASS}_item-body`}
                >
                  {review.body}
                </Typography>
              </article>
            ))
          )}
        </div>

        {/* ─── Form ─── */}
        <form className={`${BASE_CLASS}_form`} onSubmit={handleSubmit}>
          <Typography variant="subtitle1" as="h3">
            Залишити відгук
          </Typography>

          <label className={`${BASE_CLASS}_field`}>
            <Typography variant="caption" color="muted">
              Ім'я *
            </Typography>
            <input
              className={`${BASE_CLASS}_input`}
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              required
            />
          </label>

          <label className={`${BASE_CLASS}_field`}>
            <Typography variant="caption" color="muted">
              Email
            </Typography>
            <input
              type="email"
              className={`${BASE_CLASS}_input`}
              value={authorEmail}
              onChange={(e) => setAuthorEmail(e.target.value)}
            />
          </label>

          <div className={`${BASE_CLASS}_field`}>
            <Typography variant="caption" color="muted">
              Оцінка
            </Typography>
            <div className={`${BASE_CLASS}_rating-input`}>
              {Array.from({ length: 5 }).map((_, i) => {
                const val = i + 1;
                return (
                  <button
                    key={val}
                    type="button"
                    className={cn(`${BASE_CLASS}_rating-btn`, {
                      "-active": val <= rating,
                    })}
                    onClick={() => setRating(val)}
                    aria-label={`${val} з 5`}
                  >
                    <Star size={22} strokeWidth={2} />
                  </button>
                );
              })}
            </div>
          </div>

          <label className={`${BASE_CLASS}_field`}>
            <Typography variant="caption" color="muted">
              Відгук *
            </Typography>
            <textarea
              className={`${BASE_CLASS}_textarea`}
              rows={4}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </label>

          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={!canSubmit}
            loading={createReview.isPending}
          >
            Надіслати відгук
          </Button>
        </form>
      </div>
    </section>
  );
}

export default ProductReviews;
