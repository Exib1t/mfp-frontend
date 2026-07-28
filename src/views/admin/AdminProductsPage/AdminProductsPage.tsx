"use client";

import Link from "next/link";
import { useMemo } from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader/AdminPageHeader";
import ConfirmDialog from "@/components/admin/ConfirmDialog/ConfirmDialog";
import DataTable from "@/components/admin/DataTable/DataTable";
import Button from "@/components/controls/Button/Button";
import Input from "@/components/controls/Input/Input";
import Typography from "@/components/controls/Typography/Typography";
import { useAdminProducts } from "@/entities/admin/products/api";
import { buildProductColumns } from "./parts/productColumns";
import { useProductsListState } from "./useProductsListState";

import "./AdminProductsPage.styles.scss";

const BASE_CLASS = "admin-products";

function AdminProductsPage() {
  const state = useProductsListState();
  const { data, isLoading, isError } = useAdminProducts(state.query);

  const columns = useMemo(
    () => buildProductColumns({ onDelete: state.requestDelete }),
    [state.requestDelete],
  );

  const meta = data?.meta;

  return (
    <div className={BASE_CLASS}>
      <AdminPageHeader
        title="Товари"
        description={
          meta ? `Всього: ${meta.total}` : "Каталог товарів магазину"
        }
        actions={
          <Button as={Link} href="/admin/products/new">
            Додати товар
          </Button>
        }
      />

      <div className={`${BASE_CLASS}_toolbar`}>
        <Input
          placeholder="Пошук за назвою…"
          value={state.search}
          onChange={(event) => state.changeSearch(event.target.value)}
          aria-label="Пошук товарів"
        />
      </div>

      {isError ? (
        <Typography variant="body2" color="muted">
          Не вдалося завантажити товари.
        </Typography>
      ) : (
        <DataTable
          rows={data?.items ?? []}
          columns={columns}
          getRowId={(product) => product.id}
          isLoading={isLoading}
          emptyMessage="Товарів не знайдено"
        />
      )}

      {meta && meta.pages > 1 && (
        <div className={`${BASE_CLASS}_pagination`}>
          <Button
            variant="ghost"
            size="sm"
            disabled={state.page <= 1}
            onClick={() => state.setPage(state.page - 1)}
          >
            Назад
          </Button>
          <Typography variant="caption" color="muted">
            {meta.page} / {meta.pages}
          </Typography>
          <Button
            variant="ghost"
            size="sm"
            disabled={state.page >= meta.pages}
            onClick={() => state.setPage(state.page + 1)}
          >
            Далі
          </Button>
        </div>
      )}

      <ConfirmDialog
        open={state.pendingDelete !== null}
        title="Видалити товар?"
        description={
          state.pendingDelete
            ? `«${state.pendingDelete.name}» буде приховано з каталогу. Замовлення збережуть його назву.`
            : undefined
        }
        isPending={state.isDeleting}
        onConfirm={state.confirmDelete}
        onCancel={state.cancelDelete}
      />
    </div>
  );
}

export default AdminProductsPage;
