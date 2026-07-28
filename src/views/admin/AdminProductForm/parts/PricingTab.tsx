"use client";

import AdminCard from "@/components/admin/AdminCard/AdminCard";
import AdminField from "@/components/admin/AdminField/AdminField";
import Input from "@/components/controls/Input/Input";
import type { ProductForm } from "../types";

interface PricingTabProps {
  form: ProductForm;
  hasVariants: boolean;
}

function PricingTab({ form, hasVariants }: PricingTabProps) {
  const { register, formState } = form;
  const { errors } = formState;

  return (
    <>
      <AdminCard
        title="Ціни"
        description={
          hasVariants
            ? "Базова ціна. Варіанти зі своєю ціною перекривають її."
            : undefined
        }
      >
        <AdminField
          htmlFor="product-price"
          label="Ціна, ₴"
          error={errors.price?.message}
        >
          <Input
            id="product-price"
            type="number"
            step="0.01"
            min="0"
            {...register("price")}
          />
        </AdminField>

        <AdminField
          htmlFor="product-compare-at"
          label="Стара ціна, ₴"
          hint="Закреслена ціна поруч. На суму не впливає."
        >
          <Input
            id="product-compare-at"
            type="number"
            step="0.01"
            min="0"
            {...register("compare_at_price")}
          />
        </AdminField>

        <AdminField
          htmlFor="product-stock"
          label="Залишок"
          hint={
            hasVariants
              ? "Ігнорується — залишок рахується за варіантами."
              : undefined
          }
        >
          <Input
            id="product-stock"
            type="number"
            min="0"
            {...register("stock")}
          />
        </AdminField>
      </AdminCard>

      <AdminCard
        title="Акція"
        description="Акційна ціна діє лише всередині вказаного вікна."
      >
        <AdminField
          htmlFor="product-sale-price"
          label="Акційна ціна, ₴"
          error={errors.sale_price?.message}
        >
          <Input
            id="product-sale-price"
            type="number"
            step="0.01"
            min="0"
            {...register("sale_price")}
          />
        </AdminField>

        <AdminField htmlFor="product-sale-start" label="Початок акції">
          <Input
            id="product-sale-start"
            type="datetime-local"
            {...register("sale_starts_at")}
          />
        </AdminField>

        <AdminField
          htmlFor="product-sale-end"
          label="Кінець акції"
          error={errors.sale_ends_at?.message}
        >
          <Input
            id="product-sale-end"
            type="datetime-local"
            {...register("sale_ends_at")}
          />
        </AdminField>
      </AdminCard>
    </>
  );
}

export default PricingTab;
