# Table

**File:** `src/components/controls/Table/Table.tsx`

## Purpose

Generic data table for admin lists (categories, products, …). No built-in pagination/sorting — admin list endpoints return the full collection.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `columns` | `TableColumn<T>[]` | — | Column config, see below |
| `rows` | `T[]` | — | Data rows |
| `getRowKey` | `(row: T) => string \| number` | — | React key extractor |
| `emptyMessage` | `string` | `"Немає даних"` | Shown via `EmptyState` when `rows` is empty |
| `className` | `string` | — | Extension |

```ts
interface TableColumn<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  width?: string;
}
```

## DOM output

```html
<div class="table">
  <table class="table_grid">
    <thead><tr><th>Назва</th>...</tr></thead>
    <tbody><tr><td>...</td></tr></tbody>
  </table>
</div>

<!-- empty -->
<div class="empty-state">...</div>
```

## Usage

```tsx
<Table
  columns={[
    { key: "name", header: "Назва", render: (c) => c.name },
    { key: "actions", header: "", width: "1%", render: (c) => (
      <IconButton aria-label="Редагувати" onClick={() => edit(c)}><Pencil size={16} /></IconButton>
    ) },
  ]}
  rows={categories}
  getRowKey={(c) => c.id}
/>
```

## Notes

- Empty state renders `EmptyState` (`src/components/controls/EmptyState`) instead of the table markup.
- Row actions are just another column — no dedicated "actions" prop.
- Not virtualized — fine for admin lists in the tens/low hundreds of rows.
