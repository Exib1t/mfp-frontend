"use client";

import Link from "next/link";
import { useState } from "react";
import AdminCard from "@/components/admin/AdminCard/AdminCard";
import AdminCheckbox from "@/components/admin/AdminCheckbox/AdminCheckbox";
import AdminPageHeader from "@/components/admin/AdminPageHeader/AdminPageHeader";
import AdminTabs from "@/components/admin/AdminTabs/AdminTabs";
import Button from "@/components/controls/Button/Button";
import Typography from "@/components/controls/Typography/Typography";
import type { AdminProduct } from "@/entities/admin/products/types";
import {
  FIELD_TABS,
  PRODUCT_FORM_TABS,
  TABS_REQUIRING_SAVED_PRODUCT,
} from "./constants";
import AttributesTab from "./parts/AttributesTab";
import GeneralTab from "./parts/GeneralTab";
import MediaTab from "./parts/MediaTab";
import PricingTab from "./parts/PricingTab";
import SeoTab from "./parts/SeoTab";
import type { ProductFormTab } from "./types";
import { useProductForm } from "./useProductForm";

import "./AdminProductForm.styles.scss";

interface AdminProductFormProps {
  product?: AdminProduct;
}

const BASE_CLASS = "admin-product-form";
const FORM_ID = "product-form";

function AdminProductForm({ product }: AdminProductFormProps) {
  const [tab, setTab] = useState<ProductFormTab>("general");
  const { form, submit, isSaving } = useProductForm(product);

  const needsSavedProduct =
    !product && TABS_REQUIRING_SAVED_PRODUCT.includes(tab);

  const tabs = PRODUCT_FORM_TABS.map((item) =>
    item.id === "attributes"
      ? { ...item, badge: product?.attributes.length }
      : item,
  );

  return (
    <div className={BASE_CLASS}>
      <AdminPageHeader
        title={product ? product.name : "Новий товар"}
        description={product ? `/${product.slug}` : "Заповніть основні поля"}
        actions={
          <>
            <Button as={Link} href="/admin/products" variant="ghost">
              До списку
            </Button>
            <Button type="submit" form={FORM_ID} loading={isSaving}>
              Зберегти
            </Button>
          </>
        }
      />

      <AdminTabs tabs={tabs} value={tab} onChange={setTab} />

      <div className={`${BASE_CLASS}_panel`}>
        {needsSavedProduct ? (
          <AdminCard>
            <Typography variant="body2" color="muted">
              Спершу збережіть товар — характеристики та медіа привʼязуються
              до вже створеного запису.
            </Typography>
          </AdminCard>
        ) : (
          <>
            {/*
              Only the react-hook-form tabs live inside the <form>. The rest
              write to the API directly, and the layout canvas renders real
              storefront blocks — the reviews block has its own <form>, and
              nesting forms is invalid HTML.
            */}
            <form
              id={FORM_ID}
              className={`${BASE_CLASS}_fields`}
              hidden={!FIELD_TABS.includes(tab)}
              onSubmit={submit}
            >
              <AdminCheckbox
                label="Опубліковано в каталозі"
                {...form.register("is_published")}
              />
              <AdminCheckbox
                label="Показувати серед популярних"
                {...form.register("is_featured")}
              />

              {tab === "general" && <GeneralTab form={form} />}
              {tab === "pricing" && (
                <PricingTab
                  form={form}
                  hasVariants={Boolean(product?.variants.length)}
                />
              )}
              {tab === "seo" && <SeoTab form={form} />}
            </form>

            {tab === "attributes" && product && (
              <AttributesTab product={product} />
            )}
            {tab === "media" && product && <MediaTab product={product} />}
          </>
        )}
      </div>
    </div>
  );
}

export default AdminProductForm;
