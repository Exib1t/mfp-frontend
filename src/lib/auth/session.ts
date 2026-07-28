import "server-only";

import { cookies } from "next/headers";
import {
  ADMIN_ACCESS_COOKIE,
  ADMIN_REFRESH_COOKIE,
  REFRESH_COOKIE_MAX_AGE,
} from "@/config/admin.config";
import type { SessionTokens } from "@/entities/auth/types";

const BASE_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
} as const;

export async function readSession(): Promise<SessionTokens | null> {
  const store = await cookies();
  const accessToken = store.get(ADMIN_ACCESS_COOKIE)?.value;
  const refreshToken = store.get(ADMIN_REFRESH_COOKIE)?.value;

  if (!accessToken || !refreshToken) return null;
  return { accessToken, refreshToken };
}

export async function writeSession(tokens: SessionTokens): Promise<void> {
  const store = await cookies();
  // The access cookie is a session cookie: it dies with the browser session,
  // and the refresh cookie is what actually keeps the admin signed in.
  store.set(ADMIN_ACCESS_COOKIE, tokens.accessToken, BASE_COOKIE_OPTIONS);
  store.set(ADMIN_REFRESH_COOKIE, tokens.refreshToken, {
    ...BASE_COOKIE_OPTIONS,
    maxAge: REFRESH_COOKIE_MAX_AGE,
  });
}

export async function writeAccessToken(accessToken: string): Promise<void> {
  const store = await cookies();
  store.set(ADMIN_ACCESS_COOKIE, accessToken, BASE_COOKIE_OPTIONS);
}

export async function clearSession(): Promise<void> {
  const store = await cookies();
  store.delete(ADMIN_ACCESS_COOKIE);
  store.delete(ADMIN_REFRESH_COOKIE);
}
