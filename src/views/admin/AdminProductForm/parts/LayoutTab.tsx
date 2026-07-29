"use client";

import type { CSSProperties } from "react";
import { useRef, useState } from "react";
import AdminCard from "@/components/admin/AdminCard/AdminCard";
import SortableList from "@/components/admin/SortableList/SortableList";
import Button from "@/components/controls/Button/Button";
import Select from "@/components/controls/Select/Select";
import Typography from "@/components/controls/Typography/Typography";
import type { AdminProduct } from "@/entities/admin/products/types";
import {
  clampSpan,
  PRODUCT_BLOCK_LABELS,
  type ProductBlock,
  type ProductBlockType,
} from "@/entities/products/layout";
import { useProductPurchase } from "@/views/ProductPage/useProductPurchase";
import { addableBlockTypes } from "../layout.helpers";
import { useBlockResize } from "../useBlockResize";
import { useProductLayout } from "../useProductLayout";
import LayoutBlockFrame from "./LayoutBlockFrame";

import "@/views/ProductPage/ProductPage.styles.scss";
import "./LayoutTab.styles.scss";

interface LayoutTabProps {
  product: AdminProduct;
}

const BASE_CLASS = "layout-canvas";
/** Must match the canvas column-gap in the stylesheet. */
const COLUMN_GAP = 16;

function LayoutTab({ product }: LayoutTabProps) {
  const layout = useProductLayout(product);
  const purchase = useProductPurchase(product);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [typeToAdd, setTypeToAdd] = useState<ProductBlockType | "">("");

  const { start: startResize, resizingId } = useBlockResize({
    containerRef: canvasRef,
    columnGap: COLUMN_GAP,
    onResize: (blockId, span) => layout.patchBlock(blockId, { span }),
  });

  const addable = addableBlockTypes(layout.blocks);

  const patchBlock = (id: string, patch: Partial<ProductBlock>) =>
    layout.patchBlock(
      id,
      patch.span === undefined
        ? patch
        : { ...patch, span: clampSpan(patch.span) },
    );

  return (
    <AdminCard
      title="Сторінка товару"
      description="Перетягуйте блоки за ручку, тягніть правий край — щоб змінити ширину. Це справжні компоненти вітрини."
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
      <div className={`${BASE_CLASS}_toolbar`}>
        {addable.length > 0 ? (
          <>
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
              size="sm"
              disabled={!typeToAdd}
              onClick={() => {
                if (!typeToAdd) return;
                layout.addBlock(typeToAdd);
                setTypeToAdd("");
              }}
            >
              Додати блок
            </Button>
          </>
        ) : (
          <Typography variant="caption" color="muted">
            Усі доступні блоки вже на сторінці.
          </Typography>
        )}
      </div>

      <div className={BASE_CLASS}>
        {/* The ref sits on the grid itself — the resize maths measures the
            track area, not the canvas padding. */}
        <div className={`${BASE_CLASS}_stage`} ref={canvasRef}>
          <SortableList
            direction="grid-12"
            className={`${BASE_CLASS}_grid`}
            items={layout.blocks}
            getId={(block) => block.id}
            onReorder={layout.reorder}
            getItemStyle={(block) =>
              ({ "--block-span": block.span }) as CSSProperties
            }
            renderItem={(block, { dragHandleProps }) => (
              <LayoutBlockFrame
                block={block}
                product={product}
                purchase={purchase}
                dragHandleProps={dragHandleProps}
                isResizing={resizingId === block.id}
                onPatch={(patch) => patchBlock(block.id, patch)}
                onSetting={(key, value) =>
                  layout.setSetting(block.id, key, value)
                }
                onRemove={() => layout.removeBlock(block.id)}
                onResizeStart={(event) =>
                  startResize(block.id, block.span, event)
                }
              />
            )}
          />
        </div>
      </div>
    </AdminCard>
  );
}

export default LayoutTab;
