"use client";

import AdminCard from "@/components/admin/AdminCard/AdminCard";
import Input from "@/components/controls/Input/Input";
import type {
  AdminOrder,
  UpdateOrderPayload,
} from "@/entities/admin/orders/types";

interface OrderNotesCardProps {
  order: AdminOrder;
  onPatch: (patch: UpdateOrderPayload) => void;
}

function OrderNotesCard({ order, onPatch }: OrderNotesCardProps) {
  return (
    <AdminCard
      title="Коментар"
      description="Побажання покупця та внутрішні нотатки. Зберігається на виході з поля."
    >
      <Input
        as="textarea"
        rows={4}
        defaultValue={order.notes ?? ""}
        aria-label="Коментар до замовлення"
        onBlur={(event) => {
          const notes = event.target.value.trim() || null;
          if (notes !== order.notes) onPatch({ notes });
        }}
      />
    </AdminCard>
  );
}

export default OrderNotesCard;
