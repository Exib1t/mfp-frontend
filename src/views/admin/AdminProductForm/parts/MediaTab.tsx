"use client";

import { useRef, useState } from "react";
import AdminCard from "@/components/admin/AdminCard/AdminCard";
import ConfirmDialog from "@/components/admin/ConfirmDialog/ConfirmDialog";
import SortableList from "@/components/admin/SortableList/SortableList";
import Button from "@/components/controls/Button/Button";
import Typography from "@/components/controls/Typography/Typography";
import type { AdminProduct } from "@/entities/admin/products/types";
import type { ProductImage } from "@/entities/products/types";
import { cn } from "@/lib/utils/cn";
import { useProductImages } from "../useProductImages";
import ProductImageCard from "./ProductImageCard";

import "./MediaTab.styles.scss";

interface MediaTabProps {
  product: AdminProduct;
}

const BASE_CLASS = "product-media";

function MediaTab({ product }: MediaTabProps) {
  const images = useProductImages(product);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setDragOver] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<ProductImage | null>(null);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    void images.upload(Array.from(fileList));
  };

  return (
    <AdminCard
      title="Медіа"
      description="Перше зображення стає обкладинкою. Фото з привʼязкою до варіанта показуються при його виборі."
      actions={
        <Button
          type="button"
          size="sm"
          variant="outline"
          loading={images.isUploading}
          onClick={() => inputRef.current?.click()}
        >
          Завантажити
        </Button>
      }
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(event) => {
          handleFiles(event.target.files);
          event.target.value = "";
        }}
      />

      <button
        type="button"
        className={cn(`${BASE_CLASS}_dropzone`, { "-over": isDragOver })}
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragOver(false);
          handleFiles(event.dataTransfer.files);
        }}
      >
        <Typography variant="body2" color="muted">
          {images.isUploading
            ? "Завантаження…"
            : "Перетягніть зображення сюди або натисніть, щоб обрати"}
        </Typography>
      </button>

      {product.images.length > 0 && (
        <SortableList
          className={`${BASE_CLASS}_grid`}
          direction="grid"
          items={product.images}
          getId={(image) => image.id}
          onReorder={images.reorder}
          renderItem={(image, { dragHandleProps }) => (
            <ProductImageCard
              image={image}
              index={product.images.indexOf(image)}
              variants={product.variants}
              dragHandleProps={dragHandleProps}
              onPatch={(body) => images.patchImage(image.id, body)}
              onRemove={() => setPendingDelete(image)}
            />
          )}
        />
      )}

      <ConfirmDialog
        open={pendingDelete !== null}
        title="Видалити зображення?"
        description="Файл буде видалено зі сховища без можливості відновлення."
        isPending={images.isMutating}
        onConfirm={() => {
          if (pendingDelete) images.remove(pendingDelete.id);
          setPendingDelete(null);
        }}
        onCancel={() => setPendingDelete(null)}
      />
    </AdminCard>
  );
}

export default MediaTab;
