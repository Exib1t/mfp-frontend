"use client";

import Link from "next/link";
import AdminCard from "@/components/admin/AdminCard/AdminCard";
import AdminPageHeader from "@/components/admin/AdminPageHeader/AdminPageHeader";
import Button from "@/components/controls/Button/Button";
import Typography from "@/components/controls/Typography/Typography";
import {
  type AdminAttribute,
  ATTRIBUTE_TYPE_LABELS,
  OPTION_BACKED_TYPES,
} from "@/entities/admin/attributes/types";
import AttributeGeneralCard from "./parts/AttributeGeneralCard";
import AttributeOptionsEditor from "./parts/AttributeOptionsEditor";
import { useAttributeForm } from "./useAttributeForm";

import "./AdminAttributeForm.styles.scss";

interface AdminAttributeFormProps {
  attribute?: AdminAttribute;
}

const BASE_CLASS = "admin-attribute-form";

function AdminAttributeForm({ attribute }: AdminAttributeFormProps) {
  const { form, submit, isSaving } = useAttributeForm(attribute);
  const type = form.watch("type");

  const showsOptions = OPTION_BACKED_TYPES.includes(type);

  return (
    <div className={BASE_CLASS}>
      <AdminPageHeader
        title={attribute ? attribute.name : "Нова характеристика"}
        description={
          attribute
            ? `${attribute.code} · ${ATTRIBUTE_TYPE_LABELS[attribute.type]}`
            : "Опишіть характеристику, потім додайте її до категорій"
        }
        actions={
          <>
            <Button as={Link} href="/admin/attributes" variant="ghost">
              До списку
            </Button>
            <Button type="submit" form="attribute-form" loading={isSaving}>
              Зберегти
            </Button>
          </>
        }
      />

      {/* The options editor writes straight to the API, so it must sit outside
          the form element — nesting forms is invalid HTML. */}
      <form
        id="attribute-form"
        className={`${BASE_CLASS}_form`}
        onSubmit={submit}
      >
        <AttributeGeneralCard
          form={form}
          isTypeLocked={Boolean(attribute?.options.length)}
        />
      </form>

      {showsOptions &&
        (attribute ? (
          <AttributeOptionsEditor attribute={attribute} />
        ) : (
          <AdminCard title="Значення">
            <Typography variant="body2" color="muted">
              Спершу збережіть характеристику — значення привʼязуються до вже
              створеного запису.
            </Typography>
          </AdminCard>
        ))}
    </div>
  );
}

export default AdminAttributeForm;
