import { Heart, Ruler, Sparkles, Wand2 } from "lucide-react";
import Link from "next/link";
import StaticPageLayout from "@/components/common/StaticPageLayout/StaticPageLayout";
import Button from "@/components/controls/Button/Button";
import Typography from "@/components/controls/Typography/Typography";

import "./AboutPage.styles.scss";

const VALUES = [
  {
    icon: Heart,
    title: "Ручна робота",
    text: "Кожен виріб шиється вручну, а не штампується на потоці.",
  },
  {
    icon: Sparkles,
    title: "Натуральні матеріали",
    text: "Бавовна, льон і безпечні для дітей тканини та фурнітура.",
  },
  {
    icon: Ruler,
    title: "Під розмір",
    text: "Розміри й комплектація підбираються під простір і вік дитини.",
  },
  {
    icon: Wand2,
    title: "Персоналізація",
    text: "Колір, тканина, аксесуари та вишивка імені — на вибір у конфігураторі.",
  },
];

const BASE_CLASS = "about-page";

function AboutPage() {
  return (
    <StaticPageLayout
      title="Про нас"
      subtitle="Handmade вігвами та дитячий текстиль з натуральних матеріалів"
    >
      <Typography variant="body1">
        My Fairy Place — майстерня дитячих вігвамів і текстилю. Ми створюємо
        простір для гри й фантазії: кожен вігвам шиється на замовлення, з увагою
        до деталей і безпеки дитини.
      </Typography>

      <div className={`${BASE_CLASS}_values`}>
        {VALUES.map(({ icon: Icon, title, text }) => (
          <div key={title} className={`${BASE_CLASS}_value`}>
            <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
            <Typography variant="subtitle2" as="h3">
              {title}
            </Typography>
            <Typography variant="body2" color="muted">
              {text}
            </Typography>
          </div>
        ))}
      </div>

      <div className={`${BASE_CLASS}_cta`}>
        <Button as={Link} href="/products">
          Переглянути каталог
        </Button>
      </div>
    </StaticPageLayout>
  );
}

export default AboutPage;
