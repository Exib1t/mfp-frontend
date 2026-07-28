import { notFound } from "next/navigation";
import AdminProductFormLoader from "@/views/admin/AdminProductForm/AdminProductFormLoader";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const productId = Number(id);

  if (!Number.isInteger(productId) || productId <= 0) notFound();

  return <AdminProductFormLoader productId={productId} />;
}
