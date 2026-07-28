"use client";

import { useState } from "react";
import AdminCard from "@/components/admin/AdminCard/AdminCard";
import ConfirmDialog from "@/components/admin/ConfirmDialog/ConfirmDialog";
import SortableList from "@/components/admin/SortableList/SortableList";
import Button from "@/components/controls/Button/Button";
import Typography from "@/components/controls/Typography/Typography";
import type {
  AdminProduct,
  AdminProductVariant,
} from "@/entities/admin/products/types";
import { useProductVariants } from "../useProductVariants";
import VariantRow from "./VariantRow";

import "./VariantsTab.styles.scss";

interface VariantsTabProps {
  product: AdminProduct;
}

const BASE_CLASS = "product-variants";

function VariantsTab({ product }: VariantsTabProps) {
  const variants = useProductVariants(product);
  const [pendingDelete, setPendingDelete] =
    useState<AdminProductVariant | null>(null);

  const hasOptions = product.options.some((option) => option.values.length > 0);

  if (!hasOptions) {
    return (
      <AdminCard title="Варіанти">
        <Typography variant="body2" color="muted">
          Спершу додайте хоча б одну опцію зі значеннями на вкладці «Опції» —
          варіанти збираються з їхніх комбінацій. Без них товар продається як
          один SKU за базовою ціною.
        </Typography>
      </AdminCard>
    );
  }

  return (
    <AdminCard
      title="Варіанти"
      description="Порожня ціна успадковує базову. Зміни зберігаються при втраті фокусу."
      actions={
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={variants.pendingCount === 0 || variants.isMutating}
          onClick={variants.generateMissing}
        >
          {variants.pendingCount > 0
            ? `Згенерувати ${variants.pendingCount}`
            : "Усі комбінації створені"}
        </Button>
      }
    >
      {product.variants.length === 0 ? (
        <Typography variant="body2" color="muted">
          Варіантів ще немає. Натисніть «Згенерувати», щоб створити всі
          комбінації опцій.
        </Typography>
      ) : (
        <div className={BASE_CLASS}>
          <div className={`${BASE_CLASS}_head`}>
            <span />
            <span>Варіант</span>
            <span>SKU</span>
            <span>Ціна</span>
            <span>Стара</span>
            <span>Залишок</span>
            <span />
            <span />
          </div>

          <SortableList
            items={product.variants}
            getId={(variant) => variant.id}
            onReorder={variants.reorderVariants}
            renderItem={(variant, { dragHandleProps }) => (
              <VariantRow
                variant={variant}
                dragHandleProps={dragHandleProps}
                basePrice={product.price}
                onPatch={(body) => variants.patchVariant(variant.id, body)}
                onMakeDefault={() => variants.makeDefault(variant.id)}
                onRemove={() => setPendingDelete(variant)}
              />
            )}
          />
        </div>
      )}

      <ConfirmDialog
        open={pendingDelete !== null}
        title="Видалити варіант?"
        description={
          pendingDelete
            ? `«${pendingDelete.label || "Стандарт"}» більше не можна буде купити. Наявні замовлення збережуть його назву.`
            : undefined
        }
        isPending={variants.isMutating}
        onConfirm={() => {
          if (pendingDelete) variants.removeVariant(pendingDelete.id);
          setPendingDelete(null);
        }}
        onCancel={() => setPendingDelete(null)}
      />
    </AdminCard>
  );
}

export default VariantsTab;
