# AdminShell

**File:** `src/components/common/AdminShell/AdminShell.tsx`

## Purpose

Chrome for authenticated `/admin/*` pages — topbar (panel title, current user email, logout) + content area. Wraps children of `src/app/admin/(protected)/layout.tsx`, inside `AdminGuard`.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Page content rendered below the topbar |

No other props — reads the current user via `useAuth()` (`src/entities/auth/AuthContext.tsx`).

## DOM output

```html
<div class="admin-shell">
  <header class="admin-shell_topbar">
    <p class="typography admin-shell_title" data-variant="subtitle1" data-weight="semibold">Панель адміністратора</p>
    <div class="admin-shell_user">
      <span class="typography" data-variant="body2" data-color="muted">admin@example.com</span>
      <button class="button" data-variant="ghost" data-size="sm">Вийти</button>
    </div>
  </header>
  <main class="admin-shell_content"><!-- page --></main>
</div>
```

## Usage

```tsx
<AdminShell>
  <AdminDashboardPage />
</AdminShell>
```

## Implementation

```tsx
const BASE_CLASS = "admin-shell";

className={cn(BASE_CLASS)}
className={`${BASE_CLASS}_topbar`}
```

## Notes

- Logout button calls `useAuth().logout()` then redirects to `/admin/login`.
- Not part of the public storefront chrome — rendered only inside `/admin/*` routes, which skip `Header`/`Footer` via `src/app/AdminAwareChrome.tsx`.
- Product/category/order admin modules are out of scope — this is only the shell.
