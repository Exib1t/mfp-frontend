import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

import "./Button.styles.css";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "link";
export type ButtonSize = "sm" | "md" | "lg";

type ButtonOwnProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
};

type ButtonProps<E extends ElementType> = ButtonOwnProps & {
  as?: E;
  className?: string;
  children?: ReactNode;
} & Omit<
    ComponentPropsWithoutRef<E>,
    keyof ButtonOwnProps | "as" | "className" | "children"
  >;

function Button<E extends ElementType = "button">({
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  disabled = false,
  as,
  className,
  children,
  ...rest
}: ButtonProps<E>) {
  const Component = (as ?? "button") as ElementType;
  const isDisabled = disabled || loading;

  return (
    <Component
      className={cn("button", className, {
        "-loading": loading,
        "-disabled": isDisabled,
        "-full-width": fullWidth,
      })}
      data-variant={variant}
      data-size={size}
      {...rest}
      {...(isDisabled && { disabled: true })}
    >
      <span className="button_spinner" aria-hidden="true" />
      <span className="button_label">{children}</span>
    </Component>
  );
}

export default Button;
