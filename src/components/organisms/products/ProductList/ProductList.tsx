"use client";

import ProductCard from "@/components/organisms/products/ProductCard/ProductCard";
import { useProducts } from "@/entities/products/queries";
import "./ProductList.styles.css";

const BASE_CLASS = "product-list";

const ProductList = () => {
  const { data, isPending, isError } = useProducts();

  if (isPending) {
    return (
      <div className={`${BASE_CLASS}_state`}>
        <span className={`${BASE_CLASS}_spinner`} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={`${BASE_CLASS}_state`}>
        <p className={`${BASE_CLASS}_error`}>Не вдалося завантажити товари</p>
      </div>
    );
  }

  return (
    <ul className={BASE_CLASS}>
      {data.data.map((product) => (
        <li key={product.id} className={`${BASE_CLASS}_item`}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
