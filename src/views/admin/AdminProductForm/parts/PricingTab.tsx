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
        description="Заповнена акційна ціна діє одразу — вікна дат більше немає."
      >
        <AdminField
          htmlFor="product-sale-price"
          label="Акційна ціна, ₴"
          hint="Порожньо — акції немає."
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
      </AdminCard>
    </>
  );
}

export default PricingTab;
