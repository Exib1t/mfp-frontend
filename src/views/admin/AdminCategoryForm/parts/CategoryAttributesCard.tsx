"use client";

import { useEffect, useState } from "react";
import AdminCard from "@/components/admin/AdminCard/AdminCard";
import Button from "@/components/controls/Button/Button";
import { useToast } from "@/components/controls/Toast/ToastProvider";
import Typography from "@/components/controls/Typography/Typography";
import { useAdminAttributes } from "@/entities/admin/attributes/api";
import { ATTRIBUTE_TYPE_LABELS } from "@/entities/admin/attributes/types";
import {
  useCategoryAttributes,
  useSetCategoryAttributes,
} from "@/entities/admin/categories/api";
import { cn } from "@/lib/utils/cn";

interface CategoryAttributesCardProps {
  categoryId: number;
}

const BASE_CLASS = "category-attributes";

/** Picks which characteristics products of this category should carry. */
function CategoryAttributesCard({ categoryId }: CategoryAttributesCardProps) {
  const { toast } = useToast();
  const { data: allAttributes = [] } = useAdminAttributes();
  const { data: assigned = [] } = useCategoryAttributes(categoryId);
  const setAttributes = useSetCategoryAttributes();

  const [selected, setSelected] = useState<number[]>([]);

  useEffect(() => {
    setSelected(assigned.map((attribute) => attribute.id));
  }, [assigned]);

  const toggle = (attributeId: number) =>
    setSelected((current) =>
      current.includes(attributeId)
        ? current.filter((id) => id !== attributeId)
        : [...current, attributeId],
    );

  const save = () =>
    setAttributes.mutate(
      {
        params: { path: { categoryId } },
        body: {
          // Order of the chips becomes the order in the product form.
          attributes: selected.map((attribute_id, index) => ({
            attribute_id,
            sort_order: index,
          })),
        },
      },
      {
        onSuccess: () => toast("Набір характеристик збережено", "success"),
        onError: () => toast("Не вдалося зберегти набір", "error"),
      },
    );

  return (
    <AdminCard
      title="Характеристики категорії"
      description="Товари цієї категорії показуватимуть саме ці поля."
      actions={
        <Button
          type="button"
          size="sm"
          onClick={save}
          loading={setAttributes.isPending}
        >
          Зберегти набір
        </Button>
      }
    >
      {allAttributes.length === 0 ? (
        <Typography variant="body2" color="muted">
          Спершу створіть характеристики в розділі «Характеристики».
        </Typography>
      ) : (
        <div className={BASE_CLASS}>
          {allAttributes.map((attribute) => (
            <label
              key={attribute.id}
              className={cn(`${BASE_CLASS}_chip`, {
                "-selected": selected.includes(attribute.id),
              })}
            >
              <input
                type="checkbox"
                checked={selected.includes(attribute.id)}
                onChange={() => toggle(attribute.id)}
              />
              <span>{attribute.name}</span>
              <span className={`${BASE_CLASS}_type`}>
                {ATTRIBUTE_TYPE_LABELS[attribute.type]}
              </span>
            </label>
          ))}
        </div>
      )}
    </AdminCard>
  );
}

export default CategoryAttributesCard;
