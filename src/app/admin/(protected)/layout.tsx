import type { PropsWithChildren } from "react";
import AdminShell from "@/components/common/AdminShell/AdminShell";
import AdminGuard from "@/entities/auth/AdminGuard";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <AdminGuard>
      <AdminShell>{children}</AdminShell>
    </AdminGuard>
  );
}
