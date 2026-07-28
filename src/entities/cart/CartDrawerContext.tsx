"use client";

import {
  createContext,
  type PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";

interface CartDrawerContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const CartDrawerContext = createContext<CartDrawerContextValue | null>(null);

const CartDrawerProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo<CartDrawerContextValue>(
    () => ({
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      toggle: () => setIsOpen((prev) => !prev),
    }),
    [isOpen],
  );

  return (
    <CartDrawerContext.Provider value={value}>
      {children}
    </CartDrawerContext.Provider>
  );
};

export function useCartDrawer(): CartDrawerContextValue {
  const ctx = useContext(CartDrawerContext);
  if (!ctx)
    throw new Error("useCartDrawer must be used within <CartDrawerProvider>");
  return ctx;
}

export default CartDrawerProvider;
