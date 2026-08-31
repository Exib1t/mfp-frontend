import { Suspense } from "react";
import ProductsPage from "@/views/ProductsPage/ProductsPage";

// The catalogue reads `?category=` through `useSearchParams`, which opts the
// route into client rendering unless the boundary is here.
export default function Page() {
  return (
    <Suspense>
      <ProductsPage />
    </Suspense>
  );
}
