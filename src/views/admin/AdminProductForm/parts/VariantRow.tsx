"use client";

import { Star, Trash2 } from "lucide-react";
import DragHandle from "@/components/admin/SortableList/parts/DragHandle";
import type { DragHandleProps } from "@/components/admin/SortableList/types";
import Input from "@/components/controls/Input/Input";
import type {
  AdminProductVariant,
  UpdateVariantPayload,
} from "@/entities/admin/products/types";
import { cn } from "@/lib/utils/cn";

interface VariantRowProps {
  variant: AdminProductVariant;
  dragHandleProps: DragHandleProps;
  basePrice: number;
  onPatch: (body: UpdateVariantPayload) => void;
  onMakeDefault: () => void;
  onRemove: () => void;
}

const BASE_CLASS = "product-variants";

/** Values commit on blur so typing never fires a request per keystroke. */
function VariantRow({
  variant,
  dragHandleProps,
  basePrice,
  onPatch,
  onMakeDefault,
  onRemove,
}: VariantRowProps) {
  const commitNumber =
    (field: "price" | "compare_at_price" | "stock", previous: number | null) =>
    (event: React.FocusEvent<HTMLInputElement>) => {
      const raw = event.target.value.trim();
      const next = raw === "" ? null : Number(raw);
      if (next !== null && Number.isNaN(next)) return;
      if (next === previous) return;
      onPatch({ [field]: field === "stock" ? (next ?? 0) : next });
    };

  return (
    <div
      className={cn(`${BASE_CLASS}_row`, { "-default": variant.is_default })}
    >
      <DragHandle handle={dragHandleProps} />

      <span className={`${BASE_CLASS}_label`}>
        {variant.label || "Стандарт"}
      </span>

      <Input
        aria-label="Артикул"
        defaultValue={variant.sku ?? ""}
        placeholder="SKU"
        onBlur={(event) => {
          const next = event.target.value.trim() || null;
          if (next !== variant.sku) onPatch({ sku: next });
        }}
      />

      <Input
        aria-label="Ціна"
        type="number"
        step="0.01"
        min="0"
        defaultValue={variant.price ?? ""}
        placeholder={String(basePrice)}
        onBlur={commitNumber("price", variant.price)}
      />

      <Input
        aria-label="Стара ціна"
        type="number"
        step="0.01"
        min="0"
        defaultValue={variant.compare_at_price ?? ""}
        onBlur={commitNumber("compare_at_price", variant.compare_at_price)}
      />

      <Input
        aria-label="Залишок"
        type="number"
        min="0"
        defaultValue={variant.stock}
        onBlur={commitNumber("stock", variant.stock)}
      />

      <button
        type="button"
        className={cn(`${BASE_CLASS}_star`, { "-active": variant.is_default })}
        aria-label="Зробити варіантом за замовчуванням"
        aria-pressed={variant.is_default}
        onClick={onMakeDefault}
      >
        <Star
          size={15}
          strokeWidth={2}
          fill={variant.is_default ? "currentColor" : "none"}
        />
      </button>

      <button
        type="button"
        className={`${BASE_CLASS}_remove`}
        aria-label={`Видалити варіант ${variant.label}`}
        onClick={onRemove}
      >
        <Trash2 size={15} strokeWidth={2} />
      </button>
    </div>
  );
}

export default VariantRow;
