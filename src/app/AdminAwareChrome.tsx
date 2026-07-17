"use client";

import { usePathname } from "next/navigation";
import { type PropsWithChildren, ViewTransition } from "react";
import Footer from "@/components/common/Footer/Footer";
import Header from "@/components/common/Header/Header";

function AdminAwareChrome({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") ?? false;

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <Header />
      <ViewTransition name="page-content">
        <main>{children}</main>
      </ViewTransition>
      <Footer />
    </>
  );
}

export default AdminAwareChrome;
