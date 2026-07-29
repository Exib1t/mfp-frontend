"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/controls/Toast/ToastProvider";
import {
  useArchiveOrder,
  useUpdateOrder,
  useUpdateOrderStatus,
} from "@/entities/admin/orders/api";
import type {
  AdminOrder,
  OrderStatus,
  PaymentStatus,
  UpdateOrderPayload,
} from "@/entities/admin/orders/types";

/** Status, payment, field edits and archiving for one order. */
export function useOrderActions(order: AdminOrder) {
  const router = useRouter();
  const { toast } = useToast();
  const updateStatus = useUpdateOrderStatus();
  const updateOrder = useUpdateOrder();
  const archiveOrder = useArchiveOrder();

  const [isArchiveOpen, setIsArchiveOpen] = useState(false);

  const path = { id: order.id };

  /** Status and payment share one endpoint, so both are always sent. */
  const setStatuses = (status: OrderStatus, payment: PaymentStatus) =>
    updateStatus.mutate(
      { params: { path }, body: { status, payment_status: payment } },
      {
        onSuccess: () => toast("Замовлення оновлено", "success"),
        onError: () => toast("Не вдалося оновити замовлення", "error"),
      },
    );

  const patch = (body: UpdateOrderPayload) =>
    updateOrder.mutate(
      { params: { path }, body },
      {
        onSuccess: () => toast("Збережено", "success"),
        onError: () => toast("Не вдалося зберегти", "error"),
      },
    );

  const archive = () =>
    archiveOrder.mutate(
      { params: { path } },
      {
        onSuccess: () => {
          toast(`Замовлення #${order.id} архівовано`, "info");
          router.push("/admin/orders");
        },
        onError: () => toast("Не вдалося архівувати замовлення", "error"),
        onSettled: () => setIsArchiveOpen(false),
      },
    );

  return {
    setStatus: (status: OrderStatus) =>
      setStatuses(status, order.payment_status),
    setPaymentStatus: (payment: PaymentStatus) =>
      setStatuses(order.status, payment),
    patch,
    isSaving: updateStatus.isPending || updateOrder.isPending,
    isArchiveOpen,
    isArchiving: archiveOrder.isPending,
    openArchive: () => setIsArchiveOpen(true),
    closeArchive: () => setIsArchiveOpen(false),
    archive,
  };
}
