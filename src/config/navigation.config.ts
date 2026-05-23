export interface NavigationItem {
  href: string;
  title: string;
}

export const NAVIGATION_ITEMS = [
  {
    href: "/",
    title: "Home",
  },
  {
    href: "/products",
    title: "Products",
  },
] as const satisfies NavigationItem[];

export const FOOTER_NAV_ITEMS = [
  { href: "/products", title: "Каталог" },
  { href: "/about", title: "Про нас" },
  { href: "/delivery", title: "Доставка і оплата" },
  { href: "/blog", title: "Блог" },
  { href: "/contacts", title: "Контакти" },
] as const satisfies NavigationItem[];
