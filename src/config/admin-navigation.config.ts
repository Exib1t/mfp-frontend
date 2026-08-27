export interface AdminNavItem {
  href: string;
  label: string;
}

export const ADMIN_NAVIGATION: AdminNavItem[] = [
  { href: "/admin", label: "Огляд" },
  { href: "/admin/products", label: "Товари" },
  { href: "/admin/categories", label: "Категорії" },
  { href: "/admin/attributes", label: "Характеристики" },
  { href: "/admin/orders", label: "Замовлення" },
  { href: "/admin/reviews", label: "Відгуки" },
  { href: "/admin/users", label: "Користувачі" },
];
