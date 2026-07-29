"use client";

import EmptyState from "@/components/controls/EmptyState/EmptyState";
import Skeleton from "@/components/controls/Skeleton/Skeleton";
import { useAdminCategory } from "@/entities/admin/categories/api";
import AdminCategoryForm from "./AdminCategoryForm";

interface AdminCategoryFormLoaderProps {
  categoryId: number;
}

function AdminCategoryFormLoader({ categoryId }: AdminCategoryFormLoaderProps) {
  const { data: category, isLoading, isError } = useAdminCategory(categoryId);

  if (isLoading) return <Skeleton />;
  if (isError || !category) {
    return <EmptyState title="Категорію не знайдено" titleAs="h1" />;
  }

  return <AdminCategoryForm key={category.id} category={category} />;
}

export default AdminCategoryFormLoader;
