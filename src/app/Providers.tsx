"use client";

import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import CartDrawer from "@/components/common/CartDrawer/CartDrawer";
import ToastProvider from "@/components/controls/Toast/ToastProvider";
import CartProvider from "@/entities/cart/CartContext";
import CartDrawerProvider from "@/entities/cart/CartDrawerContext";
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
        <CartProvider>
          <ConfiguratorCartProvider>
            <CartDrawerProvider>
              {children}
              <CartDrawer />
            </CartDrawerProvider>
          </ConfiguratorCartProvider>
        </CartProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
};
export default Providers;
