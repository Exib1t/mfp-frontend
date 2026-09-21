/**
 * HTTP status of a failed `$api` call. openapi-react-query throws the parsed
 * error body rather than the response, and the API puts the status there as
 * `statusCode`.
 */
export function getApiErrorStatus(error: unknown): number | undefined {
  if (typeof error !== "object" || error === null) return undefined;

  const { statusCode } = error as { statusCode?: unknown };
  return typeof statusCode === "number" ? statusCode : undefined;
}

/** The API allows only a few writes per minute from one client (orders, reviews). */
export function isRateLimited(error: unknown): boolean {
  return getApiErrorStatus(error) === 429;
}
