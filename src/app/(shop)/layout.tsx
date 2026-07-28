import { ViewTransition } from "react";
import Footer from "@/components/common/Footer/Footer";
import Header from "@/components/common/Header/Header";
import ShopProviders from "./ShopProviders";

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ShopProviders>
      <Header />
      <ViewTransition name="page-content">
        <main>{children}</main>
      </ViewTransition>
      <Footer />
    </ShopProviders>
  );
}
