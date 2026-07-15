import StaticPageLayout from "@/components/common/StaticPageLayout/StaticPageLayout";
import Typography from "@/components/controls/Typography/Typography";

import "./PrivacyPage.styles.scss";

const SECTIONS = [
  {
    title: "Які дані ми зберігаємо",
    body: "Кошик і налаштування конфігуратора зберігаються локально у вашому браузері. Під час оформлення замовлення ми отримуємо ім'я, email, телефон і адресу доставки — лише для обробки замовлення.",
  },
  {
    title: "Як ми використовуємо дані",
    body: "Дані замовлення використовуються виключно для зв'язку з вами, доставки товару та підтримки. Ми не передаємо ваші дані третім особам, окрім служб доставки.",
  },
  {
    title: "Зв'язок з нами",
    body: "Питання щодо ваших даних можна надіслати на hello@myfairyplace.com.",
  },
];

const BASE_CLASS = "privacy-page";

function PrivacyPage() {
  return (
    <StaticPageLayout title="Політика конфіденційності">
      <div className={BASE_CLASS}>
        {SECTIONS.map(({ title, body }) => (
          <div key={title} className={`${BASE_CLASS}_section`}>
            <Typography variant="h4" as="h2">
              {title}
            </Typography>
            <Typography variant="body1" color="muted">
              {body}
            </Typography>
          </div>
        ))}
      </div>
    </StaticPageLayout>
  );
}

export default PrivacyPage;
