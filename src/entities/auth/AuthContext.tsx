"use client";

import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { $api, fetchClient } from "@/services/api/apiClient";
import { clearStoredAuth, getStoredAuth, setStoredAuth } from "./authStorage";
import type { AuthUser } from "./types";

// Refresh a bit before the access token actually expires.
const REFRESH_MARGIN_MS = 60_000;

interface AuthContextValue {
  user: AuthUser | null;
  isReady: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  // Hydrate from localStorage after mount to avoid SSR hydration mismatch.
  const [isReady, setIsReady] = useState(false);

  const loginMutation = $api.useMutation("post", "/api/v1/auth/login");
  const logoutMutation = $api.useMutation("post", "/api/v1/auth/logout");

  useEffect(() => {
    setUser(getStoredAuth()?.user ?? null);
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!user) return;

    const auth = getStoredAuth();
    if (!auth) return;

    const delay = Math.max(
      new Date(auth.access_expires_at).getTime() -
        Date.now() -
        REFRESH_MARGIN_MS,
      0,
    );

    const timer = setTimeout(async () => {
      try {
        const res = await fetchClient.POST("/api/v1/auth/refresh", {
          body: { refresh_token: auth.refresh_token },
        });
        if (res.error || !res.data) throw new Error("refresh failed");
        setStoredAuth({
          ...auth,
          access_token: res.data.data.access_token,
          access_expires_at: res.data.data.access_expires_at,
        });
      } catch {
        clearStoredAuth();
        setUser(null);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [user]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isReady,
      isAuthenticated: !!user,

      async login(email, password) {
        const res = await loginMutation.mutateAsync({
          body: { email, password },
        });
        const auth = res.data;
        if (auth.user.role !== "admin") {
          throw new Error("Недостатньо прав для доступу до панелі");
        }
        setStoredAuth(auth);
        setUser(auth.user);
      },

      logout() {
        const auth = getStoredAuth();
        if (auth) {
          logoutMutation.mutate({
            body: { refresh_token: auth.refresh_token },
          });
        }
        clearStoredAuth();
        setUser(null);
      },
    }),
    [user, isReady, loginMutation.mutateAsync, logoutMutation.mutate],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}

export default AuthProvider;
