import Image from "next/image";
import Link from "next/link";
import heroImage from "@/assets/images/hero.jpg";
import Button from "@/components/controls/Button/Button";
import Typography from "@/components/controls/Typography/Typography";

import "./HeroSection.styles.scss";

const BASE_CLASS = "hero-section";

const TRUST_ITEMS = [
  "Натуральні матеріали",
  "Ручна робота",
  "Гарантія якості",
];

function HeroSection() {
  return (
    <section className={BASE_CLASS}>
      <div className={`${BASE_CLASS}_content`}>
        <Typography variant="overline" color="primary">
          Handmade · Натуральні матеріали
        </Typography>
        <Typography variant="h1" as="h1" className={`${BASE_CLASS}_title`}>
          Чарівний простір для вашої дитини
        </Typography>
        <Typography
          variant="body1"
          color="muted"
          className={`${BASE_CLASS}_subtitle`}
        >
          Вігвами, подушки та аксесуари ручної роботи. Кожен виріб створений з
          любов&apos;ю та увагою до деталей.
        </Typography>
        <div className={`${BASE_CLASS}_actions`}>
          <Button as={Link} href="/products" size="lg">
            Переглянути каталог
          </Button>
          <Button as={Link} href="/configure" variant="secondary" size="lg">
            Зібрати вігвам
          </Button>
        </div>
        <ul className={`${BASE_CLASS}_trust`}>
          {TRUST_ITEMS.map((item) => (
            <li key={item} className={`${BASE_CLASS}_trust-item`}>
              <span className={`${BASE_CLASS}_trust-mark`} aria-hidden="true">✦</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className={`${BASE_CLASS}_media`}>
        <div className={`${BASE_CLASS}_image-wrap`}>
          <Image
            className={`${BASE_CLASS}_image`}
            src={heroImage}
            alt="Дитячий вігвам"
            fill
            priority
            sizes="50vw"
          />
          <div className={`${BASE_CLASS}_image-badge`}>
            <Typography variant="overline">Нова колекція</Typography>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
