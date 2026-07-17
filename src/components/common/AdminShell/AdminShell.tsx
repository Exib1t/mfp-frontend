"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import type { PropsWithChildren } from "react";
import Button from "@/components/controls/Button/Button";
import Typography from "@/components/controls/Typography/Typography";
import { useAuth } from "@/entities/auth/AuthContext";
import { cn } from "@/lib/utils/cn";

import "./AdminShell.styles.scss";

const BASE_CLASS = "admin-shell";

function AdminShell({ children }: PropsWithChildren) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  return (
    <div className={cn(BASE_CLASS)}>
      <header className={`${BASE_CLASS}_topbar`}>
        <Typography
          variant="subtitle1"
          weight="semibold"
          className={`${BASE_CLASS}_title`}
        >
          Панель адміністратора
        </Typography>

        <div className={`${BASE_CLASS}_user`}>
          {user && (
            <Typography variant="body2" color="muted">
              {user.email}
            </Typography>
          )}
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut size={16} strokeWidth={2} />
            Вийти
          </Button>
        </div>
      </header>

      <main className={`${BASE_CLASS}_content`}>{children}</main>
    </div>
  );
}

export default AdminShell;
