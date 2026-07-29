"use client";

import EmptyState from "@/components/controls/EmptyState/EmptyState";
import Skeleton from "@/components/controls/Skeleton/Skeleton";
import { useAdminAttribute } from "@/entities/admin/attributes/api";
import AdminAttributeForm from "./AdminAttributeForm";

interface AdminAttributeFormLoaderProps {
  attributeId: number;
}

function AdminAttributeFormLoader({
  attributeId,
}: AdminAttributeFormLoaderProps) {
  const {
    data: attribute,
    isLoading,
    isError,
  } = useAdminAttribute(attributeId);

  if (isLoading) return <Skeleton />;
  if (isError || !attribute) {
    return <EmptyState title="Характеристику не знайдено" titleAs="h1" />;
  }

  // Remount on id change so react-hook-form picks up fresh defaults.
  return <AdminAttributeForm key={attribute.id} attribute={attribute} />;
}

export default AdminAttributeFormLoader;
