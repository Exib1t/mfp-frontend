/*
 * One place for the shop's real contact details. The footer and the contacts
 * page used to carry their own copies, which is how both ended up shipping
 * placeholders — a dead phone number and socials pointing at the platforms'
 * own home pages.
 *
 * TODO: replace with the live values before launch. `PHONE.href` is the
 * dialable form (no spaces), `PHONE.label` is what the page shows.
 */
export const CONTACTS = {
  phone: { label: "+38 (000) 000-00-00", href: "tel:+380000000000" },
  email: {
    label: "hello@myfairyplace.com",
    href: "mailto:hello@myfairyplace.com",
  },
  instagram: { label: "Instagram", href: "https://instagram.com" },
  telegram: { label: "Telegram", href: "https://t.me" },
} as const;
