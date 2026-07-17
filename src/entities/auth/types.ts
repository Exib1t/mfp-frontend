export interface AuthUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: "admin" | "user";
  created_at: string;
}

export interface StoredAuth {
  user: AuthUser;
  access_token: string;
  refresh_token: string;
  access_expires_at: string;
}
