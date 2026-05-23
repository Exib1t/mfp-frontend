import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

import "./Badge.styles.scss";

export type BadgeVariant =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "error";
export type BadgeSize = "sm" | "md";

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  children?: ReactNode;
}

const BASE_CLASS = "badge";

function Badge({
  variant = "default",
  size = "md",
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cn(BASE_CLASS, className)}
      data-variant={variant}
      data-size={size}
    >
      {children}
    </span>
  );
}

export default Badge;
