import { ChevronLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Button from "@/components/controls/Button/Button";
import Typography from "@/components/controls/Typography/Typography";
import { formatPrice } from "@/lib/utils/formatPrice";

import "../../ConfiguratorPage.styles.scss";

interface StickyBarProps {
  configSummary: string;
  total: number;
  basePrice: number;
  showBaseNote: boolean;
  disabled: boolean;
  onAddToCart: () => void;
}

const BASE_CLASS = "configurator";

function StickyBar({
  configSummary,
  total,
  basePrice,
  showBaseNote,
  disabled,
  onAddToCart,
}: StickyBarProps) {
  return (
    <div className={`${BASE_CLASS}_sticky-bar`}>
      <div className={`${BASE_CLASS}_sticky-bar-inner`}>
        <div className={`${BASE_CLASS}_sticky-bar-info`}>
          <Typography
            variant="caption"
            className={`${BASE_CLASS}_sticky-bar-summary`}
          >
            {configSummary}
          </Typography>
          <div className={`${BASE_CLASS}_sticky-bar-price-row`}>
            <Typography variant="h4" as="p">
              {formatPrice(total)}
            </Typography>
            {showBaseNote && (
              <Typography
                variant="caption"
                className={`${BASE_CLASS}_sticky-bar-base`}
              >
                база {formatPrice(basePrice)}
              </Typography>
            )}
          </div>
        </div>
        <div className={`${BASE_CLASS}_sticky-bar-actions`}>
          <Button
            variant="ghost"
            as={Link}
            href="/products"
            transitionTypes={["nav-back"]}
          >
            <ChevronLeft size={16} strokeWidth={2} />
            До каталогу
          </Button>
          <Button size="lg" disabled={disabled} onClick={onAddToCart}>
            <ShoppingBag size={18} strokeWidth={2} />
            Додати до кошика
          </Button>
        </div>
      </div>
    </div>
  );
}

export default StickyBar;
