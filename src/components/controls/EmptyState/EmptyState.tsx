import type { ElementType, ReactNode } from "react";
import Typography from "@/components/controls/Typography/Typography";
import { cn } from "@/lib/utils/cn";

import "./EmptyState.styles.scss";

interface EmptyStateProps {
  title: string;
  titleAs?: ElementType;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

const BASE_CLASS = "empty-state";

function EmptyState({
  title,
  titleAs = "p",
  description,
  icon,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn(BASE_CLASS, className)}>
      {icon && <div className={`${BASE_CLASS}_icon`}>{icon}</div>}
      <Typography variant="h3" as={titleAs}>
        {title}
      </Typography>
      {description && (
        <Typography variant="body1" color="muted">
          {description}
        </Typography>
      )}
      {action && <div className={`${BASE_CLASS}_action`}>{action}</div>}
    </div>
  );
}

export default EmptyState;
