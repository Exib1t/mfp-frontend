import { type ComponentPropsWithoutRef, forwardRef } from "react";
import Typography from "@/components/controls/Typography/Typography";
import { cn } from "@/lib/utils/cn";

import "./AdminCheckbox.styles.scss";

interface AdminCheckboxProps
  extends Omit<ComponentPropsWithoutRef<"input">, "type" | "className"> {
  label: string;
  hint?: string;
  className?: string;
}

const BASE_CLASS = "admin-checkbox";

/** Boolean toggle wired for `register()` — the label wraps the input itself. */
const AdminCheckbox = forwardRef<HTMLInputElement, AdminCheckboxProps>(
  function AdminCheckbox({ label, hint, className, ...rest }, ref) {
    return (
      <label className={cn(BASE_CLASS, className)}>
        <input
          ref={ref}
          type="checkbox"
          className={`${BASE_CLASS}_input`}
          {...rest}
        />
        <span className={`${BASE_CLASS}_text`}>
          <span className={`${BASE_CLASS}_label`}>{label}</span>
          {hint && (
            <Typography variant="caption" color="muted">
              {hint}
            </Typography>
          )}
        </span>
      </label>
    );
  },
);

export default AdminCheckbox;
