"use client";

import Link from "next/link";
import AdminCard from "@/components/admin/AdminCard/AdminCard";
import AdminPageHeader from "@/components/admin/AdminPageHeader/AdminPageHeader";
import Button from "@/components/controls/Button/Button";
import Typography from "@/components/controls/Typography/Typography";
import type { AdminConfigurator } from "@/entities/admin/configurators/types";
import ConfiguratorGeneralCard from "./parts/ConfiguratorGeneralCard";
import ConfiguratorGroupsCard from "./parts/ConfiguratorGroupsCard";
import { useConfiguratorForm } from "./useConfiguratorForm";

import "./AdminConfiguratorForm.styles.scss";

interface AdminConfiguratorFormProps {
  configurator?: AdminConfigurator;
}

const BASE_CLASS = "admin-configurator-form";

function AdminConfiguratorForm({ configurator }: AdminConfiguratorFormProps) {
  const { form, submit, isSaving } = useConfiguratorForm(configurator);

  return (
    <div className={BASE_CLASS}>
      <AdminPageHeader
        title={configurator ? configurator.name : "Новий конфігуратор"}
        description={
          configurator
            ? `/${configurator.slug} · ${configurator.groups.length} кроків`
            : "Спершу основні поля, далі кроки збірки"
        }
        actions={
          <>
            <Button as={Link} href="/admin/configurator" variant="ghost">
              До списку
            </Button>
            <Button type="submit" form="configurator-form" loading={isSaving}>
              Зберегти
            </Button>
          </>
        }
      />

      {/* The step editor writes straight to the API, so it stays outside the
          form element — nesting forms is invalid HTML. */}
      <form
        id="configurator-form"
        className={`${BASE_CLASS}_form`}
        onSubmit={submit}
      >
        <ConfiguratorGeneralCard form={form} />
      </form>

      {configurator ? (
        <ConfiguratorGroupsCard configurator={configurator} />
      ) : (
        <AdminCard title="Кроки">
          <Typography variant="body2" color="muted">
            Спершу збережіть конфігуратор — кроки привʼязуються до вже
            створеного запису.
          </Typography>
        </AdminCard>
      )}
    </div>
  );
}

export default AdminConfiguratorForm;
