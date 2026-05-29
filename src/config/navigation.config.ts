export type NavIconKey =
  | "house"
  | "layout-grid"
  | "sliders"
  | "info"
  | "truck"
  | "book-open"
  | "mail";

export interface NavigationItem {
  href: string;
  title: string;
  icon?: NavIconKey;
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { href: "/", title: "Головна", icon: "house" },
  { href: "/products", title: "Каталог", icon: "layout-grid" },
  { href: "/configurator", title: "Конфігуратор", icon: "sliders" },
];

export const FOOTER_NAV_ITEMS: NavigationItem[] = [
  { href: "/products", title: "Каталог", icon: "layout-grid" },
  { href: "/about", title: "Про нас", icon: "info" },
  { href: "/delivery", title: "Доставка і оплата", icon: "truck" },
  { href: "/blog", title: "Блог", icon: "book-open" },
  { href: "/contacts", title: "Контакти", icon: "mail" },
];
