# NavLink

**File:** `src/components/controls/NavLink/NavLink.tsx`

## Purpose

Single navigation link. Highlights active route. Optionally renders a Lucide icon before the label.

## Props

| Prop | Type | Required |
|---|---|---|
| `item` | `NavigationItem` | yes |

`NavigationItem` is defined in `src/config/navigation.config.ts`.

## Behaviour

- Active state: `pathname === item.href` → adds `-active` modifier
- Icon: resolved from `item.icon` (type `NavIconKey`) via `ICON_MAP` inside the component — icon components are NOT stored in config (not serializable for Server → Client pass)

## Icon keys (`NavIconKey`)

| Key | Icon |
|---|---|
| `house` | `House` |
| `layout-grid` | `LayoutGrid` |
| `sliders` | `Sliders` |
| `info` | `Info` |
| `truck` | `Truck` |
| `book-open` | `BookOpen` |
| `mail` | `Mail` |

## CSS block

`nav-link`

| Element / Modifier | Description |
|---|---|
| `&_icon` | Icon element — `opacity: 0.7`, `1` on hover/active |
| `&.-active` | Active link — `color: var(--primary)`, underline visible |
