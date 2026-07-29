import Input from "@/components/controls/Input/Input";
import Typography from "@/components/controls/Typography/Typography";
import { activeOptions } from "@/entities/configurator/helpers";
import type { ConfiguratorGroup } from "@/entities/configurator/types";
import { formatPrice } from "@/lib/utils/formatPrice";
import OptionCardList from "./OptionCardList";
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

      {group.ui === "text" ? (
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
      ) : group.ui === "swatch" ? (
        <SwatchGrid options={options} picked={picked} onPick={onPick} />
      ) : (
        <OptionCardList
          options={options}
          picked={picked}
          isMultiple={group.is_multiple}
          withImages={group.ui === "image"}
          onPick={onPick}
        />
      )}
    </div>
  );
}

export default GroupEditor;
