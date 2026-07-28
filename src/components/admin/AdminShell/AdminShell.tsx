"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";
import { ADMIN_NAVIGATION } from "@/config/admin-navigation.config";
import { cn } from "@/lib/utils/cn";
import AdminLogoutButton from "./parts/AdminLogoutButton";

import "./AdminShell.styles.scss";

const BASE_CLASS = "admin-shell";

/** Sidebar + content frame shared by every admin screen. */
function AdminShell({ children }: PropsWithChildren) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/admin" ? pathname === href : pathname.startsWith(href);

  return (
    <div className={BASE_CLASS}>
      <aside className={`${BASE_CLASS}_sidebar`}>
        <Link href="/admin" className={`${BASE_CLASS}_brand`}>
          My Fairy Place
        </Link>

        <nav className={`${BASE_CLASS}_nav`}>
          {ADMIN_NAVIGATION.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(`${BASE_CLASS}_nav-link`, {
                "-active": isActive(item.href),
              })}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={`${BASE_CLASS}_sidebar-footer`}>
          <Link href="/" className={`${BASE_CLASS}_nav-link`}>
            ← До магазину
          </Link>
          <AdminLogoutButton />
        </div>
      </aside>

      <main className={`${BASE_CLASS}_content`}>{children}</main>
    </div>
  );
}

export default AdminShell;
