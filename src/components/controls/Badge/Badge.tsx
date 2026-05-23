import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

import "./Badge.styles.css";

export type BadgeVariant =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "error";
export type BadgeSize = "sm" | "md";

type BadgeProps = {
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  children?: ReactNode;
};

function Badge({
  variant = "default",
  size = "md",
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cn("badge", className)}
      data-variant={variant}
      data-size={size}
    >
      {children}
    </span>
  );
}

export default Badge;
