"use client";

import Link from "next/link";
import Skeleton from "@/components/controls/Skeleton/Skeleton";
import Typography from "@/components/controls/Typography/Typography";
import ProductCard from "@/components/organisms/products/ProductCard/ProductCard";
import { useProducts } from "@/entities/products/api";

import "./FeaturedProducts.styles.scss";

const BASE_CLASS = "featured-products";
const SKELETON_KEYS = ["s1", "s2", "s3", "s4"];

function FeaturedProducts() {
  const {
    data: page,
    isLoading,
    isError,
  } = useProducts({ limit: 4, is_featured: true });

  return (
    <section className={BASE_CLASS}>
      <div className={`${BASE_CLASS}_inner`}>
        <div className={`${BASE_CLASS}_header`}>
          <Typography variant="h2" as="h2">
            Популярні товари
          </Typography>
          <Link href="/products" className={`${BASE_CLASS}_link`}>
            <Typography variant="body2" color="primary">
              Весь каталог →
            </Typography>
          </Link>
        </div>

        {isError ? (
          <Typography variant="body1" color="muted">
            Не вдалося завантажити товари.
          </Typography>
        ) : isLoading ? (
          <div className={`${BASE_CLASS}_grid`}>
            {SKELETON_KEYS.map((key) => (
              <Skeleton key={key} className={`${BASE_CLASS}_skeleton`} />
            ))}
          </div>
        ) : (
          <div className={`${BASE_CLASS}_grid`}>
            {page?.items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedProducts;
