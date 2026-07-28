import type { ReactNode } from "react";
import Typography from "@/components/controls/Typography/Typography";
import { cn } from "@/lib/utils/cn";

import "./AdminPageHeader.styles.scss";

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  /** Buttons rendered on the trailing edge. */
  actions?: ReactNode;
  className?: string;
}

const BASE_CLASS = "admin-page-header";

function AdminPageHeader({
  title,
  description,
  actions,
  className,
}: AdminPageHeaderProps) {
  return (
    <header className={cn(BASE_CLASS, className)}>
      <div className={`${BASE_CLASS}_text`}>
        <Typography variant="h3" as="h1" className={`${BASE_CLASS}_title`}>
          {title}
        </Typography>
        {description && (
          <Typography variant="body2" color="muted">
            {description}
          </Typography>
        )}
      </div>

      {actions && <div className={`${BASE_CLASS}_actions`}>{actions}</div>}
    </header>
  );
}

export default AdminPageHeader;
