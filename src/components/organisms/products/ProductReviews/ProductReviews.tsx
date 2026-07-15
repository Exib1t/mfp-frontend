"use client";

import Typography from "@/components/controls/Typography/Typography";
import { useProductReviews } from "@/entities/reviews/api";
import ReviewForm from "./parts/ReviewForm/ReviewForm";
import ReviewsList from "./parts/ReviewsList/ReviewsList";

import "./ProductReviews.styles.scss";

interface ProductReviewsProps {
  productId: number;
}

const BASE_CLASS = "product-reviews";

function ProductReviews({ productId }: ProductReviewsProps) {
  const { data: reviews = [], isLoading } = useProductReviews(productId);

  return (
    <section className={BASE_CLASS}>
      <Typography variant="h3" as="h2" className={`${BASE_CLASS}_title`}>
        Відгуки
      </Typography>

      <div className={`${BASE_CLASS}_layout`}>
        <div className={`${BASE_CLASS}_list`}>
          <ReviewsList reviews={reviews} isLoading={isLoading} />
        </div>

        <ReviewForm productId={productId} />
      </div>
    </section>
  );
}

export default ProductReviews;
