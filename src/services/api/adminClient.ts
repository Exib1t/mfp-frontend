import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import { BFF_BASE_PATH } from "@/config/admin.config";
import type { paths } from "@/lib/api/v1";

/**
 * Admin calls are typed against the same spec as the storefront but travel
 * through the Next BFF, which injects the bearer token server-side.
 * Relative baseUrl — client components only.
 */
const adminFetchClient = createFetchClient<paths>({
  baseUrl: BFF_BASE_PATH,
});

export const $adminApi = createClient(adminFetchClient);
export { adminFetchClient };
