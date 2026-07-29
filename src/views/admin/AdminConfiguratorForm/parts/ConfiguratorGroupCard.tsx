"use client";

import { ChevronDown, Trash2 } from "lucide-react";
import { useState } from "react";
import DragHandle from "@/components/admin/SortableList/parts/DragHandle";
import type { DragHandleProps } from "@/components/admin/SortableList/types";
import Badge from "@/components/controls/Badge/Badge";
import Input from "@/components/controls/Input/Input";
import Select from "@/components/controls/Select/Select";
import Typography from "@/components/controls/Typography/Typography";
import {
  type AdminConfiguratorGroup,
  type ConfiguratorGroupUi,
  GROUP_UI_HINTS,
  GROUP_UI_LABELS,
  MULTI_CAPABLE_UI,
  OFFERED_GROUP_UI,
  OPTION_BACKED_UI,
  type UpdateGroupPayload,
} from "@/entities/admin/configurators/types";
import { cn } from "@/lib/utils/cn";
import GroupOptionsList from "./GroupOptionsList";

interface ConfiguratorGroupCardProps {
  configuratorId: number;
  group: AdminConfiguratorGroup;
  dragHandleProps: DragHandleProps;
  onPatch: (patch: UpdateGroupPayload) => void;
  onRemove: () => void;
}

const BASE_CLASS = "configurator-group";

const toItem = (ui: ConfiguratorGroupUi) => ({
  value: ui,
  label: GROUP_UI_LABELS[ui],
});

function ConfiguratorGroupCard({
  configuratorId,
  group,
  dragHandleProps,
  onPatch,
  onRemove,
}: ConfiguratorGroupCardProps) {
  const [isOpen, setIsOpen] = useState(true);
  const hasOptions = OPTION_BACKED_UI.includes(group.ui);

  // A retired look stays listed while a group still uses it, so the dropdown
  // shows its real value and the admin can switch away from it.
  const uiOptions = OFFERED_GROUP_UI.includes(group.ui)
    ? OFFERED_GROUP_UI.map(toItem)
    : [toItem(group.ui), ...OFFERED_GROUP_UI.map(toItem)];

  return (
    <section className={cn(BASE_CLASS, { "-off": !group.is_active })}>
      <header className={`${BASE_CLASS}_head`}>
        <DragHandle handle={dragHandleProps} />

        <Input
          className={`${BASE_CLASS}_label`}
          defaultValue={group.label}
          aria-label="Назва кроку"
          onBlur={(event) => {
            const label = event.target.value.trim();
            if (label && label !== group.label) onPatch({ label });
          }}
        />

        <code className={`${BASE_CLASS}_code`}>{group.code}</code>

        {hasOptions && <Badge size="sm">{group.options.length} вар.</Badge>}

        <button
          type="button"
          className={`${BASE_CLASS}_icon`}
          aria-label={isOpen ? "Згорнути крок" : "Розгорнути крок"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          <ChevronDown
            size={16}
            strokeWidth={2}
            className={cn(`${BASE_CLASS}_chevron`, { "-open": isOpen })}
          />
        </button>

        <button
          type="button"
          className={`${BASE_CLASS}_icon -danger`}
          aria-label={`Видалити крок ${group.label}`}
          onClick={onRemove}
        >
          <Trash2 size={16} strokeWidth={2} />
        </button>
      </header>

      {isOpen && (
        <div className={`${BASE_CLASS}_body`}>
          <div className={`${BASE_CLASS}_settings`}>
            {/* Not <label>: both controls are custom components that carry
                their own aria-label, so there is no native input to point at. */}
            <div className={`${BASE_CLASS}_field`}>
              <span>Вигляд</span>
              <Select
                value={group.ui}
                options={uiOptions}
                aria-label="Вигляд кроку"
                onChange={(ui) =>
                  // "Прапорці" *is* the multi-pick step, every other look is
                  // single-choice — so the flag follows the look rather than
                  // being a second thing to remember.
                  onPatch({ ui, is_multiple: MULTI_CAPABLE_UI.includes(ui) })
                }
              />
            </div>

            <div className={`${BASE_CLASS}_field`}>
              <span>
                {group.ui === "text" ? "Доплата за текст" : "Доплата"}
              </span>
              <Input
                type="number"
                step="0.01"
                defaultValue={group.price_modifier}
                disabled={group.ui !== "text"}
                aria-label="Доплата за крок"
                onBlur={(event) => {
                  const price_modifier = Number(event.target.value);
                  if (
                    !Number.isNaN(price_modifier) &&
                    price_modifier !== group.price_modifier
                  ) {
                    onPatch({ price_modifier });
                  }
                }}
              />
            </div>

            <label className={`${BASE_CLASS}_toggle`}>
              <input
                type="checkbox"
                checked={group.is_required}
                onChange={(event) =>
                  onPatch({ is_required: event.target.checked })
                }
              />
              <span>Обовʼязковий</span>
            </label>

            <label className={`${BASE_CLASS}_toggle`}>
              <input
                type="checkbox"
                checked={group.is_active}
                onChange={(event) =>
                  onPatch({ is_active: event.target.checked })
                }
              />
              <span>Показувати</span>
            </label>
          </div>

          <Typography variant="caption" color="muted">
            {GROUP_UI_HINTS[group.ui]}
          </Typography>

          {hasOptions && (
            <GroupOptionsList configuratorId={configuratorId} group={group} />
          )}
        </div>
      )}
    </section>
  );
}

export default ConfiguratorGroupCard;
