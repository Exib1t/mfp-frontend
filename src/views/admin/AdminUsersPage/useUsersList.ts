"use client";

import { useMemo, useState } from "react";
import { useToast } from "@/components/controls/Toast/ToastProvider";
import {
  useAdminUsers,
  useDeleteUser,
  useUpdateUser,
} from "@/entities/admin/users/api";
import type { AdminUser, UserRole } from "@/entities/admin/users/types";
import { fullName } from "@/entities/admin/users/types";

/** Search, inline role changes and the delete confirmation. */
export function useUsersList() {
  const { toast } = useToast();
  const { data: users = [], isLoading, isError } = useAdminUsers();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  const [search, setSearch] = useState("");
  const [pendingDelete, setPendingDelete] = useState<AdminUser | null>(null);

  const filtered = useMemo(() => {
    const needle = search.trim().toLowerCase();
    if (!needle) return users;

    return users.filter(
      (user) =>
        user.email.toLowerCase().includes(needle) ||
        fullName(user).toLowerCase().includes(needle),
    );
  }, [users, search]);

  const adminCount = users.filter((user) => user.role === "admin").length;

  const setRole = (user: AdminUser, role: UserRole) => {
    // Locking everyone out of the admin panel is not recoverable from the UI.
    if (user.role === "admin" && role !== "admin" && adminCount <= 1) {
      toast("Це останній адміністратор — роль не змінено", "error");
      return;
    }

    updateUser.mutate(
      { params: { path: { id: user.id } }, body: { role } },
      {
        onSuccess: () => toast("Роль оновлено", "success"),
        onError: () => toast("Не вдалося змінити роль", "error"),
      },
    );
  };

  const confirmDelete = () => {
    if (!pendingDelete) return;

    deleteUser.mutate(
      { params: { path: { id: pendingDelete.id } } },
      {
        onSuccess: () => toast("Користувача видалено", "info"),
        onError: () => toast("Не вдалося видалити користувача", "error"),
        onSettled: () => setPendingDelete(null),
      },
    );
  };

  return {
    users: filtered,
    total: users.length,
    adminCount,
    isLoading,
    isError,
    search,
    setSearch,
    setRole,
    isSaving: updateUser.isPending,
    pendingDelete,
    isDeleting: deleteUser.isPending,
    requestDelete: setPendingDelete,
    cancelDelete: () => setPendingDelete(null),
    confirmDelete,
  };
}
