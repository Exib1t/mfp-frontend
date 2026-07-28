import type { components } from "@/lib/api/v1";

export type AuthUser = components["schemas"]["AuthUserDto"];
export type LoginPayload = components["schemas"]["LoginDto"];
export type LoginResponse = components["schemas"]["LoginResponseDto"];
export type RefreshResponse = components["schemas"]["RefreshResponseDto"];

export interface SessionTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginFormState {
  error?: string;
}
