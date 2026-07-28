"use client";

import Link from "next/link";
import { useState } from "react";
import AdminCard from "@/components/admin/AdminCard/AdminCard";
import AdminPageHeader from "@/components/admin/AdminPageHeader/AdminPageHeader";
import AdminTabs from "@/components/admin/AdminTabs/AdminTabs";
import Button from "@/components/controls/Button/Button";
import Typography from "@/components/controls/Typography/Typography";
import type { AdminProduct } from "@/entities/admin/products/types";
import { PRODUCT_FORM_TABS, TABS_REQUIRING_SAVED_PRODUCT } from "./constants";
import GeneralTab from "./parts/GeneralTab";
import OptionsTab from "./parts/OptionsTab";
import PricingTab from "./parts/PricingTab";
import SeoTab from "./parts/SeoTab";
import type { ProductFormTab } from "./types";
import { useProductForm } from "./useProductForm";

import "./AdminProductForm.styles.scss";

interface AdminProductFormProps {
  product?: AdminProduct;
}

const BASE_CLASS = "admin-product-form";

function AdminProductForm({ product }: AdminProductFormProps) {
  const [tab, setTab] = useState<ProductFormTab>("general");
  const { form, submit, isSaving } = useProductForm(product);

  const needsSavedProduct =
    !product && TABS_REQUIRING_SAVED_PRODUCT.includes(tab);

  const tabs = PRODUCT_FORM_TABS.map((item) =>
    item.id === "options"
      ? { ...item, badge: product?.options.length }
      : item.id === "variants"
        ? { ...item, badge: product?.variants.length }
        : item,
  );

  return (
    <form className={BASE_CLASS} onSubmit={submit}>
      <AdminPageHeader
        title={product ? product.name : "Новий товар"}
        description={product ? `/${product.slug}` : "Заповніть основні поля"}
        actions={
          <>
            <Button as={Link} href="/admin/products" variant="ghost">
              До списку
            </Button>
            <Button type="submit" loading={isSaving}>
              Зберегти
            </Button>
          </>
        }
      />

      <label className={`${BASE_CLASS}_publish`}>
        <input type="checkbox" {...form.register("is_published")} />
        <span>Опубліковано в каталозі</span>
      </label>

      <label className={`${BASE_CLASS}_publish`}>
        <input type="checkbox" {...form.register("is_featured")} />
        <span>Показувати серед популярних</span>
      </label>

      <AdminTabs tabs={tabs} value={tab} onChange={setTab} />

      <div className={`${BASE_CLASS}_panel`}>
        {needsSavedProduct ? (
          <AdminCard>
            <Typography variant="body2" color="muted">
              Спершу збережіть товар — опції, варіанти, характеристики та медіа
              привʼязуються до вже створеного запису.
            </Typography>
          </AdminCard>
        ) : (
          <>
            {tab === "general" && <GeneralTab form={form} />}
            {tab === "pricing" && (
              <PricingTab
                form={form}
                hasVariants={Boolean(product?.variants.length)}
              />
            )}
            {tab === "seo" && <SeoTab form={form} />}
            {tab === "options" && product && <OptionsTab product={product} />}
            {tab === "variants" && product && (
              <AdminCard title="Варіанти">
                <Typography variant="body2" color="muted">
                  Матриця варіантів — наступний крок. Зараз опції вже можна
                  налаштувати на сусідній вкладці.
                </Typography>
              </AdminCard>
            )}
            {tab === "attributes" && product && (
              <AdminCard title="Характеристики">
                <Typography variant="body2" color="muted">
                  Редактор характеристик — наступний крок.
                </Typography>
              </AdminCard>
            )}
            {tab === "media" && product && (
              <AdminCard title="Медіа">
                <Typography variant="body2" color="muted">
                  Завантаження та перетягування зображень — наступний крок.
                </Typography>
              </AdminCard>
            )}
          </>
        )}
      </div>
    </form>
  );
}

export default AdminProductForm;
