import Link from "next/link";
import Typography from "@/components/controls/Typography/Typography";

import "../../ProductPage.styles.scss";

interface BreadcrumbProps {
  productName: string;
}

const BASE_CLASS = "product-page";

function Breadcrumb({ productName }: BreadcrumbProps) {
  return (
    <nav className={`${BASE_CLASS}_breadcrumb`} aria-label="Хлібні крихти">
      <Link href="/" className={`${BASE_CLASS}_breadcrumb-link`}>
        <Typography variant="caption" color="muted">
          Головна
        </Typography>
      </Link>
      <Typography
        variant="caption"
        color="muted"
        className={`${BASE_CLASS}_breadcrumb-sep`}
      >
        /
      </Typography>
      <Link href="/products" className={`${BASE_CLASS}_breadcrumb-link`}>
        <Typography variant="caption" color="muted">
          Каталог
        </Typography>
      </Link>
      <Typography
        variant="caption"
        color="muted"
        className={`${BASE_CLASS}_breadcrumb-sep`}
      >
        /
      </Typography>
      <Typography variant="caption" color="foreground">
        {productName}
      </Typography>
    </nav>
  );
}

export default Breadcrumb;
