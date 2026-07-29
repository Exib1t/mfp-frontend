import type { ConfiguratorSelection } from "@/entities/configurator/types";
import type { StageHotspot } from "./parts/ConfiguratorStage/ConfiguratorStage";
import { placementFor } from "./parts/ConfiguratorStage/hotspots.config";
import GroupEditor from "./parts/GroupEditor/GroupEditor";
import type { useConfiguratorBuild } from "./useConfiguratorBuild";

type Build = ReturnType<typeof useConfiguratorBuild>;

/** One chip per visible step, each with its own editor in the popover. */
export function buildHotspots(build: Build): StageHotspot[] {
  return build.groups.map((group, index) => {
    const picked = build.choices[group.code] ?? [];
    const labels = build.selections
      .filter((selection) => selection.groupCode === group.code)
      .map((selection) => selection.label);

    return {
      config: {
        id: group.code,
        label: group.label,
        ...placementFor(group.code, index),
      },
      // Several picks collapse to a count so the chip stays chip-sized.
      value:
        labels.length > 1 ? `${labels.length} шт.` : (labels[0] ?? undefined),
      editor: (
        <GroupEditor
          group={group}
          picked={picked}
          onPick={(value) => build.pick(group, value)}
          onText={(text) => build.setText(group, text)}
        />
      ),
    };
  });
}

/**
 * Reads the picks the stage photo can express: the first colour tints the
 * overlay, free text becomes the badge, everything priced becomes a tag.
 */
export function stageDecorations(selections: ConfiguratorSelection[]) {
  const coloured = selections.find((selection) => selection.colorHex);
  const text = selections.find(
    (selection) => selection.value === selection.label && !selection.colorHex,
  );

  return {
    overlayColor: coloured?.colorHex ?? null,
    caption: text?.label,
    tags: selections
      .filter((selection) => selection.price > 0 && selection !== text)
      .map((selection) => ({
        id: `${selection.groupCode}:${selection.value}`,
        label: selection.label,
      })),
  };
}
