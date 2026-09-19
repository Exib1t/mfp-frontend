import type { ComponentPropsWithoutRef, ReactNode, Ref } from "react";
import { cn } from "@/lib/utils/cn";

import "./IconButton.styles.scss";

export type IconButtonVariant = "ghost" | "outline";
export type IconButtonSize = "sm" | "md";

interface IconButtonProps
  extends Omit<ComponentPropsWithoutRef<"button">, "aria-label"> {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  "aria-label": string;
  className?: string;
  children?: ReactNode;
  ref?: Ref<HTMLButtonElement>;
}

const BASE_CLASS = "icon-button";

function IconButton({
  variant = "ghost",
  size = "md",
  type = "button",
  className,
  children,
  ...rest
}: IconButtonProps) {
  return (
    <button
      type={type}
      className={cn(BASE_CLASS, className)}
      data-variant={variant}
      data-size={size}
      {...rest}
    >
      {children}
    </button>
  );
}

export default IconButton;
