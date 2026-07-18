"use client";

import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import Button from "@/components/controls/Button/Button";
import IconButton from "@/components/controls/IconButton/IconButton";
import Modal from "@/components/controls/Modal/Modal";
import Table, { type TableColumn } from "@/components/controls/Table/Table";
import { useToast } from "@/components/controls/Toast/ToastProvider";
import Typography from "@/components/controls/Typography/Typography";
import {
  useAdminCategories,
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from "@/entities/categories/api";
import type { Category } from "@/entities/categories/types";
import CategoryForm, {
  type CategoryFormValues,
} from "./parts/CategoryForm/CategoryForm";

import "./AdminCategoriesPage.styles.scss";

type FormModalState =
  | { mode: "create" }
  | { mode: "edit"; category: Category }
  | null;

const BASE_CLASS = "admin-categories-page";

function AdminCategoriesPage() {
  const { data: categories = [], isLoading } = useAdminCategories();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();
  const { toast } = useToast();

  const [formModal, setFormModal] = useState<FormModalState>(null);
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);

  const handleFormSubmit = (values: CategoryFormValues) => {
    if (formModal?.mode === "edit") {
      updateCategory.mutate(
        { params: { path: { id: formModal.category.id } }, body: values },
        {
          onSuccess: () => setFormModal(null),
          onError: () => toast("Не вдалося зберегти категорію", "error"),
        },
      );
    } else {
      createCategory.mutate(
        { body: values },
        {
          onSuccess: () => setFormModal(null),
          onError: () => toast("Не вдалося створити категорію", "error"),
        },
      );
    }
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteCategory.mutate(
      { params: { path: { id: deleteTarget.id } } },
      {
        onSuccess: () => setDeleteTarget(null),
        onError: () => toast("Не вдалося видалити категорію", "error"),
      },
    );
  };

  const columns: TableColumn<Category>[] = [
    { key: "name", header: "Назва", render: (c) => c.name },
    { key: "slug", header: "Slug", render: (c) => c.slug },
    {
      key: "sort_order",
      header: "Порядок",
      width: "1%",
      render: (c) => c.sort_order,
    },
    {
      key: "description",
      header: "Опис",
      render: (c) => c.description || "—",
    },
    {
      key: "actions",
      header: "",
      width: "1%",
      render: (c) => (
        <div className={`${BASE_CLASS}_row-actions`}>
          <IconButton
            aria-label="Редагувати"
            onClick={() => setFormModal({ mode: "edit", category: c })}
          >
            <Pencil size={16} strokeWidth={2} />
          </IconButton>
          <IconButton aria-label="Видалити" onClick={() => setDeleteTarget(c)}>
            <Trash2 size={16} strokeWidth={2} />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <div className={BASE_CLASS}>
      <div className={`${BASE_CLASS}_header`}>
        <Typography variant="h3" weight="semibold">
          Категорії
        </Typography>
        <Button size="sm" onClick={() => setFormModal({ mode: "create" })}>
          <Plus size={16} strokeWidth={2} />
          Додати категорію
        </Button>
      </div>

      {!isLoading && (
        <Table
          columns={columns}
          rows={categories}
          getRowKey={(c) => c.id}
          emptyMessage="Категорій ще немає"
        />
      )}

      <Modal
        open={formModal !== null}
        onClose={() => setFormModal(null)}
        title={
          formModal?.mode === "edit"
            ? "Редагувати категорію"
            : "Додати категорію"
        }
      >
        <CategoryForm
          mode={formModal?.mode ?? "create"}
          defaultValues={
            formModal?.mode === "edit"
              ? {
                  name: formModal.category.name,
                  slug: formModal.category.slug,
                  description: formModal.category.description ?? "",
                  sort_order: formModal.category.sort_order,
                }
              : undefined
          }
          onSubmit={handleFormSubmit}
          isPending={createCategory.isPending || updateCategory.isPending}
        />
      </Modal>

      <Modal
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        title="Видалити категорію"
      >
        <Typography variant="body1">
          Видалити категорію «{deleteTarget?.name}»? Цю дію не можна скасувати.
        </Typography>
        <Button
          variant="secondary"
          fullWidth
          loading={deleteCategory.isPending}
          onClick={handleDelete}
        >
          Видалити
        </Button>
      </Modal>
    </div>
  );
}

export default AdminCategoriesPage;
