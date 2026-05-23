import type { LucideIcon } from "lucide-react";
import { Leaf, Palette, Scissors, Truck } from "lucide-react";
import Typography from "@/components/controls/Typography/Typography";

import "./UspSection.styles.scss";

interface UspItem {
  icon: LucideIcon;
  title: string;
  text: string;
}

const USP_ITEMS: UspItem[] = [
  {
    icon: Scissors,
    title: "Ручна робота",
    text: "Кожен виріб виготовляється вручну з увагою до кожної деталі.",
  },
  {
    icon: Palette,
    title: "Ваш дизайн",
    text: "Обирайте тканину, кольори та аксесуари — зробіть унікальний вігвам.",
  },
  {
    icon: Leaf,
    title: "Натуральні матеріали",
    text: "Тільки безпечні та екологічні тканини, сертифіковані для дітей.",
  },
  {
    icon: Truck,
    title: "Доставка по Україні",
    text: "Відправляємо Новою Поштою та Укрпоштою. Виробництво 3–7 днів.",
  },
];

const BASE_CLASS = "usp-section";

function UspSection() {
  return (
    <section className={BASE_CLASS}>
      <div className={`${BASE_CLASS}_inner`}>
        <div className={`${BASE_CLASS}_header`}>
          <Typography variant="overline" color="muted">
            Чому обирають нас
          </Typography>
          <Typography variant="h2" as="h2">
            Якість у кожній деталі
          </Typography>
        </div>

        <div className={`${BASE_CLASS}_grid`}>
          {USP_ITEMS.map(({ icon: Icon, title, text }) => (
            <div key={title} className={`${BASE_CLASS}_item`}>
              <div className={`${BASE_CLASS}_icon`}>
                <Icon size={24} strokeWidth={1.5} />
              </div>
              <Typography variant="h6" as="h3">
                {title}
              </Typography>
              <Typography variant="body2" color="muted">
                {text}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default UspSection;
