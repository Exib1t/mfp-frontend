"use client";

import cn from "classnames";
import {
  BookOpen,
  House,
  Info,
  LayoutGrid,
  Mail,
  Sliders,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavIconKey, NavigationItem } from "@/config/navigation.config";

import "./NavLink.styles.scss";

const BASE_CLASS = "nav-link";

const ICON_MAP: Record<NavIconKey, React.ElementType> = {
  house: House,
  "layout-grid": LayoutGrid,
  sliders: Sliders,
  info: Info,
  truck: Truck,
  "book-open": BookOpen,
  mail: Mail,
};

interface NavLinkProps {
  item: NavigationItem;
}

const NavLink = ({ item }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === item.href;
  const Icon = item.icon ? ICON_MAP[item.icon] : null;

  return (
    <Link href={item.href} className={cn(BASE_CLASS, { "-active": isActive })}>
      {Icon && <Icon className={`${BASE_CLASS}_icon`} size={16} strokeWidth={1.75} />}
      {item.title}
    </Link>
  );
};
export default NavLink;
