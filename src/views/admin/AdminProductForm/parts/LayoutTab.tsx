"use client";

import { useState } from "react";
import AdminCard from "@/components/admin/AdminCard/AdminCard";
import SortableList from "@/components/admin/SortableList/SortableList";
import Button from "@/components/controls/Button/Button";
import Select from "@/components/controls/Select/Select";
import Typography from "@/components/controls/Typography/Typography";
import type { AdminProduct } from "@/entities/admin/products/types";
import {
  PRODUCT_BLOCK_LABELS,
  type ProductBlockType,
} from "@/entities/products/layout";
import { addableBlockTypes } from "../layout.helpers";
import { useProductLayout } from "../useProductLayout";
import LayoutBlockCard from "./LayoutBlockCard";
import LayoutPreview from "./LayoutPreview";

import "./LayoutTab.styles.scss";

interface LayoutTabProps {
  product: AdminProduct;
}

const BASE_CLASS = "layout-blocks";

function LayoutTab({ product }: LayoutTabProps) {
  const layout = useProductLayout(product);
  const [typeToAdd, setTypeToAdd] = useState<ProductBlockType | "">("");

  const addable = addableBlockTypes(layout.blocks);

  return (
    <div className={`${BASE_CLASS}_tab`}>
      <AdminCard
        title="Блоки сторінки"
        description="Перетягуйте блоки, обирайте колонку та вимикайте зайве. Праворуч — сторінка так, як її побачить покупець."
        actions={
          <>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={layout.reset}
              disabled={layout.isSaving}
            >
              Стандартна
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={layout.save}
              loading={layout.isSaving}
              disabled={!layout.isDirty}
            >
              {layout.isDirty ? "Зберегти розкладку" : "Збережено"}
            </Button>
          </>
        }
      >
        <div className={`${BASE_CLASS}_grid`}>
          <div className={`${BASE_CLASS}_list`}>
            <SortableList
              items={layout.blocks}
              getId={(block) => block.id}
              onReorder={layout.reorder}
              renderItem={(block, { dragHandleProps }) => (
                <LayoutBlockCard
                  block={block}
                  dragHandleProps={dragHandleProps}
                  onPatch={(patch) => layout.patchBlock(block.id, patch)}
                  onSetting={(key, value) =>
                    layout.setSetting(block.id, key, value)
                  }
                  onRemove={() => layout.removeBlock(block.id)}
                />
              )}
            />

            {addable.length > 0 ? (
              <div className={`${BASE_CLASS}_add`}>
                <Select
                  value={typeToAdd}
                  options={[
                    { value: "", label: "— оберіть блок —" },
                    ...addable.map((type) => ({
                      value: type,
                      label: PRODUCT_BLOCK_LABELS[type],
                    })),
                  ]}
                  onChange={(value) => setTypeToAdd(value as ProductBlockType)}
                  aria-label="Тип блока"
                />
                <Button
                  type="button"
                  variant="outline"
                  disabled={!typeToAdd}
                  onClick={() => {
                    if (!typeToAdd) return;
                    layout.addBlock(typeToAdd);
                    setTypeToAdd("");
                  }}
                >
                  Додати блок
                </Button>
              </div>
            ) : (
              <Typography variant="caption" color="muted">
                Усі доступні блоки вже на сторінці.
              </Typography>
            )}
          </div>

          <LayoutPreview product={product} blocks={layout.blocks} />
        </div>
      </AdminCard>
    </div>
  );
}

export default LayoutTab;
