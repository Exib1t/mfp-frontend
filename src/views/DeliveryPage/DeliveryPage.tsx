import StaticPageLayout from "@/components/common/StaticPageLayout/StaticPageLayout";
import Typography from "@/components/controls/Typography/Typography";

import "./DeliveryPage.styles.scss";

const SECTIONS = [
  {
    title: "Доставка",
    body: "Відправляємо по всій Україні. Спосіб і вартість доставки узгоджуються з менеджером після оформлення замовлення.",
  },
  {
    title: "Оплата",
    body: "Приймаємо оплату при отриманні (готівка/карта кур'єру чи у відділенні) або онлайн — оберіть спосіб на кроці оформлення замовлення в кошику.",
  },
  {
    title: "Термін виготовлення",
    body: "Кожен виріб — handmade на замовлення. Точний термін виготовлення для вашого замовлення повідомляє менеджер після підтвердження.",
  },
  {
    title: "Повернення та обмін",
    body: "Якщо товар не підійшов — напишіть нам на пошту чи в Telegram, обговоримо повернення чи обмін індивідуально.",
  },
];

const BASE_CLASS = "delivery-page";

function DeliveryPage() {
  return (
    <StaticPageLayout title="Доставка і оплата">
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

export default DeliveryPage;
