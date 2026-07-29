"use client";

import Link from "next/link";
import { useMemo } from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader/AdminPageHeader";
import ConfirmDialog from "@/components/admin/ConfirmDialog/ConfirmDialog";
import DataTable from "@/components/admin/DataTable/DataTable";
import Button from "@/components/controls/Button/Button";
import Input from "@/components/controls/Input/Input";
import Typography from "@/components/controls/Typography/Typography";
import { buildAttributeColumns } from "./parts/attributeColumns";
import { useAttributesList } from "./useAttributesList";

import "./AdminAttributesPage.styles.scss";

const BASE_CLASS = "admin-attributes";

function AdminAttributesPage() {
  const state = useAttributesList();

  const columns = useMemo(
    () => buildAttributeColumns({ onDelete: state.requestDelete }),
    [state.requestDelete],
  );

  return (
    <div className={BASE_CLASS}>
      <AdminPageHeader
        title="Характеристики"
        description="Словник характеристик. Категорія вирішує, які з них показувати в товарі."
        actions={
          <Button as={Link} href="/admin/attributes/new">
            Додати характеристику
          </Button>
        }
      />

      <div className={`${BASE_CLASS}_toolbar`}>
        <Input
          placeholder="Пошук за назвою або кодом…"
          value={state.search}
          onChange={(event) => state.setSearch(event.target.value)}
          aria-label="Пошук характеристик"
        />
        <Typography variant="caption" color="muted">
          Всього: {state.total}
        </Typography>
      </div>

      {state.isError ? (
        <Typography variant="body2" color="muted">
          Не вдалося завантажити характеристики.
        </Typography>
      ) : (
        <DataTable
          rows={state.attributes}
          columns={columns}
          getRowId={(attribute) => attribute.id}
          isLoading={state.isLoading}
          emptyMessage="Характеристик не знайдено"
        />
      )}

      <ConfirmDialog
        open={state.pendingDelete !== null}
        title="Видалити характеристику?"
        description={
          state.pendingDelete
            ? `«${state.pendingDelete.name}» зникне з усіх товарів разом зі збереженими значеннями.`
            : undefined
        }
        isPending={state.isDeleting}
        onConfirm={state.confirmDelete}
        onCancel={state.cancelDelete}
      />
    </div>
  );
}

export default AdminAttributesPage;
