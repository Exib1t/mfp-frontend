import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Wand2 } from "lucide-react";
import heroImage from "@/assets/images/hero.png";
import Button from "@/components/controls/Button/Button";
import Typography from "@/components/controls/Typography/Typography";

import "./HeroSection.styles.scss";

const BASE_CLASS = "hero-section";

const TRUST_ITEMS = ["Натуральні матеріали", "Ручна робота", "Гарантія якості"];

function HeroSection() {
  return (
    <section className={BASE_CLASS}>
      <div className={`${BASE_CLASS}_media`}>
        <Image
          className={`${BASE_CLASS}_image`}
          src={heroImage}
          alt="Дитячий вігвам"
          fill
          priority
          sizes="100vw"
        />
        <div className={`${BASE_CLASS}_badge`}>
          <Typography variant="overline">Нова колекція</Typography>
        </div>
      </div>

      <div className={`${BASE_CLASS}_content`}>
        <Typography variant="overline" color="primary">
          Handmade · Натуральні матеріали
        </Typography>
        <Typography variant="h1" as="h1" className={`${BASE_CLASS}_title`}>
          Чарівний простір для вашої дитини
        </Typography>
        <Typography
          variant="body1"
          className={`${BASE_CLASS}_subtitle`}
        >
          Вігвами, подушки та аксесуари ручної роботи. Кожен виріб створений з
          любов&apos;ю та увагою до деталей.
        </Typography>
        <div className={`${BASE_CLASS}_actions`}>
          <Button as={Link} href="/products" size="lg" fullWidth>
            Переглянути каталог
            <ArrowRight size={18} strokeWidth={2} />
          </Button>
          <Button
            as={Link}
            href="/configurator"
            variant="secondary"
            size="lg"
            fullWidth
          >
            <Wand2 size={18} strokeWidth={2} />
            Зібрати вігвам
          </Button>
        </div>
        <ul className={`${BASE_CLASS}_trust`}>
          {TRUST_ITEMS.map((item) => (
            <li key={item} className={`${BASE_CLASS}_trust-item`}>
              <span className={`${BASE_CLASS}_trust-mark`} aria-hidden="true">
                ✦
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default HeroSection;
