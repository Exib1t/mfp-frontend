"use client";

import type { PropsWithChildren } from "react";
import CartDrawer from "@/components/common/CartDrawer/CartDrawer";
import CartProvider from "@/entities/cart/CartContext";
import CartDrawerProvider from "@/entities/cart/CartDrawerContext";
import ConfiguratorCartProvider from "@/entities/configurator/ConfiguratorCartContext";

const ShopProviders = ({ children }: PropsWithChildren) => {
  return (
    <CartProvider>
      <ConfiguratorCartProvider>
        <CartDrawerProvider>
          {children}
          <CartDrawer />
        </CartDrawerProvider>
      </ConfiguratorCartProvider>
    </CartProvider>
  );
};

export default ShopProviders;
