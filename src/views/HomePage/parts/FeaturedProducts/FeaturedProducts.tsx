import Link from "next/link";
import Typography from "@/components/controls/Typography/Typography";
import ProductCard from "@/components/organisms/products/ProductCard/ProductCard";
import { MOCK_FEATURED_PRODUCTS } from "@/entities/products/mocks";

import "./FeaturedProducts.styles.scss";

const BASE_CLASS = "featured-products";

function FeaturedProducts() {
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

        <div className={`${BASE_CLASS}_grid`}>
          {MOCK_FEATURED_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
