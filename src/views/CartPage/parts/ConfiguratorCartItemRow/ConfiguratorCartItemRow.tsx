import { Settings2, X } from "lucide-react";
import IconButton from "@/components/controls/IconButton/IconButton";
import Typography from "@/components/controls/Typography/Typography";
import type { ConfiguratorCartItem } from "@/entities/configurator/types";
import { formatPrice } from "@/lib/utils/formatPrice";

import "../../CartPage.styles.scss";

interface ConfiguratorCartItemRowProps {
  item: ConfiguratorCartItem;
  onRemove: () => void;
}

const BASE_CLASS = "cart-page";

function ConfiguratorCartItemRow({
  item,
  onRemove,
}: ConfiguratorCartItemRowProps) {
  return (
    <div className={`${BASE_CLASS}_item`}>
      <div className={`${BASE_CLASS}_item-image-wrap`}>
        <span
          className={`${BASE_CLASS}_item-glyph`}
          aria-hidden="true"
          style={{ backgroundColor: item.colorHex || undefined }}
        >
          <Settings2
            size={28}
            strokeWidth={1.5}
            style={{ color: "white", opacity: 0.8 }}
          />
        </span>
      </div>

      <div className={`${BASE_CLASS}_item-body`}>
        <Typography variant="overline" color="muted">
          Кастомний вігвам
        </Typography>
        <Typography
          variant="subtitle1"
          as="h3"
          className={`${BASE_CLASS}_item-name`}
        >
          Вігвам «{item.sizeLabel} · {item.fabricLabel} · {item.colorLabel}»
        </Typography>

        <div className={`${BASE_CLASS}_configurator-details`}>
          {item.addons.length > 0 && (
            <Typography variant="caption" color="muted">
              Аксесуари: {item.addons.map((a) => a.label).join(", ")}
            </Typography>
          )}
          {item.childName && (
            <Typography variant="caption" color="muted">
              Ім'я для вишивки: «{item.childName}»
            </Typography>
          )}
        </div>

        <div className={`${BASE_CLASS}_item-footer`}>
          <Typography variant="caption" color="muted">
            1 шт. · кастомне виготовлення
          </Typography>
          <div className={`${BASE_CLASS}_item-price-wrap`}>
            <span className={`${BASE_CLASS}_item-price`}>
              {formatPrice(item.total)}
            </span>
          </div>
        </div>
      </div>

      <IconButton
        variant="ghost"
        size="sm"
        className={`${BASE_CLASS}_item-remove`}
        aria-label="Видалити"
        onClick={onRemove}
      >
        <X size={16} strokeWidth={2} />
      </IconButton>
    </div>
  );
}

export default ConfiguratorCartItemRow;
