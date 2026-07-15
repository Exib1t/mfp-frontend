import { RotateCcw, X } from "lucide-react";
import Button from "@/components/controls/Button/Button";
import IconButton from "@/components/controls/IconButton/IconButton";
import Typography from "@/components/controls/Typography/Typography";
import type { Category } from "@/entities/categories/types";
import type { Product } from "@/entities/products/types";
import PriceRangeFilter from "../PriceRangeFilter/PriceRangeFilter";

import "../../ProductsPage.styles.scss";

interface FilterSidebarProps {
  categories: Category[];
  products: Product[];
  activeCategoryId: number | null;
  onSelectCategory: (id: number | null) => void;
  boundMin: number;
  boundMax: number;
  effMin: number;
  effMax: number;
  onPriceMinChange: (value: number) => void;
  onPriceMaxChange: (value: number) => void;
  hasFilters: boolean;
  onReset: () => void;
  open: boolean;
  onClose: () => void;
}

const BASE_CLASS = "products-page";

function FilterSidebar({
  categories,
  products,
  activeCategoryId,
  onSelectCategory,
  boundMin,
  boundMax,
  effMin,
  effMax,
  onPriceMinChange,
  onPriceMaxChange,
  hasFilters,
  onReset,
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
              data-active={activeCategoryId === null}
              onClick={() => onSelectCategory(null)}
            >
              <span>Усі</span>
              <span className={`${BASE_CLASS}_cat-count`}>
                {products.length}
              </span>
            </button>
          </li>
          {categories.map((cat) => {
            const count = products.filter(
              (p) => p.new_category.id === cat.id,
            ).length;
            return (
              <li key={cat.id}>
                <button
                  type="button"
                  className={`${BASE_CLASS}_cat-item`}
                  data-active={activeCategoryId === cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                >
                  <span>{cat.name}</span>
                  <span className={`${BASE_CLASS}_cat-count`}>{count}</span>
                </button>
              </li>
            );
          })}
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
          effMin={effMin}
          effMax={effMax}
          onMinChange={onPriceMinChange}
          onMaxChange={onPriceMaxChange}
        />
      </div>

      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={onReset}>
          <RotateCcw size={14} strokeWidth={2} />
          Скинути фільтри
        </Button>
      )}
    </aside>
  );
}

export default FilterSidebar;
