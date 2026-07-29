import Input from "@/components/controls/Input/Input";
import Typography from "@/components/controls/Typography/Typography";
import { activeOptions } from "@/entities/configurator/helpers";
import type { ConfiguratorGroup } from "@/entities/configurator/types";
import { formatPrice } from "@/lib/utils/formatPrice";
import OptionCardList, { type OptionMarker } from "./OptionCardList";
import SwatchGrid from "./SwatchGrid";

import "./GroupEditor.styles.scss";

interface GroupEditorProps {
  group: ConfiguratorGroup;
  /** Chosen option values, or the single typed string for a `text` group. */
  picked: string[];
  onPick: (value: string) => void;
  onText: (text: string) => void;
}

const BASE_CLASS = "group-editor";

/**
 * Which marker each list-style step draws next to its rows. `select` is a
 * retired look kept only for presets saved before it was dropped — a dropdown
 * inside the hotspot popover was clipped by its scroll container, and the
 * popover already does the job a dropdown would.
 */
const MARKER_BY_UI: Record<string, OptionMarker> = {
  radio: "radio",
  select: "radio",
  checkbox: "check",
  image: "none",
};

/** Renders one configurator step from its `ui` hint. */
function GroupEditor({ group, picked, onPick, onText }: GroupEditorProps) {
  const options = activeOptions(group);

  return (
    <div className={BASE_CLASS}>
      {group.description && (
        <Typography variant="caption" color="muted">
          {group.description}
        </Typography>
      )}

      {group.ui === "text" && (
        <>
          <Input
            value={picked[0] ?? ""}
            placeholder={group.label}
            aria-label={group.label}
            maxLength={40}
            onChange={(event) => onText(event.target.value)}
          />
          {group.price_modifier > 0 && (
            <Typography variant="caption" color="muted">
              +{formatPrice(group.price_modifier)} за заповнене поле
            </Typography>
          )}
        </>
      )}

      {group.ui === "swatch" && (
        <SwatchGrid options={options} picked={picked} onPick={onPick} />
      )}

      {group.ui !== "text" && group.ui !== "swatch" && (
        <OptionCardList
          options={options}
          picked={picked}
          marker={MARKER_BY_UI[group.ui] ?? "radio"}
          withImages={group.ui === "image"}
          onPick={onPick}
        />
      )}
    </div>
  );
}

export default GroupEditor;
