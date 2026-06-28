"use client";

import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import ToastProvider from "@/components/controls/Toast/ToastProvider";
import CartProvider from "@/entities/cart/CartContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <CartProvider>{children}</CartProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
};
export default Providers;
