"use client";

import { LayoutGrid, LogOut, Tag } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ElementType, PropsWithChildren } from "react";
import Button from "@/components/controls/Button/Button";
import Typography from "@/components/controls/Typography/Typography";
import { useAuth } from "@/entities/auth/AuthContext";
import { cn } from "@/lib/utils/cn";

import "./AdminShell.styles.scss";

const NAV_ITEMS: { href: string; label: string; icon: ElementType }[] = [
  { href: "/admin", label: "Дашборд", icon: LayoutGrid },
  { href: "/admin/categories", label: "Категорії", icon: Tag },
];

const BASE_CLASS = "admin-shell";

function AdminShell({ children }: PropsWithChildren) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

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

      <div className={`${BASE_CLASS}_body`}>
        <nav className={`${BASE_CLASS}_nav`}>
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === item.href
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(`${BASE_CLASS}_nav-link`, {
                  "-active": isActive,
                })}
              >
                <item.icon size={16} strokeWidth={2} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <main className={`${BASE_CLASS}_content`}>{children}</main>
      </div>
    </div>
  );
}

export default AdminShell;
