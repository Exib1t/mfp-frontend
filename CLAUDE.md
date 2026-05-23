@AGENTS.md

# Project conventions

Spec-driven development. Before creating a component — write spec in `docs/components/<name>.md`.

## Docs

- `docs/README.md` — index
- `docs/css-conventions.md` — CSS naming rules (mandatory read before writing styles)
- `docs/design-tokens.md` — all CSS variables reference
- `docs/components/` — per-component specs

## Key rules

- CSS naming: `block_element` sub-elements, `-modifier` booleans, `data-*` for value props
- Use `cn()` from `@/lib/utils/cn` for classNames — always `cn(BASE_CLASS, className, { ... })`
- `const BASE_CLASS = "block-name"` placed directly before each component function — never raw strings anywhere: root uses `{BASE_CLASS}`, sub-elements use `` {`${BASE_CLASS}_element`} ``
- CSS variables only — no hardcoded colors, sizes, or font values
- Polymorphic `as` prop for components that render different HTML tags
- Props type named `ComponentNameProps` — e.g. `ButtonProps`, `ProductCardProps`. For polymorphic components internal base type uses `ComponentNameBaseProps` suffix
- Object shapes → `interface`. Union types, intersections, generics, utility types → `type`
