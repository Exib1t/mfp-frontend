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
- Use `cn()` from `@/lib/utils/cn` for classNames
- CSS variables only — no hardcoded colors, sizes, or font values
- Polymorphic `as` prop for components that render different HTML tags
