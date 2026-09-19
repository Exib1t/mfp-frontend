import Link from "next/link";
import {
  IconInstagram,
  IconTelegram,
} from "@/components/common/icons/BrandIcons";
import Logo from "@/components/common/Logo/Logo";
import NavLink from "@/components/controls/NavLink/NavLink";
import { CONTACTS } from "@/config/contacts.config";
import { FOOTER_NAV_ITEMS } from "@/config/navigation.config";

import "./Footer.styles.scss";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer_inner">
        <div className="footer_brand">
          <Logo />
          <p className="footer_brand_tagline">
            Handmade вігвами та дитячий текстиль з натуральних матеріалів
          </p>
        </div>

        <nav className="footer_nav">
          <p className="footer_nav_title">Навігація</p>
          {FOOTER_NAV_ITEMS.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </nav>

        <div className="footer_contacts">
          <p className="footer_contacts_title">Контакти</p>
          <a className="footer_contacts_link" href={CONTACTS.phone.href}>
            {CONTACTS.phone.label}
          </a>
          <a className="footer_contacts_link" href={CONTACTS.email.href}>
            {CONTACTS.email.label}
          </a>
          <div className="footer_socials">
            <a
              className="footer_social_icon"
              href={CONTACTS.instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <IconInstagram />
            </a>
            <a
              className="footer_social_icon"
              href={CONTACTS.telegram.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
            >
              <IconTelegram />
            </a>
          </div>
        </div>
      </div>

      <div className="footer_bottom">
        <span className="footer_copyright">
          © {new Date().getFullYear()} My Fairy Place. Всі права захищені.
        </span>
        <Link
          href="/privacy"
          className="footer_copyright"
          style={{ textDecoration: "underline" }}
        >
          Політика конфіденційності
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
