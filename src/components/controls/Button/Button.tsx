import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

import "./Button.styles.scss";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "link"
  | "outline";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  isActive?: boolean;
}

type ButtonProps<E extends ElementType> = ButtonBaseProps & {
  as?: E;
  className?: string;
  children?: ReactNode;
} & Omit<
    ComponentPropsWithoutRef<E>,
    keyof ButtonBaseProps | "as" | "className" | "children"
  >;

const BASE_CLASS = "button";

function Button<E extends ElementType = "button">({
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  disabled = false,
  isActive = false,
  as,
  className,
  children,
  ...rest
}: ButtonProps<E>) {
  const Component = (as ?? "button") as ElementType;
  const isDisabled = disabled || loading;

  return (
    <Component
      className={cn(BASE_CLASS, className, {
        "-loading": loading,
        "-disabled": isDisabled,
        "-full-width": fullWidth,
        "-active": isActive,
      })}
      data-variant={variant}
      data-size={size}
      {...rest}
      {...(isDisabled && { disabled: true })}
    >
      {loading && (
        <span className={`${BASE_CLASS}_spinner`} aria-hidden="true" />
      )}
      <span className={`${BASE_CLASS}_label`}>{children}</span>
    </Component>
  );
}

export default Button;
