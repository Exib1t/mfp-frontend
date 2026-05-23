import Link from "next/link";
import Badge from "@/components/controls/Badge/Badge";
import Button from "@/components/controls/Button/Button";
import Typography from "@/components/controls/Typography/Typography";
import ProductCard from "@/components/organisms/products/ProductCard/ProductCard";
import { MOCK_PRODUCTS } from "@/entities/products/mocks";
import "./ui.styles.scss";

const SECTION_CLASS = "ui-section";
const ROW_CLASS = "ui-row";
const PAGE_CLASS = "ui-page";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className={SECTION_CLASS}>
      <Typography variant="h3" as="h2" className={`${SECTION_CLASS}_title`}>
        {title}
      </Typography>
      <div className={`${SECTION_CLASS}_body`}>{children}</div>
    </section>
  );
}

function Row({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className={ROW_CLASS}>
      {label && (
        <Typography variant="caption" color="muted" className={`${ROW_CLASS}_label`}>
          {label}
        </Typography>
      )}
      <div className={`${ROW_CLASS}_items`}>{children}</div>
    </div>
  );
}

export default function UiPage() {
  return (
    <main className={PAGE_CLASS}>
      <div className={`${PAGE_CLASS}_inner`}>
        <Typography variant="h1" as="h1" className={`${PAGE_CLASS}_heading`}>
          UI Kit
        </Typography>
        <Typography variant="body1" color="muted">
          Всі компоненти проекту в одному місці.
        </Typography>

        {/* ─── Typography ─── */}
        <Section title="Typography">
          <Row label="variants">
            <Typography variant="h1">h1 — Заголовок</Typography>
            <Typography variant="h2">h2 — Заголовок</Typography>
            <Typography variant="h3">h3 — Заголовок</Typography>
            <Typography variant="h4">h4 — Заголовок</Typography>
            <Typography variant="h5">h5 — Заголовок</Typography>
            <Typography variant="h6">h6 — Заголовок</Typography>
            <Typography variant="subtitle1">subtitle1 — Підзаголовок</Typography>
            <Typography variant="subtitle2">subtitle2 — Підзаголовок</Typography>
            <Typography variant="body1">body1 — Основний текст параграфу</Typography>
            <Typography variant="body2">body2 — Допоміжний текст параграфу</Typography>
            <Typography variant="caption">caption — Підпис</Typography>
            <Typography variant="overline">overline — Надпис</Typography>
            <Typography variant="label">label — Лейбл форми</Typography>
          </Row>
          <Row label="colors">
            <Typography variant="body1" color="foreground">foreground</Typography>
            <Typography variant="body1" color="primary">primary</Typography>
            <Typography variant="body1" color="muted">muted</Typography>
            <Typography variant="body1" color="error">error</Typography>
            <Typography variant="body1" color="success">success</Typography>
            <Typography variant="body1" color="warning">warning</Typography>
          </Row>
          <Row label="weights">
            <Typography variant="body1" weight="regular">regular 400</Typography>
            <Typography variant="body1" weight="medium">medium 500</Typography>
            <Typography variant="body1" weight="semibold">semibold 600</Typography>
            <Typography variant="body1" weight="bold">bold 700</Typography>
          </Row>
          <Row label="truncate">
            <Typography variant="body1" truncate className="ui-truncate-demo">
              Дуже довгий текст який буде обрізаний через overflow hidden і white-space nowrap і text-overflow ellipsis
            </Typography>
          </Row>
        </Section>

        {/* ─── Button ─── */}
        <Section title="Button">
          <Row label="variants">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="outline">Outline</Button>
          </Row>
          <Row label="sizes">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </Row>
          <Row label="states">
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
            <Button fullWidth>Full width</Button>
          </Row>
          <Row label="as link">
            <Button as={Link} href="/products" variant="primary">До каталогу</Button>
            <Button as={Link} href="/products" variant="secondary">До каталогу</Button>
          </Row>
          <Row label="on dark bg">
            <div className="ui-dark-bg">
              <Button variant="outline">Outline on dark</Button>
              <Button variant="ghost">Ghost on dark</Button>
            </div>
          </Row>
        </Section>

        {/* ─── Badge ─── */}
        <Section title="Badge">
          <Row label="variants">
            <Badge variant="default">Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
          </Row>
          <Row label="sizes">
            <Badge size="sm">Small</Badge>
            <Badge size="md">Medium</Badge>
          </Row>
        </Section>

        {/* ─── ProductCard ─── */}
        <Section title="ProductCard">
          <div className="ui-product-grid">
            {MOCK_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Section>
      </div>
    </main>
  );
}
