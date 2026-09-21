import { RotateCcw, X } from "lucide-react";
import Button from "@/components/controls/Button/Button";
import IconButton from "@/components/controls/IconButton/IconButton";
import Typography from "@/components/controls/Typography/Typography";
import { isFilterableAttribute } from "@/entities/attributes/types";
import { buildCategoryTree } from "@/entities/categories/helpers";
import type { Category } from "@/entities/categories/types";
import { PRODUCT_STATUS_LABELS } from "@/entities/products/constants";
import type { ProductStatus } from "@/entities/products/types";
import type { useCatalogFilters } from "../../useCatalogFilters";
import AttributeFilter from "../AttributeFilter/AttributeFilter";
import CategoryTree from "../CategoryTree/CategoryTree";
import PriceRangeFilter from "../PriceRangeFilter/PriceRangeFilter";

import "../../ProductsPage.styles.scss";

interface FilterSidebarProps {
  categories: Category[];
  state: ReturnType<typeof useCatalogFilters>;
  boundMin: number;
  boundMax: number;
  open: boolean;
  onClose: () => void;
}

const BASE_CLASS = "products-page";

/*
 * How many attribute facets stand open before the rest fold away. With every
 * facet expanded the column ran past 1200px for a catalogue of one product;
 * the first few cover what most buyers narrow by, and anything already picked
 * opens regardless of where it sits.
 */
const OPEN_FACET_COUNT = 3;

/** Availability filter values, in the order the sidebar offers them. */
const STATUS_FILTERS: (ProductStatus | null)[] = [
  null,
  "in_stock",
  "made_to_order",
];

function FilterSidebar({
  categories,
  state,
  boundMin,
  boundMax,
  open,
  onClose,
}: FilterSidebarProps) {
  return (
    <aside className={`${BASE_CLASS}_sidebar`} data-open={open}>
      <IconButton
        variant="ghost"
        className={`${BASE_CLASS}_sidebar-close`}
        aria-label="Закрити фільтри"
        onClick={onClose}
      >
        <X size={18} strokeWidth={2} />
      </IconButton>

      <div className={`${BASE_CLASS}_sidebar-section`}>
        <Typography
          variant="overline"
          color="muted"
          className={`${BASE_CLASS}_sidebar-title`}
        >
          Категорія
        </Typography>
        <ul className={`${BASE_CLASS}_cat-list`}>
          <li>
            <button
              type="button"
              className={`${BASE_CLASS}_cat-item`}
              data-active={state.categoryId === null}
              data-level={0}
              onClick={() => state.selectCategory(null)}
            >
              <span>Усі</span>
            </button>
          </li>
        </ul>
        <CategoryTree
          nodes={buildCategoryTree(categories)}
          selectedId={state.categoryId}
          onSelect={state.selectCategory}
        />
      </div>

      <div className={`${BASE_CLASS}_sidebar-section`}>
        <Typography
          variant="overline"
          color="muted"
          className={`${BASE_CLASS}_sidebar-title`}
        >
          Наявність
        </Typography>
        <div className={`${BASE_CLASS}_chips`}>
          {STATUS_FILTERS.map((value) => (
            <button
              key={value ?? "all"}
              type="button"
              className={`${BASE_CLASS}_chip`}
              data-active={state.status === value}
              onClick={() => state.setStatus(value)}
            >
              {value === null ? "Усі" : PRODUCT_STATUS_LABELS[value]}
            </button>
          ))}
        </div>
      </div>

      <div className={`${BASE_CLASS}_sidebar-section`}>
        <Typography
          variant="overline"
          color="muted"
          className={`${BASE_CLASS}_sidebar-title`}
        >
          Ціна, ₴
        </Typography>
        <PriceRangeFilter
          boundMin={boundMin}
          boundMax={boundMax}
          effMin={state.priceMin ?? boundMin}
          effMax={state.priceMax ?? boundMax}
          onMinChange={state.setPriceMin}
          onMaxChange={state.setPriceMax}
        />
      </div>

      {state.attributes
        .filter(isFilterableAttribute)
        .map((attribute, index) => {
          const picked = state.facets[attribute.code] ?? [];

          return (
            <div key={attribute.id} className={`${BASE_CLASS}_sidebar-section`}>
              <AttributeFilter
                attribute={attribute}
                picked={picked}
                defaultOpen={index < OPEN_FACET_COUNT || picked.length > 0}
                onToggle={(value) => state.toggleFacet(attribute.code, value)}
                onRange={(range) => state.setRangeFacet(attribute.code, range)}
              />
            </div>
          );
        })}

      {state.hasFilters && (
        <Button variant="ghost" size="sm" onClick={state.reset}>
          <RotateCcw size={14} strokeWidth={2} />
          Скинути фільтри
        </Button>
      )}
    </aside>
  );
}

export default FilterSidebar;
