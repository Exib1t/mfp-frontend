"use client";

import { useRouter } from "next/navigation";
import { type PropsWithChildren, useEffect } from "react";
import { useAuth } from "./AuthContext";

function AdminGuard({ children }: PropsWithChildren) {
  const { isReady, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isReady && !isAuthenticated) router.replace("/admin/login");
  }, [isReady, isAuthenticated, router]);

  if (!isReady || !isAuthenticated) return null;

  return <>{children}</>;
}

export default AdminGuard;
