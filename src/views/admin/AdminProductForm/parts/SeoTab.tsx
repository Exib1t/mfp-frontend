"use client";

import AdminCard from "@/components/admin/AdminCard/AdminCard";
import AdminField from "@/components/admin/AdminField/AdminField";
import Input from "@/components/controls/Input/Input";
import type { ProductForm } from "../types";

interface SeoTabProps {
  form: ProductForm;
}

function SeoTab({ form }: SeoTabProps) {
  const { register } = form;

  return (
    <AdminCard
      title="SEO"
      description="Порожні поля — пошуковики візьмуть назву та короткий опис."
    >
      <AdminField htmlFor="product-meta-title" label="Meta title">
        <Input id="product-meta-title" {...register("meta_title")} />
      </AdminField>

      <AdminField htmlFor="product-meta-description" label="Meta description">
        <Input
          as="textarea"
          id="product-meta-description"
          rows={3}
          {...register("meta_description")}
        />
      </AdminField>
    </AdminCard>
  );
}

export default SeoTab;
