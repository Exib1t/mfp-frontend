"use client";

import Link from "next/link";
import { Controller } from "react-hook-form";
import AdminCard from "@/components/admin/AdminCard/AdminCard";
import AdminField from "@/components/admin/AdminField/AdminField";
import AdminPageHeader from "@/components/admin/AdminPageHeader/AdminPageHeader";
import ImageUploadField from "@/components/admin/ImageUploadField/ImageUploadField";
import Button from "@/components/controls/Button/Button";
import Input from "@/components/controls/Input/Input";
import Select from "@/components/controls/Select/Select";
import { useAdminCategories } from "@/entities/admin/categories/api";
import {
  categoryPathLabel,
  collectSubtreeIds,
} from "@/entities/admin/categories/helpers";
import type { AdminCategory } from "@/entities/admin/categories/types";
import CategoryAttributesCard from "./parts/CategoryAttributesCard";
import { useCategoryForm } from "./useCategoryForm";

import "./AdminCategoryForm.styles.scss";

interface AdminCategoryFormProps {
  category?: AdminCategory;
}

const BASE_CLASS = "admin-category-form";
const ROOT_VALUE = "0";

function AdminCategoryForm({ category }: AdminCategoryFormProps) {
  const { form, submit, isSaving } = useCategoryForm(category);
  const { data: categories = [] } = useAdminCategories();

  // A category cannot sit under itself or its own descendants.
  const forbidden = category
    ? new Set(collectSubtreeIds(categories, category.id))
    : new Set<number>();

  const parentOptions = [
    { value: ROOT_VALUE, label: "— коренева категорія —" },
    ...categories
      .filter((item) => !forbidden.has(item.id))
      .map((item) => ({
        value: String(item.id),
        label: categoryPathLabel(categories, item),
      })),
  ];

  return (
    <div className={BASE_CLASS}>
      <form onSubmit={submit}>
        <AdminPageHeader
          title={category ? category.name : "Нова категорія"}
          description={category ? `/${category.slug}` : undefined}
          actions={
            <>
              <Button as={Link} href="/admin/categories" variant="ghost">
                До списку
              </Button>
              <Button type="submit" loading={isSaving}>
                Зберегти
              </Button>
            </>
          }
        />

        <AdminCard title="Основне">
          <AdminField
            htmlFor="category-name"
            label="Назва"
            error={form.formState.errors.name?.message}
          >
            <Input id="category-name" {...form.register("name")} />
          </AdminField>

          <AdminField
            htmlFor="category-slug"
            label="Slug"
            error={form.formState.errors.slug?.message}
          >
            <Input id="category-slug" {...form.register("slug")} />
          </AdminField>

          <AdminField htmlFor="category-parent" label="Батьківська категорія">
            <Controller
              control={form.control}
              name="parent_id"
              render={({ field }) => (
                <Select
                  value={field.value ? String(field.value) : ROOT_VALUE}
                  options={parentOptions}
                  onChange={(value) =>
                    field.onChange(value === ROOT_VALUE ? null : Number(value))
                  }
                  aria-label="Батьківська категорія"
                />
              )}
            />
          </AdminField>

          <AdminField htmlFor="category-description" label="Опис">
            <Input
              as="textarea"
              id="category-description"
              rows={3}
              {...form.register("description")}
            />
          </AdminField>

          <AdminField htmlFor="category-image" label="Зображення">
            <Controller
              control={form.control}
              name="image_url"
              render={({ field }) => (
                <ImageUploadField
                  value={field.value ?? null}
                  folder="categories"
                  label="Обкладинка категорії"
                  onChange={field.onChange}
                />
              )}
            />
          </AdminField>

          <AdminField htmlFor="category-sort" label="Порядок">
            <Input
              id="category-sort"
              type="number"
              min="0"
              {...form.register("sort_order")}
            />
          </AdminField>
        </AdminCard>

        <AdminCard title="SEO">
          <AdminField htmlFor="category-meta-title" label="Meta title">
            <Input id="category-meta-title" {...form.register("meta_title")} />
          </AdminField>

          <AdminField
            htmlFor="category-meta-description"
            label="Meta description"
          >
            <Input
              as="textarea"
              id="category-meta-description"
              rows={3}
              {...form.register("meta_description")}
            />
          </AdminField>
        </AdminCard>
      </form>

      {category && <CategoryAttributesCard categoryId={category.id} />}
    </div>
  );
}

export default AdminCategoryForm;
