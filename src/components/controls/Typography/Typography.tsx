import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import "./Typography.styles.scss";

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "caption"
  | "overline"
  | "label";

export type TypographyColor =
  | "foreground"
  | "primary"
  | "muted"
  | "error"
  | "success"
  | "warning"
  | "background";

export type TypographyWeight = "regular" | "medium" | "semibold" | "bold";

export type TypographyAlign = "left" | "center" | "right" | "justify";

const VARIANT_TAG: Record<TypographyVariant, ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subtitle1: "p",
  subtitle2: "p",
  body1: "p",
  body2: "p",
  caption: "span",
  overline: "span",
  label: "label",
};

interface TypographyBaseProps {
  variant?: TypographyVariant;
  color?: TypographyColor;
  weight?: TypographyWeight;
  align?: TypographyAlign;
  truncate?: boolean;
}

type TypographyProps<E extends ElementType> = TypographyBaseProps & {
  as?: E;
  className?: string;
  children?: ReactNode;
} & Omit<
    ComponentPropsWithoutRef<E>,
    keyof TypographyBaseProps | "as" | "className" | "children"
  >;

const BASE_CLASS = "typography";

function Typography<E extends ElementType = "p">({
  variant = "body1",
  color,
  weight,
  align,
  truncate,
  as,
  className,
  children,
  ...rest
}: TypographyProps<E>) {
  const Component = (as ?? VARIANT_TAG[variant]) as ElementType;

  return (
    <Component
      className={cn(BASE_CLASS, className, { "-truncate": truncate })}
      data-variant={variant}
      data-color={color}
      data-weight={weight}
      data-align={align}
      {...rest}
    >
      {children}
    </Component>
  );
}

export default Typography;
