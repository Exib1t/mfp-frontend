import { $api } from "@/services/api/apiClient";

/** Slug of the preset behind the standalone `/configurator` page. */
export const DEFAULT_CONFIGURATOR_SLUG = "wigwam";

/** One preset with its full group tree (public, active groups only). */
export function useConfigurator(slug: string | undefined) {
  return $api.useQuery(
    "get",
    "/api/v1/configurators/{slug}",
    { params: { path: { slug: slug ?? "" } } },
    { enabled: Boolean(slug), select: (res) => res.data },
  );
}

export function useConfigurators() {
  return $api.useQuery(
    "get",
    "/api/v1/configurators",
    {},
    { select: (res) => res.data },
  );
}
