import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import { API_URL } from "@/config/api.config";
import { clearStoredAuth, getStoredAuth } from "@/entities/auth/authStorage";
import type { paths } from "@/lib/api/v1";

export const fetchClient = createFetchClient<paths>({
  baseUrl: API_URL,
});

fetchClient.use({
  onRequest({ request }) {
    const auth = getStoredAuth();
    if (auth)
      request.headers.set("Authorization", `Bearer ${auth.access_token}`);
    return request;
  },
  onResponse({ response }) {
    if (
      response.status === 401 &&
      typeof window !== "undefined" &&
      window.location.pathname.startsWith("/admin") &&
      window.location.pathname !== "/admin/login"
    ) {
      clearStoredAuth();
      window.location.href = "/admin/login";
    }
    return response;
  },
});

export const $api = createClient(fetchClient);
