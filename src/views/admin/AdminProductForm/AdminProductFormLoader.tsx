"use client";

import EmptyState from "@/components/controls/EmptyState/EmptyState";
import Skeleton from "@/components/controls/Skeleton/Skeleton";
import { useAdminProduct } from "@/entities/admin/products/api";
import AdminProductForm from "./AdminProductForm";

interface AdminProductFormLoaderProps {
  productId: number;
}

/** Fetches a product client-side (through the BFF) and feeds the editor. */
function AdminProductFormLoader({ productId }: AdminProductFormLoaderProps) {
  const { data: product, isLoading, isError } = useAdminProduct(productId);

  if (isLoading) return <Skeleton />;
  if (isError || !product) {
    return <EmptyState title="Товар не знайдено" titleAs="h1" />;
  }

  // Remount on id change so react-hook-form picks up fresh defaults.
  return <AdminProductForm key={product.id} product={product} />;
}

export default AdminProductFormLoader;
