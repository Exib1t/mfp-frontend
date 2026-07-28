"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { ADMIN_HOME_PATH, ADMIN_LOGIN_PATH } from "@/config/admin.config";
import type { LoginFormState } from "@/entities/auth/types";
import { login, revokeRefreshToken } from "@/lib/auth/api";
import { clearSession, readSession, writeSession } from "@/lib/auth/session";

const LoginSchema = z.object({
  email: z.email({ error: "Введіть коректний email" }),
  password: z.string().min(1, { error: "Введіть пароль" }),
});

export async function loginAction(
  _state: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const parsed = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Перевірте дані" };
  }

  const result = await login(parsed.data);
  if (!result) return { error: "Невірний email або пароль" };

  // The panel is admin-only; a valid customer login must not open it.
  if (result.user.role !== "admin") {
    return { error: "Недостатньо прав для входу в адмінпанель" };
  }

  await writeSession({
    accessToken: result.access_token,
    refreshToken: result.refresh_token,
  });

  redirect(ADMIN_HOME_PATH);
}

export async function logoutAction(): Promise<void> {
  const session = await readSession();
  if (session) await revokeRefreshToken(session.refreshToken);
  await clearSession();
  redirect(ADMIN_LOGIN_PATH);
}
