"use client";

import Link from "next/link";
import AdminCard from "@/components/admin/AdminCard/AdminCard";
import AdminPageHeader from "@/components/admin/AdminPageHeader/AdminPageHeader";
import ConfirmDialog from "@/components/admin/ConfirmDialog/ConfirmDialog";
import Button from "@/components/controls/Button/Button";
import Typography from "@/components/controls/Typography/Typography";
import CategoryTreeLevel from "./parts/CategoryTreeLevel";
import { useCategoryTree } from "./useCategoryTree";

import "./AdminCategoriesPage.styles.scss";

const BASE_CLASS = "admin-categories";

function AdminCategoriesPage() {
  const state = useCategoryTree();

  return (
    <div className={BASE_CLASS}>
      <AdminPageHeader
        title="Категорії"
        description="Порядок задається перетягуванням між сусідами. Вкладеність змінюється в самій категорії."
        actions={
          <Button as={Link} href="/admin/categories/new">
            Додати категорію
          </Button>
        }
      />

      <AdminCard>
        {state.isLoading && (
          <Typography variant="body2" color="muted">
            Завантаження…
          </Typography>
        )}

        {state.isError && (
          <Typography variant="body2" color="muted">
            Не вдалося завантажити категорії.
          </Typography>
        )}

        {!state.isLoading && !state.isError && state.tree.length === 0 && (
          <Typography variant="body2" color="muted">
            Категорій ще немає.
          </Typography>
        )}

        <CategoryTreeLevel
          nodes={state.tree}
          onReorder={state.reorderSiblings}
          onDelete={state.requestDelete}
        />
      </AdminCard>

      <ConfirmDialog
        open={state.pendingDelete !== null}
        title="Видалити категорію?"
        description={
          state.pendingDelete
            ? `«${state.pendingDelete.name}» буде приховано. Товари з цієї категорії залишаться, але втратять звʼязок у каталозі.`
            : undefined
        }
        isPending={state.isDeleting}
        onConfirm={state.confirmDelete}
        onCancel={state.cancelDelete}
      />
    </div>
  );
}

export default AdminCategoriesPage;
