import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Button from "@/components/controls/Button/Button";
import Typography from "@/components/controls/Typography/Typography";

import "./CtaBanner.styles.scss";

const BASE_CLASS = "cta-banner";

function CtaBanner() {
  return (
    <section className={BASE_CLASS}>
      <div className={`${BASE_CLASS}_inner`}>
        <div className={`${BASE_CLASS}_text`}>
          <Typography variant="overline" className={`${BASE_CLASS}_overline`}>
            Handmade · Україна
          </Typography>
          <Typography variant="h2" as="h2" className={`${BASE_CLASS}_title`}>
            Знайдіть вігвам своєї мрії
          </Typography>
          <Typography variant="body1" className={`${BASE_CLASS}_subtitle`}>
            Готові вироби, подушки та аксесуари ручної роботи — все в одному
            каталозі.
          </Typography>
        </div>
        <Button
          as={Link}
          href="/products"
          size="lg"
          variant="outline"
          className={`${BASE_CLASS}_btn`}
        >
          Переглянути каталог
          <ArrowRight size={18} strokeWidth={2} />
        </Button>
      </div>
    </section>
  );
}

export default CtaBanner;
