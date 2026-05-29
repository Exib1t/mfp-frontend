"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import "./HeaderRight.styles.scss";

const BASE_CLASS = "header-right";

// TODO: replace with real cart store
const MOCK_CART_COUNT = 3;

const HeaderRight = () => {
  const pathname = usePathname();
  const isCartActive = pathname === "/cart";
  const count = MOCK_CART_COUNT;

  return (
    <div className={BASE_CLASS}>
      <Link
        href="/cart"
        className={cn(`${BASE_CLASS}_cart`, { "-active": isCartActive })}
        aria-label={`Кошик${count > 0 ? `, ${count} товари` : ""}`}
      >
        <ShoppingBag size={20} strokeWidth={1.75} />
        {count > 0 && (
          <span className={`${BASE_CLASS}_cart-badge`} aria-hidden="true">
            {count > 99 ? "99+" : count}
          </span>
        )}
      </Link>
    </div>
  );
};

export default HeaderRight;
