"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/(admin)/admin/actions";
import AdminField from "@/components/admin/AdminField/AdminField";
import Button from "@/components/controls/Button/Button";
import Input from "@/components/controls/Input/Input";
import Typography from "@/components/controls/Typography/Typography";
import type { LoginFormState } from "@/entities/auth/types";

import "./AdminLoginForm.styles.scss";

const BASE_CLASS = "admin-login";
const INITIAL_STATE: LoginFormState = {};

function AdminLoginForm() {
  const [state, action, isPending] = useActionState(loginAction, INITIAL_STATE);

  return (
    <div className={BASE_CLASS}>
      <form className={`${BASE_CLASS}_card`} action={action}>
        <Typography variant="h3" as="h1" className={`${BASE_CLASS}_title`}>
          Адмінпанель
        </Typography>

        <AdminField htmlFor="admin-login-email" label="Email">
          <Input
            id="admin-login-email"
            name="email"
            type="email"
            autoComplete="username"
            required
            disabled={isPending}
          />
        </AdminField>

        <AdminField htmlFor="admin-login-password" label="Пароль">
          <Input
            id="admin-login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            disabled={isPending}
          />
        </AdminField>

        {state.error && (
          <Typography variant="body2" className={`${BASE_CLASS}_error`}>
            {state.error}
          </Typography>
        )}

        <Button type="submit" fullWidth disabled={isPending}>
          {isPending ? "Вхід…" : "Увійти"}
        </Button>
      </form>
    </div>
  );
}

export default AdminLoginForm;
