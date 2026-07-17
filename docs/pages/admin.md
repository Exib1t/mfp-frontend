# Admin panel

**Routes:** `src/app/admin/`

Custom admin section built into the storefront app (no React Admin, no separate app). Replaces the standalone `mfp-admin` React Admin app long-term.

## Routes

| URL | File | Access |
|---|---|---|
| `/admin/login` | `src/app/admin/login/page.tsx` → `views/AdminLoginPage` | public |
| `/admin` | `src/app/admin/(protected)/page.tsx` → `views/AdminDashboardPage` | `role: 'admin'` only |
| `/admin/*` (future modules) | siblings under `src/app/admin/(protected)/` | `role: 'admin'` only |

## Auth (v1 — localStorage)

- `src/entities/auth/` — `AuthContext` (`useAuth()`), `authStorage.ts` (localStorage key `mfp-admin-auth`), `AdminGuard.tsx`.
- Bearer JWT from existing backend `auth` module (`POST /auth/login|refresh|logout`, `GET /auth/me`). Token attached to every request by `src/services/api/apiClient.ts` middleware; on `401` under `/admin/*` the user is bounced to `/admin/login`.
- Only `role: 'admin'` is let in — `role: 'user'` logs in successfully at the API level but `AuthContext.login()` rejects it client-side.
- Background silent refresh scheduled from `access_expires_at`.
- Known trade-off vs. httpOnly-cookie + middleware approach: token lives in `localStorage`, readable by any JS on the page (bigger XSS blast radius since admin shares the JS bundle with the public storefront). Accepted for v1 to move fast and reuse the existing bearer-token backend contract; revisit if/when the admin section grows.

## Chrome

`/admin/*` skips the public `Header`/`Footer` — see `src/app/AdminAwareChrome.tsx`. Authenticated pages get `AdminShell` (topbar + logout) — see [admin-shell.md](../components/admin-shell.md).

## Status

🚧 in progress — auth shell only (login, guard, logout, empty dashboard). Products/categories/orders CRUD modules are a separate, later phase.
