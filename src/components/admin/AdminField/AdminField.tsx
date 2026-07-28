import type { ReactNode } from "react";
import Typography from "@/components/controls/Typography/Typography";
import { cn } from "@/lib/utils/cn";

import "./AdminField.styles.scss";

interface AdminFieldProps {
  /** Must match the `id` of the control rendered as `children`. */
  htmlFor: string;
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}

const BASE_CLASS = "admin-field";

/** Label + control + hint/error, the building block of every admin form. */
function AdminField({
  htmlFor,
  label,
  hint,
  error,
  className,
  children,
}: AdminFieldProps) {
  return (
    <div className={cn(BASE_CLASS, className, { "-invalid": Boolean(error) })}>
      <label className={`${BASE_CLASS}_label`} htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {error ? (
        <Typography variant="caption" className={`${BASE_CLASS}_error`}>
          {error}
        </Typography>
      ) : (
        hint && (
          <Typography variant="caption" color="muted">
            {hint}
          </Typography>
        )
      )}
    </div>
  );
}

export default AdminField;
