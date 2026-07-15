import { Mail, Phone } from "lucide-react";
import {
  IconInstagram,
  IconTelegram,
} from "@/components/common/icons/BrandIcons";
import StaticPageLayout from "@/components/common/StaticPageLayout/StaticPageLayout";
import Typography from "@/components/controls/Typography/Typography";

import "./ContactsPage.styles.scss";

const CONTACT_LINKS = [
  { icon: Phone, label: "+38 (000) 000-00-00", href: "tel:+380000000000" },
  {
    icon: Mail,
    label: "hello@myfairyplace.com",
    href: "mailto:hello@myfairyplace.com",
  },
  { icon: IconInstagram, label: "Instagram", href: "https://instagram.com" },
  { icon: IconTelegram, label: "Telegram", href: "https://t.me" },
];

const BASE_CLASS = "contacts-page";

function ContactsPage() {
  return (
    <StaticPageLayout
      title="Контакти"
      subtitle="Напишіть чи зателефонуйте — відповідаємо щодня"
    >
      <div className={BASE_CLASS}>
        {CONTACT_LINKS.map(({ icon: Icon, label, href }) => (
          <a key={href} href={href} className={`${BASE_CLASS}_link`}>
            <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
            <Typography variant="body1">{label}</Typography>
          </a>
        ))}
      </div>
    </StaticPageLayout>
  );
}

export default ContactsPage;
