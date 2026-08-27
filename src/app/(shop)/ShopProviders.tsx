"use client";

import type { PropsWithChildren } from "react";
import CartDrawer from "@/components/common/CartDrawer/CartDrawer";
import CartProvider from "@/entities/cart/CartContext";
import CartDrawerProvider from "@/entities/cart/CartDrawerContext";

const ShopProviders = ({ children }: PropsWithChildren) => {
  return (
    <CartProvider>
      <CartDrawerProvider>
        {children}
        <CartDrawer />
      </CartDrawerProvider>
    </CartProvider>
  );
};

export default ShopProviders;
