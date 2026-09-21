"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import Button from "@/components/controls/Button/Button";
import Input from "@/components/controls/Input/Input";
import RatingStars from "@/components/controls/RatingStars/RatingStars";
import { useToast } from "@/components/controls/Toast/ToastProvider";
import Typography from "@/components/controls/Typography/Typography";
import { useCreateReview } from "@/entities/reviews/api";
import { isRateLimited } from "@/services/api/apiError";

import "../../ProductReviews.styles.scss";

const reviewFormSchema = z.object({
  authorName: z
    .string()
    .trim()
    .min(1, "Введіть ім'я")
    .max(100, "Не більше 100 символів"),
  authorEmail: z.union([
    z.string().trim().email("Некоректний email"),
    z.literal(""),
  ]),
  rating: z.number().min(1, "Поставте оцінку").max(5),
  body: z
    .string()
    .trim()
    .min(1, "Введіть текст відгуку")
    .max(5000, "Не більше 5000 символів"),
});

type ReviewFormValues = z.infer<typeof reviewFormSchema>;

const DEFAULT_VALUES: ReviewFormValues = {
  authorName: "",
  authorEmail: "",
  // No stars picked: a form that opens on five biases every rating it
  // collects, and reads as though the buyer had already scored the product.
  rating: 0,
  body: "",
};

interface ReviewFormProps {
  productId: number;
}

const BASE_CLASS = "product-reviews";

function ReviewForm({ productId }: ReviewFormProps) {
  const createReview = useCreateReview();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const onSubmit = (values: ReviewFormValues) => {
    createReview.mutate(
      {
        body: {
          product_id: productId,
          author_name: values.authorName,
          author_email: values.authorEmail || undefined,
          rating: values.rating,
          body: values.body,
        },
      },
      {
        onSuccess: () => {
          // Bare reset(): passing values skips react-hook-form's native
          // form.reset(), so the uncontrolled inputs keep their text.
          reset();
          toast("Дякуємо! Відгук надіслано на модерацію.", "success");
        },
        onError: (error) => {
          toast(
            isRateLimited(error)
              ? "Забагато відгуків за короткий час. Зачекайте хвилину та спробуйте знову."
              : "Не вдалося надіслати відгук. Спробуйте ще раз.",
            "error",
          );
        },
      },
    );
  };

  return (
    <form
      className={`${BASE_CLASS}_form`}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Typography variant="subtitle1" as="h3">
        Залишити відгук
      </Typography>

      <label className={`${BASE_CLASS}_field`} htmlFor="review-author-name">
        <Typography variant="caption" color="muted">
          Ім'я *
        </Typography>
        <Input id="review-author-name" {...register("authorName")} />
        {errors.authorName && (
          <Typography variant="caption" color="error">
            {errors.authorName.message}
          </Typography>
        )}
      </label>

      <label className={`${BASE_CLASS}_field`} htmlFor="review-author-email">
        <Typography variant="caption" color="muted">
          Email
        </Typography>
        <Input
          id="review-author-email"
          type="email"
          {...register("authorEmail")}
        />
        {errors.authorEmail && (
          <Typography variant="caption" color="error">
            {errors.authorEmail.message}
          </Typography>
        )}
      </label>

      <div className={`${BASE_CLASS}_field`}>
        <Typography variant="caption" color="muted">
          Оцінка
        </Typography>
        <Controller
          name="rating"
          control={control}
          render={({ field }) => (
            <RatingStars
              value={field.value}
              onChange={field.onChange}
              size="md"
            />
          )}
        />
      </div>

      <label className={`${BASE_CLASS}_field`} htmlFor="review-body">
        <Typography variant="caption" color="muted">
          Відгук *
        </Typography>
        <Input id="review-body" as="textarea" rows={4} {...register("body")} />
        {errors.body && (
          <Typography variant="caption" color="error">
            {errors.body.message}
          </Typography>
        )}
      </label>

      <Button type="submit" loading={createReview.isPending}>
        Надіслати відгук
      </Button>
    </form>
  );
}

export default ReviewForm;
