import type { ReactNode } from "react";
import Typography from "@/components/controls/Typography/Typography";

import "./StaticPageLayout.styles.scss";

interface StaticPageLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

const BASE_CLASS = "static-page";

function StaticPageLayout({
  title,
  subtitle,
  children,
}: StaticPageLayoutProps) {
  return (
    <div className={BASE_CLASS}>
      <div className={`${BASE_CLASS}_inner`}>
        <div className={`${BASE_CLASS}_header`}>
          <Typography variant="h1" as="h1">
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body1" color="muted">
              {subtitle}
            </Typography>
          )}
        </div>

        <div className={`${BASE_CLASS}_content`}>{children}</div>
      </div>
    </div>
  );
}

export default StaticPageLayout;
