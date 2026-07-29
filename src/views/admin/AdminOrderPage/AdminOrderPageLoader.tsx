"use client";

import EmptyState from "@/components/controls/EmptyState/EmptyState";
import Skeleton from "@/components/controls/Skeleton/Skeleton";
import { useAdminOrder } from "@/entities/admin/orders/api";
import AdminOrderPage from "./AdminOrderPage";

interface AdminOrderPageLoaderProps {
  orderId: number;
}

function AdminOrderPageLoader({ orderId }: AdminOrderPageLoaderProps) {
  const { data: order, isLoading, isError } = useAdminOrder(orderId);

  if (isLoading) return <Skeleton />;
  if (isError || !order) {
    return <EmptyState title="Замовлення не знайдено" titleAs="h1" />;
  }

  return <AdminOrderPage key={order.id} order={order} />;
}

export default AdminOrderPageLoader;
