/** Admin session cookies. httpOnly — never read from client JS. */
export const ADMIN_ACCESS_COOKIE = "mfp_admin_at";
export const ADMIN_REFRESH_COOKIE = "mfp_admin_rt";

export const ADMIN_HOME_PATH = "/admin";
export const ADMIN_LOGIN_PATH = "/admin/login";

/**
 * Client-side admin requests go through this Next route instead of hitting the
 * API directly, so the access token can stay in an httpOnly cookie.
 */
export const BFF_BASE_PATH = "/bff";

/** Refresh tokens outlive access tokens; both are cleared together on logout. */
export const REFRESH_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;
