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
];

export const FOOTER_NAV_ITEMS: NavigationItem[] = [
  { href: "/products", title: "Каталог", icon: "layout-grid" },
  { href: "/about", title: "Про нас", icon: "info" },
  { href: "/delivery", title: "Доставка і оплата", icon: "truck" },
  { href: "/blog", title: "Блог", icon: "book-open" },
  { href: "/contacts", title: "Контакти", icon: "mail" },
];

/*
 * The phone header has no room for a link bar, so the menu behind the burger
 * carries the whole site: the two header destinations plus the content pages
 * that otherwise live only in the footer. Delivery and contacts are
 * pre-purchase questions for made-to-order goods — a buyer should not have to
 * scroll past a full page to find them.
 */
export const MOBILE_NAV_ITEMS: NavigationItem[] = [
  ...NAVIGATION_ITEMS,
  ...FOOTER_NAV_ITEMS.filter(
    (item) => !NAVIGATION_ITEMS.some((primary) => primary.href === item.href),
  ),
];
