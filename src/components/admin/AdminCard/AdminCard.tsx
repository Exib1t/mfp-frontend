import type { ReactNode } from "react";
import Typography from "@/components/controls/Typography/Typography";
import { cn } from "@/lib/utils/cn";

import "./AdminCard.styles.scss";

interface AdminCardProps {
  title?: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
  children: ReactNode;
}

const BASE_CLASS = "admin-card";

/** Bordered section used to group fields inside admin forms. */
function AdminCard({
  title,
  description,
  actions,
  className,
  children,
}: AdminCardProps) {
  return (
    <section className={cn(BASE_CLASS, className)}>
      {(title || actions) && (
        <div className={`${BASE_CLASS}_head`}>
          <div className={`${BASE_CLASS}_head-text`}>
            {title && (
              <Typography
                variant="subtitle1"
                as="h2"
                className={`${BASE_CLASS}_title`}
              >
                {title}
              </Typography>
            )}
            {description && (
              <Typography variant="caption" color="muted">
                {description}
              </Typography>
            )}
          </div>
          {actions && <div className={`${BASE_CLASS}_actions`}>{actions}</div>}
        </div>
      )}

      <div className={`${BASE_CLASS}_body`}>{children}</div>
    </section>
  );
}

export default AdminCard;
