import type { components } from "@/lib/api/v1";

export type AdminUser = components["schemas"]["UserDto"];
export type UserRole = AdminUser["role"];

export type CreateUserPayload = components["schemas"]["CreateUserDto"];
export type UpdateUserPayload = components["schemas"]["UpdateUserDto"];

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  admin: "Адміністратор",
  user: "Користувач",
};

export const USER_ROLE_OPTIONS = [
  { value: "user", label: USER_ROLE_LABELS.user },
  { value: "admin", label: USER_ROLE_LABELS.admin },
] as const;

export function fullName(user: AdminUser): string {
  return `${user.first_name} ${user.last_name}`.trim() || user.email;
}
