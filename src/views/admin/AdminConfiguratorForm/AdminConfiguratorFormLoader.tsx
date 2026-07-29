"use client";

import EmptyState from "@/components/controls/EmptyState/EmptyState";
import Skeleton from "@/components/controls/Skeleton/Skeleton";
import { useAdminConfigurator } from "@/entities/admin/configurators/api";
import AdminConfiguratorForm from "./AdminConfiguratorForm";

interface AdminConfiguratorFormLoaderProps {
  configuratorId: number;
}

function AdminConfiguratorFormLoader({
  configuratorId,
}: AdminConfiguratorFormLoaderProps) {
  const {
    data: configurator,
    isLoading,
    isError,
  } = useAdminConfigurator(configuratorId);

  if (isLoading) return <Skeleton />;
  if (isError || !configurator) {
    return <EmptyState title="Конфігуратор не знайдено" titleAs="h1" />;
  }

  // Remount on id change so react-hook-form picks up fresh defaults.
  return (
    <AdminConfiguratorForm key={configurator.id} configurator={configurator} />
  );
}

export default AdminConfiguratorFormLoader;
