"use client";

import { useState } from "react";
import AdminCard from "@/components/admin/AdminCard/AdminCard";
import SortableList from "@/components/admin/SortableList/SortableList";
import Button from "@/components/controls/Button/Button";
import Input from "@/components/controls/Input/Input";
import Typography from "@/components/controls/Typography/Typography";
import type { AdminConfigurator } from "@/entities/admin/configurators/types";
import { useConfiguratorGroups } from "../useConfiguratorGroups";
import ConfiguratorGroupCard from "./ConfiguratorGroupCard";

import "./ConfiguratorGroups.styles.scss";

interface ConfiguratorGroupsCardProps {
  configurator: AdminConfigurator;
}

const BASE_CLASS = "configurator-groups";

function ConfiguratorGroupsCard({ configurator }: ConfiguratorGroupsCardProps) {
  const groups = useConfiguratorGroups(configurator);
  const [draft, setDraft] = useState("");

  const submitDraft = () => {
    if (!draft.trim()) return;
    groups.add(draft);
    setDraft("");
  };

  return (
    <AdminCard
      title="Кроки"
      description="Покупець проходить їх згори вниз. Порядок задається перетягуванням."
    >
      {configurator.groups.length === 0 && (
        <Typography variant="body2" color="muted">
          Кроків ще немає. Додайте перший — наприклад «Розмір».
        </Typography>
      )}

      <SortableList
        className={BASE_CLASS}
        items={configurator.groups}
        getId={(group) => group.id}
        onReorder={groups.reorder}
        renderItem={(group, { dragHandleProps }) => (
          <ConfiguratorGroupCard
            configuratorId={configurator.id}
            group={group}
            dragHandleProps={dragHandleProps}
            onPatch={(patch) => groups.patch(group.id, patch)}
            onRemove={() => groups.remove(group.id)}
          />
        )}
      />

      <div className={`${BASE_CLASS}_add`}>
        <Input
          placeholder="Назва кроку, напр. Тканина"
          value={draft}
          aria-label="Назва нового кроку"
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key !== "Enter") return;
            event.preventDefault();
            submitDraft();
          }}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          loading={groups.isAdding}
          disabled={!draft.trim()}
          onClick={submitDraft}
        >
          Додати крок
        </Button>
      </div>
    </AdminCard>
  );
}

export default ConfiguratorGroupsCard;
