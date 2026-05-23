"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import "./HeaderRight.styles.scss";

const BASE_CLASS = "header-right";

const HeaderRight = () => {
  const pathname = usePathname();
  const isCartActive = pathname === "/cart";

  return (
    <div className={BASE_CLASS}>
      <Link
        href="/cart"
        className={cn(`${BASE_CLASS}_cart`, { "-active": isCartActive })}
        aria-label="Кошик"
      >
        <ShoppingBag size={20} strokeWidth={1.75} />
      </Link>
    </div>
  );
};

export default HeaderRight;
