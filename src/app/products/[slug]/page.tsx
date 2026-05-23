import { notFound } from "next/navigation";
import { MOCK_PRODUCTS } from "@/entities/products/mocks";
import ProductPage from "@/pages/ProductPage/ProductPage";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug);

  if (!product) notFound();

  return <ProductPage product={product} />;
}
