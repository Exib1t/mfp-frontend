import type { DataTableColumn } from "@/components/admin/DataTable/types";
import CopyButton from "@/components/controls/CopyButton/CopyButton";
import Select from "@/components/controls/Select/Select";
import {
  type AdminUser,
  fullName,
  USER_ROLE_OPTIONS,
  type UserRole,
} from "@/entities/admin/users/types";
import { formatDate } from "@/lib/utils/formatDate";

const BASE_CLASS = "admin-users";

interface ColumnsOptions {
  onRole: (user: AdminUser, role: UserRole) => void;
  onDelete: (user: AdminUser) => void;
}

export function buildUserColumns({
  onRole,
  onDelete,
}: ColumnsOptions): DataTableColumn<AdminUser>[] {
  return [
    {
      key: "name",
      header: "Користувач",
      width: "minmax(0, 1.4fr)",
      render: (user) => (
        <span className={`${BASE_CLASS}_name`}>{fullName(user)}</span>
      ),
    },
    {
      key: "email",
      header: "E-mail",
      width: "minmax(0, 1.6fr)",
      render: (user) => (
        <span className={`${BASE_CLASS}_email`}>
          {user.email}
          <CopyButton value={user.email} label="Скопіювати e-mail" />
        </span>
      ),
    },
    {
      key: "role",
      header: "Роль",
      width: "190px",
      render: (user) => (
        <Select
          value={user.role}
          options={[...USER_ROLE_OPTIONS]}
          onChange={(role) => onRole(user, role as UserRole)}
          aria-label={`Роль: ${fullName(user)}`}
        />
      ),
    },
    {
      key: "created",
      header: "Зареєстрований",
      width: "180px",
      render: (user) => (
        <span className={`${BASE_CLASS}_date`}>
          {formatDate(user.created_at)}
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      width: "90px",
      align: "right",
      render: (user) => (
        <button
          type="button"
          className={`${BASE_CLASS}_delete`}
          onClick={() => onDelete(user)}
        >
          Видалити
        </button>
      ),
    },
  ];
}
