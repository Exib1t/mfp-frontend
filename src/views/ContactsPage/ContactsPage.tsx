import { Mail, Phone } from "lucide-react";
import type { ElementType } from "react";
import {
  IconInstagram,
  IconTelegram,
} from "@/components/common/icons/BrandIcons";
import StaticPageLayout from "@/components/common/StaticPageLayout/StaticPageLayout";
import Typography from "@/components/controls/Typography/Typography";
import { CONTACTS } from "@/config/contacts.config";

import "./ContactsPage.styles.scss";

interface ContactLink {
  icon: ElementType;
  label: string;
  href: string;
  isExternal?: boolean;
}

const CONTACT_LINKS: ContactLink[] = [
  { icon: Phone, ...CONTACTS.phone },
  { icon: Mail, ...CONTACTS.email },
  { icon: IconInstagram, ...CONTACTS.instagram, isExternal: true },
  { icon: IconTelegram, ...CONTACTS.telegram, isExternal: true },
];

const BASE_CLASS = "contacts-page";

function ContactsPage() {
  return (
    <StaticPageLayout
      title="Контакти"
      subtitle="Напишіть чи зателефонуйте — відповідаємо щодня"
    >
      <div className={BASE_CLASS}>
        {CONTACT_LINKS.map(({ icon: Icon, label, href, isExternal }) => (
          <a
            key={href}
            href={href}
            className={`${BASE_CLASS}_link`}
            {...(isExternal
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
            <Typography variant="body1">{label}</Typography>
          </a>
        ))}
      </div>
    </StaticPageLayout>
  );
}

export default ContactsPage;
