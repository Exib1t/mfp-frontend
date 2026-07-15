import {
  type ComponentPropsWithoutRef,
  type ElementType,
  forwardRef,
  type ReactElement,
  type Ref,
} from "react";
import { cn } from "@/lib/utils/cn";

import "./Input.styles.scss";

type InputTag = "input" | "textarea";
type InputElement = HTMLInputElement | HTMLTextAreaElement;

type InputProps<E extends InputTag> = {
  as?: E;
  className?: string;
} & Omit<ComponentPropsWithoutRef<E>, "as" | "className">;

const BASE_CLASS = "input";

const InputImpl = forwardRef<InputElement, InputProps<InputTag>>(function Input(
  { as, className, ...rest },
  ref,
) {
  const Component = (as ?? "input") as ElementType;

  return (
    <Component ref={ref} className={cn(BASE_CLASS, className)} {...rest} />
  );
});

// Re-cast to preserve per-call generic inference (e.g. `as="textarea"` -> `rows` typed)
// lost by forwardRef's non-generic signature.
const Input = InputImpl as <E extends InputTag = "input">(
  props: InputProps<E> & { ref?: Ref<InputElement> },
) => ReactElement;

export default Input;
