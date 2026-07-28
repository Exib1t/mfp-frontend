"use client";

import Link from "next/link";
import AdminCard from "@/components/admin/AdminCard/AdminCard";
import AdminField from "@/components/admin/AdminField/AdminField";
import Button from "@/components/controls/Button/Button";
import Typography from "@/components/controls/Typography/Typography";
import type { AdminProduct } from "@/entities/admin/products/types";
import { useProductAttributes } from "../useProductAttributes";
import AttributeValueInput from "./AttributeValueInput";

import "./AttributesTab.styles.scss";

interface AttributesTabProps {
  product: AdminProduct;
}

const BASE_CLASS = "product-attributes";

function AttributesTab({ product }: AttributesTabProps) {
  const state = useProductAttributes(product);

  if (state.isLoading) {
    return (
      <AdminCard title="Характеристики">
        <Typography variant="body2" color="muted">
          Завантаження…
        </Typography>
      </AdminCard>
    );
  }

  if (state.attributes.length === 0) {
    return (
      <AdminCard title="Характеристики">
        <Typography variant="body2" color="muted">
          Для категорії «{product.category.name}» ще не призначено жодної
          характеристики.
        </Typography>
        <Button as={Link} href="/admin/attributes" variant="outline" size="sm">
          Налаштувати характеристики
        </Button>
      </AdminCard>
    );
  }

  return (
    <AdminCard
      title="Характеристики"
      description={`Набір визначається категорією «${product.category.name}».`}
      actions={
        <Button
          type="button"
          size="sm"
          onClick={state.save}
          loading={state.isSaving}
        >
          Зберегти характеристики
        </Button>
      }
    >
      <div className={BASE_CLASS}>
        {state.attributes.map((attribute) => (
          <AdminField
            key={attribute.id}
            htmlFor={`attribute-${attribute.id}`}
            label={
              attribute.unit
                ? `${attribute.name}, ${attribute.unit}`
                : attribute.name
            }
            hint={attribute.group_name ?? undefined}
          >
            <AttributeValueInput
              attribute={attribute}
              value={state.draft[attribute.id] ?? null}
              onChange={(value) => state.setValue(attribute.id, value)}
            />
          </AdminField>
        ))}
      </div>
    </AdminCard>
  );
}

export default AttributesTab;
