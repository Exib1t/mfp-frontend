"use client";

import { useMemo } from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader/AdminPageHeader";
import ConfirmDialog from "@/components/admin/ConfirmDialog/ConfirmDialog";
import DataTable from "@/components/admin/DataTable/DataTable";
import Button from "@/components/controls/Button/Button";
import Input from "@/components/controls/Input/Input";
import Typography from "@/components/controls/Typography/Typography";
import { fullName } from "@/entities/admin/users/types";
import CreateUserCard from "./parts/CreateUserCard";
import { buildUserColumns } from "./parts/userColumns";
import { useCreateUserForm } from "./useCreateUserForm";
import { useUsersList } from "./useUsersList";

import "./AdminUsersPage.styles.scss";

const BASE_CLASS = "admin-users";

function AdminUsersPage() {
  const state = useUsersList();
  const createForm = useCreateUserForm();

  const columns = useMemo(
    () =>
      buildUserColumns({
        onRole: state.setRole,
        onDelete: state.requestDelete,
      }),
    [state.setRole, state.requestDelete],
  );

  return (
    <div className={BASE_CLASS}>
      <AdminPageHeader
        title="Користувачі"
        description={`Всього: ${state.total} · адміністраторів: ${state.adminCount}`}
        actions={
          !createForm.isOpen && (
            <Button type="button" onClick={createForm.open}>
              Додати користувача
            </Button>
          )
        }
      />

      {createForm.isOpen && <CreateUserCard state={createForm} />}

      <div className={`${BASE_CLASS}_toolbar`}>
        <Input
          placeholder="Пошук за імʼям або e-mail…"
          value={state.search}
          onChange={(event) => state.setSearch(event.target.value)}
          aria-label="Пошук користувачів"
        />
      </div>

      {state.isError ? (
        <Typography variant="body2" color="muted">
          Не вдалося завантажити користувачів.
        </Typography>
      ) : (
        <DataTable
          rows={state.users}
          columns={columns}
          getRowId={(user) => user.id}
          isLoading={state.isLoading}
          emptyMessage="Користувачів не знайдено"
        />
      )}

      <ConfirmDialog
        open={state.pendingDelete !== null}
        title="Видалити користувача?"
        description={
          state.pendingDelete
            ? `${fullName(state.pendingDelete)} втратить доступ. Замовлення залишаться в системі.`
            : undefined
        }
        isPending={state.isDeleting}
        onConfirm={state.confirmDelete}
        onCancel={state.cancelDelete}
      />
    </div>
  );
}

export default AdminUsersPage;
