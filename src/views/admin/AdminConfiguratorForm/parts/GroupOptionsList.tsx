"use client";

import SortableList from "@/components/admin/SortableList/SortableList";
import Button from "@/components/controls/Button/Button";
import Input from "@/components/controls/Input/Input";
import Typography from "@/components/controls/Typography/Typography";
import type { AdminConfiguratorGroup } from "@/entities/admin/configurators/types";
import { useGroupOptions } from "../useGroupOptions";
import ConfiguratorOptionRow from "./ConfiguratorOptionRow";

interface GroupOptionsListProps {
  configuratorId: number;
  group: AdminConfiguratorGroup;
}

const BASE_CLASS = "configurator-options";

function GroupOptionsList({ configuratorId, group }: GroupOptionsListProps) {
  const options = useGroupOptions(configuratorId, group);

  return (
    <div className={BASE_CLASS}>
      {group.options.length === 0 && (
        <Typography variant="caption" color="muted">
          Варіантів ще немає — крок не показується покупцю, поки він порожній.
        </Typography>
      )}

      <SortableList
        items={group.options}
        getId={(option) => option.id}
        onReorder={options.reorder}
        renderItem={(option, { dragHandleProps }) => (
          <ConfiguratorOptionRow
            option={option}
            ui={group.ui}
            dragHandleProps={dragHandleProps}
            onPatch={(patch) => options.patch(option.id, patch)}
            onRemove={() => options.remove(option.id)}
          />
        )}
      />

      <div className={`${BASE_CLASS}_add`}>
        <Input
          placeholder="Новий варіант"
          value={options.draft}
          aria-label={`Новий варіант у кроці ${group.label}`}
          onChange={(event) => options.setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key !== "Enter") return;
            event.preventDefault();
            options.add();
          }}
        />
        <Button
          type="button"
          size="sm"
          variant="outline"
          loading={options.isAdding}
          disabled={!options.draft.trim()}
          onClick={options.add}
        >
          Додати
        </Button>
      </div>
    </div>
  );
}

export default GroupOptionsList;
