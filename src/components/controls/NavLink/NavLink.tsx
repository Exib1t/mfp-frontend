"use client";

import cn from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavigationItem } from "@/config/navigation.config";

import "./NavLink.styles.css";

const BASE_CLASS = "nav-link";

interface NavLinkProps {
  item: NavigationItem;
}

const NavLink = ({ item }: NavLinkProps) => {
  const pathname = usePathname();

  const isActive = pathname === item.href;

  return (
    <Link href={item.href} className={cn(BASE_CLASS, { "-active": isActive })}>
      {item.title}
    </Link>
  );
};
export default NavLink;
