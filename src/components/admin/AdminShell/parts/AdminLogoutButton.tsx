"use client";

import { useTransition } from "react";
import { logoutAction } from "@/app/(admin)/admin/actions";

const BASE_CLASS = "admin-shell";

function AdminLogoutButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      className={`${BASE_CLASS}_logout`}
      disabled={isPending}
      onClick={() => startTransition(() => logoutAction())}
    >
      {isPending ? "Вихід…" : "Вийти"}
    </button>
  );
}

export default AdminLogoutButton;
