"use client";

import { useState } from "react";
import AdminCard from "@/components/admin/AdminCard/AdminCard";
import DragHandle from "@/components/admin/SortableList/parts/DragHandle";
import SortableList from "@/components/admin/SortableList/SortableList";
import Button from "@/components/controls/Button/Button";
import Input from "@/components/controls/Input/Input";
import Typography from "@/components/controls/Typography/Typography";
import type { AdminProduct } from "@/entities/admin/products/types";
import { useProductOptions } from "../useProductOptions";
import OptionValueList from "./OptionValueList";

import "./OptionsTab.styles.scss";

interface OptionsTabProps {
  product: AdminProduct;
}

const BASE_CLASS = "product-options";

function OptionsTab({ product }: OptionsTabProps) {
  const options = useProductOptions(product);
  const [newOption, setNewOption] = useState("");

  const submitOption = () => {
    const name = newOption.trim();
    if (!name) return;
    options.addOption(name);
    setNewOption("");
  };

  return (
    <AdminCard
      title="Опції товару"
      description="Осі варіацій: колір, розмір, матеріал. Порядок задається перетягуванням."
    >
      {product.options.length === 0 ? (
        <Typography variant="body2" color="muted">
          Опцій ще немає. Товар продається як один SKU.
        </Typography>
      ) : (
        <SortableList
          items={product.options}
          getId={(option) => option.id}
          onReorder={options.reorderOptions}
          renderItem={(option, { dragHandleProps }) => (
            <div className={`${BASE_CLASS}_option`}>
              <div className={`${BASE_CLASS}_option-head`}>
                <DragHandle handle={dragHandleProps} />
                <Input
                  id={`option-${option.id}-name`}
                  defaultValue={option.name}
                  aria-label="Назва опції"
                  onBlur={(event) => {
                    const name = event.target.value.trim();
                    if (name && name !== option.name) {
                      options.renameOption(option.id, name);
                    }
                  }}
                />
                <button
                  type="button"
                  className={`${BASE_CLASS}_delete`}
                  onClick={() => options.removeOption(option.id)}
                >
                  Видалити вісь
                </button>
              </div>

              <OptionValueList
                optionId={option.id}
                values={option.values}
                onReorder={(values) => options.reorderValues(option.id, values)}
                onAdd={(label, value) =>
                  options.addValue(option.id, label, value)
                }
                onRemove={(valueId) => options.removeValue(option.id, valueId)}
              />
            </div>
          )}
        />
      )}

      <div className={`${BASE_CLASS}_add`}>
        <Input
          id="product-new-option"
          placeholder="Назва нової опції, напр. Колір"
          value={newOption}
          onChange={(event) => setNewOption(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              submitOption();
            }
          }}
        />
        <Button
          type="button"
          variant="outline"
          onClick={submitOption}
          disabled={!newOption.trim() || options.isMutating}
        >
          Додати опцію
        </Button>
      </div>
    </AdminCard>
  );
}

export default OptionsTab;
