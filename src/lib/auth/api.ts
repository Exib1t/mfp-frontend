import "server-only";

import { API_URL } from "@/config/api.config";
import type {
  LoginPayload,
  LoginResponse,
  RefreshResponse,
} from "@/entities/auth/types";

interface Envelope<T> {
  data: T;
}

/** Exchanges credentials for a token pair. Returns null on bad credentials. */
export async function login(
  payload: LoginPayload,
): Promise<LoginResponse | null> {
  const response = await fetch(`${API_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!response.ok) return null;

  const body = (await response.json()) as Envelope<LoginResponse>;
  return body.data;
}

/** Trades a refresh token for a fresh access token. Null when it is spent. */
export async function refreshAccessToken(
  refreshToken: string,
): Promise<RefreshResponse | null> {
  const response = await fetch(`${API_URL}/api/v1/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
    cache: "no-store",
  });

  if (!response.ok) return null;

  const body = (await response.json()) as Envelope<RefreshResponse>;
  return body.data;
}

/** Best-effort server-side logout; ignores failures so the cookies still clear. */
export async function revokeRefreshToken(refreshToken: string): Promise<void> {
  try {
    await fetch(`${API_URL}/api/v1/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
      cache: "no-store",
    });
  } catch {
    // The cookie is cleared regardless — a stale refresh token is acceptable.
  }
}
