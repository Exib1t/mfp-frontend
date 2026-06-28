const rawApiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

// openapi-fetch joins baseUrl + path ("/api/v1/..."), so a trailing slash
// would produce a double slash. Strip it here once.
export const API_URL = rawApiUrl.replace(/\/+$/, "");
