"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/entities/cart/CartContext";
import { useCartDrawer } from "@/entities/cart/CartDrawerContext";
import { cn } from "@/lib/utils/cn";
import "./HeaderRight.styles.scss";

const BASE_CLASS = "header-right";

const HeaderRight = () => {
  const { isOpen, toggle } = useCartDrawer();
  const { totalCount } = useCart();
  const count = totalCount;

  return (
    <div className={BASE_CLASS}>
      <button
        type="button"
        className={cn(`${BASE_CLASS}_cart`, { "-active": isOpen })}
        aria-label={`Кошик${count > 0 ? `, ${count} товари` : ""}`}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={toggle}
      >
        <ShoppingBag size={20} strokeWidth={1.75} />
        {count > 0 && (
          <span className={`${BASE_CLASS}_cart-badge`} aria-hidden="true">
            {count > 99 ? "99+" : count}
          </span>
        )}
      </button>
    </div>
  );
};

export default HeaderRight;
