import Link from "next/link";
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
            Конфігуратор вігваму
          </Typography>
          <Typography variant="h2" as="h2" className={`${BASE_CLASS}_title`}>
            Зберіть свій унікальний вігвам
          </Typography>
          <Typography variant="body1" className={`${BASE_CLASS}_subtitle`}>
            Обирайте тканину, подушки, прапорці та аксесуари — і побачте
            результат одразу.
          </Typography>
        </div>
        <Button
          as={Link}
          href="/products"
          size="lg"
          variant="outline"
          className={`${BASE_CLASS}_btn`}
        >
          Перейти до каталогу
        </Button>
      </div>
    </section>
  );
}

export default CtaBanner;
