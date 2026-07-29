"use client";

import { EyeOff, Trash2 } from "lucide-react";
import type { CSSProperties } from "react";
import DragHandle from "@/components/admin/SortableList/parts/DragHandle";
import type { DragHandleProps } from "@/components/admin/SortableList/types";
import Input from "@/components/controls/Input/Input";
import {
  PRODUCT_BLOCK_LABELS,
  type ProductBlock,
} from "@/entities/products/layout";
import type { Product } from "@/entities/products/types";
import { cn } from "@/lib/utils/cn";
import ProductBlockRenderer from "@/views/ProductPage/parts/ProductBlockRenderer/ProductBlockRenderer";
import type { useProductPurchase } from "@/views/ProductPage/useProductPurchase";
import { BLOCK_TEXT_SETTINGS } from "../layout.helpers";

interface LayoutBlockFrameProps {
  block: ProductBlock;
  product: Product;
  purchase: ReturnType<typeof useProductPurchase>;
  dragHandleProps: DragHandleProps;
  isResizing: boolean;
  onPatch: (patch: Partial<ProductBlock>) => void;
  onSetting: (key: string, value: string) => void;
  onRemove: () => void;
  onResizeStart: (event: React.PointerEvent) => void;
}

const BASE_CLASS = "layout-canvas";

/** One block on the canvas: real storefront content under an editing chrome. */
function LayoutBlockFrame({
  block,
  product,
  purchase,
  dragHandleProps,
  isResizing,
  onPatch,
  onSetting,
  onRemove,
  onResizeStart,
}: LayoutBlockFrameProps) {
  const textSettings = BLOCK_TEXT_SETTINGS[block.type];

  return (
    <div
      className={cn(`${BASE_CLASS}_block`, {
        "-hidden": !block.enabled,
        "-resizing": isResizing,
      })}
      style={{ "--block-span": block.span } as CSSProperties}
    >
      <div className={`${BASE_CLASS}_toolbar`}>
        <DragHandle handle={dragHandleProps} />
        <span className={`${BASE_CLASS}_label`}>
          {PRODUCT_BLOCK_LABELS[block.type]}
        </span>
        <span className={`${BASE_CLASS}_span`}>{block.span}/12</span>

        <button
          type="button"
          className={cn(`${BASE_CLASS}_icon`, { "-off": !block.enabled })}
          aria-label={block.enabled ? "Приховати блок" : "Показати блок"}
          aria-pressed={!block.enabled}
          onClick={() => onPatch({ enabled: !block.enabled })}
        >
          <EyeOff size={14} strokeWidth={2} />
        </button>

        <button
          type="button"
          className={`${BASE_CLASS}_icon -danger`}
          aria-label="Прибрати блок"
          onClick={onRemove}
        >
          <Trash2 size={14} strokeWidth={2} />
        </button>
      </div>

      {textSettings && (
        <div className={`${BASE_CLASS}_settings`}>
          {textSettings.title && (
            <Input
              aria-label="Заголовок блока"
              placeholder="Заголовок"
              value={
                typeof block.settings?.title === "string"
                  ? block.settings.title
                  : ""
              }
              onChange={(event) => onSetting("title", event.target.value)}
            />
          )}
          {textSettings.body && (
            <Input
              as="textarea"
              rows={2}
              aria-label="Текст блока"
              placeholder="Текст"
              value={
                typeof block.settings?.body === "string"
                  ? block.settings.body
                  : ""
              }
              onChange={(event) => onSetting("body", event.target.value)}
            />
          )}
        </div>
      )}

      {/* The real storefront component, inert while editing. */}
      <div className={`${BASE_CLASS}_content`} aria-hidden="true">
        <ProductBlockRenderer
          block={block}
          product={product}
          purchase={purchase}
          onAddToCart={() => {}}
        />
      </div>

      <button
        type="button"
        className={`${BASE_CLASS}_resize`}
        aria-label={`Ширина блока ${PRODUCT_BLOCK_LABELS[block.type]}`}
        onPointerDown={onResizeStart}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") onPatch({ span: block.span + 1 });
          if (event.key === "ArrowLeft") onPatch({ span: block.span - 1 });
        }}
      />
    </div>
  );
}

export default LayoutBlockFrame;
