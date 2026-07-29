import { RotateCcw, X } from "lucide-react";
import Button from "@/components/controls/Button/Button";
import IconButton from "@/components/controls/IconButton/IconButton";
import Typography from "@/components/controls/Typography/Typography";
import type { Category } from "@/entities/categories/types";
import type { useCatalogFilters } from "../../useCatalogFilters";
import AttributeFilter from "../AttributeFilter/AttributeFilter";
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
              onClick={() => state.selectCategory(null)}
            >
              <span>Усі</span>
            </button>
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <button
                type="button"
                className={`${BASE_CLASS}_cat-item`}
                data-active={state.categoryId === category.id}
                onClick={() => state.selectCategory(category.id)}
              >
                <span>{category.name}</span>
              </button>
            </li>
          ))}
        </ul>
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

      {state.attributes.map((attribute) => (
        <div key={attribute.id} className={`${BASE_CLASS}_sidebar-section`}>
          <AttributeFilter
            attribute={attribute}
            picked={state.facets[attribute.code] ?? []}
            onToggle={(value) => state.toggleFacet(attribute.code, value)}
            onRange={(range) => state.setRangeFacet(attribute.code, range)}
          />
        </div>
      ))}

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
