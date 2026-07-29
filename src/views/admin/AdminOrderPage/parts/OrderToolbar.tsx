"use client";

import { Ban, Printer } from "lucide-react";
import AdminCard from "@/components/admin/AdminCard/AdminCard";
import StatusStepper from "@/components/admin/StatusStepper/StatusStepper";
import Button from "@/components/controls/Button/Button";
import CopyButton from "@/components/controls/CopyButton/CopyButton";
import {
  type AdminOrder,
  nextStatus,
  ORDER_FLOW,
  ORDER_STATUS_LABELS,
  type OrderStatus,
} from "@/entities/admin/orders/types";
import { orderToText } from "../helpers";

interface OrderToolbarProps {
  order: AdminOrder;
  isSaving: boolean;
  onStatus: (status: OrderStatus) => void;
}

const BASE_CLASS = "admin-order";

const STEPS = ORDER_FLOW.map((status) => ({
  id: status,
  label: ORDER_STATUS_LABELS[status],
}));

/** Pipeline plus the actions an operator reaches for on every order. */
function OrderToolbar({ order, isSaving, onStatus }: OrderToolbarProps) {
  const next = nextStatus(order.status);
  const isCancelled = order.status === "cancelled";

  return (
    <AdminCard className={`${BASE_CLASS}_toolbar`}>
      <StatusStepper
        steps={STEPS}
        current={order.status}
        isVoided={isCancelled}
        voidedLabel={ORDER_STATUS_LABELS.cancelled}
        onSelect={onStatus}
      />

      <div className={`${BASE_CLASS}_toolbar-actions`}>
        {next && (
          <Button
            type="button"
            disabled={isSaving}
            onClick={() => onStatus(next)}
          >
            {ORDER_STATUS_LABELS[next]}
          </Button>
        )}

        <CopyButton
          value={orderToText(order)}
          label="Скопіювати замовлення текстом"
          className={`${BASE_CLASS}_copy-all`}
        />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => window.print()}
        >
          <Printer size={16} strokeWidth={2} />
          Друк
        </Button>

        {!isCancelled && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={isSaving}
            onClick={() => onStatus("cancelled")}
          >
            <Ban size={16} strokeWidth={2} />
            Скасувати
          </Button>
        )}
      </div>
    </AdminCard>
  );
}

export default OrderToolbar;
