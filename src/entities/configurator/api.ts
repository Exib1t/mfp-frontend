import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/config/api.config";
import type { ConfiguratorOption } from "./types";

export const BASE_PRICE = 2800;
export const NAME_PRICE = 150;

export function useConfiguratorOptions(type?: string) {
  return useQuery<ConfiguratorOption[]>({
    queryKey: ["configurator-options", type ?? "all"],
    queryFn: async () => {
      const url = new URL(`${API_URL}/api/v1/configurator/options`);
      if (type) url.searchParams.set("type", type);
      const res = await fetch(url.toString());
      if (!res.ok) throw new Error("Failed to fetch configurator options");
      const { data } = (await res.json()) as { data: ConfiguratorOption[] };
      return data;
    },
    staleTime: Infinity,
  });
}
