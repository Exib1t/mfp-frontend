"use client";

import Link from "next/link";
import { useMemo } from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader/AdminPageHeader";
import ConfirmDialog from "@/components/admin/ConfirmDialog/ConfirmDialog";
import DataTable from "@/components/admin/DataTable/DataTable";
import Button from "@/components/controls/Button/Button";
import Typography from "@/components/controls/Typography/Typography";
import { buildConfiguratorColumns } from "./parts/configuratorColumns";
import { useConfiguratorsList } from "./useConfiguratorsList";

import "./AdminConfiguratorsPage.styles.scss";

const BASE_CLASS = "admin-configurators";

function AdminConfiguratorsPage() {
  const state = useConfiguratorsList();

  const columns = useMemo(
    () => buildConfiguratorColumns({ onDelete: state.requestDelete }),
    [state.requestDelete],
  );

  return (
    <div className={BASE_CLASS}>
      <AdminPageHeader
        title="Конфігуратори"
        description="Набори кроків, за якими покупець збирає товар. Один набір можна повісити на кілька товарів."
        actions={
          <Button as={Link} href="/admin/configurator/new">
            Додати конфігуратор
          </Button>
        }
      />

      {state.isError ? (
        <Typography variant="body2" color="muted">
          Не вдалося завантажити конфігуратори.
        </Typography>
      ) : (
        <DataTable
          rows={state.configurators}
          columns={columns}
          getRowId={(configurator) => configurator.id}
          isLoading={state.isLoading}
          emptyMessage="Конфігураторів ще немає"
        />
      )}

      <ConfirmDialog
        open={state.pendingDelete !== null}
        title="Видалити конфігуратор?"
        description={
          state.pendingDelete
            ? `«${state.pendingDelete.name}» зникне разом з усіма кроками та варіантами. Товари, привʼязані до нього, стануть звичайними.`
            : undefined
        }
        isPending={state.isDeleting}
        onConfirm={state.confirmDelete}
        onCancel={state.cancelDelete}
      />
    </div>
  );
}

export default AdminConfiguratorsPage;
