"use client";

import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import ToastProvider from "@/components/controls/Toast/ToastProvider";
import AuthProvider from "@/entities/auth/AuthContext";
import CartProvider from "@/entities/cart/CartContext";
import ConfiguratorCartProvider from "@/entities/configurator/ConfiguratorCartContext";

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
        <AuthProvider>
          <CartProvider>
            <ConfiguratorCartProvider>{children}</ConfiguratorCartProvider>
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
};
export default Providers;
