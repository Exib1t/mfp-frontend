import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import { API_URL } from "@/config/api.config";
import type { paths } from "@/lib/api/v1";

const fetchClient = createFetchClient<paths>({
  baseUrl: API_URL,
});

export const $api = createClient(fetchClient);
