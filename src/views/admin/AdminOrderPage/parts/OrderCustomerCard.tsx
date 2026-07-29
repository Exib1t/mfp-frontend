"use client";

import AdminCard from "@/components/admin/AdminCard/AdminCard";
import CopyButton from "@/components/controls/CopyButton/CopyButton";
import Input from "@/components/controls/Input/Input";
import type {
  AdminOrder,
  UpdateOrderPayload,
} from "@/entities/admin/orders/types";

interface OrderCustomerCardProps {
  order: AdminOrder;
  onPatch: (patch: UpdateOrderPayload) => void;
}

const BASE_CLASS = "admin-order";

const FIELDS = [
  { key: "guest_name", label: "Отримувач" },
  { key: "guest_phone", label: "Телефон" },
  { key: "guest_email", label: "E-mail" },
  { key: "address", label: "Адреса" },
  { key: "nova_poshta_ref", label: "Відділення НП" },
] as const;

/** Contact block: every field is editable in place and copyable in one click. */
function OrderCustomerCard({ order, onPatch }: OrderCustomerCardProps) {
  return (
    <AdminCard
      title="Покупець і доставка"
      description="Правки зберігаються, щойно ви залишите поле."
    >
      {FIELDS.map((field) => {
        const value = order[field.key] ?? "";

        return (
          <div key={field.key} className={`${BASE_CLASS}_field`}>
            <label
              className={`${BASE_CLASS}_field-label`}
              htmlFor={`order-${field.key}`}
            >
              {field.label}
            </label>
            <div className={`${BASE_CLASS}_field-control`}>
              <Input
                id={`order-${field.key}`}
                defaultValue={value}
                onBlur={(event) => {
                  const next = event.target.value.trim();
                  if (next === value) return;
                  // Only the Nova Poshta ref is nullable; the rest are required.
                  onPatch({
                    [field.key]:
                      next === "" && field.key === "nova_poshta_ref"
                        ? null
                        : next,
                  });
                }}
              />
              {value && <CopyButton value={String(value)} />}
            </div>
          </div>
        );
      })}
    </AdminCard>
  );
}

export default OrderCustomerCard;
