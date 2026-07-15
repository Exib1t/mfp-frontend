import Skeleton from "@/components/controls/Skeleton/Skeleton";
import Typography from "@/components/controls/Typography/Typography";
import ProductCard from "@/components/organisms/products/ProductCard/ProductCard";
import type { Product } from "@/entities/products/types";

import "../../ProductsPage.styles.scss";

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
}

const BASE_CLASS = "products-page";
const SKELETON_KEYS = ["s1", "s2", "s3", "s4", "s5", "s6"];

function ProductGrid({ products, isLoading, isError }: ProductGridProps) {
  if (isError) {
    return (
      <div className={`${BASE_CLASS}_empty`}>
        <Typography variant="body1" color="muted">
          Не вдалося завантажити каталог. Спробуйте оновити сторінку.
        </Typography>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`${BASE_CLASS}_grid`}>
        {SKELETON_KEYS.map((key) => (
          <Skeleton key={key} className={`${BASE_CLASS}_skeleton`} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className={`${BASE_CLASS}_empty`}>
        <Typography variant="body1" color="muted">
          Немає товарів за вибраними фільтрами
        </Typography>
      </div>
    );
  }

  return (
    <div className={`${BASE_CLASS}_grid`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
