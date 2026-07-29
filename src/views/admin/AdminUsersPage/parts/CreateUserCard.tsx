"use client";

import { Controller } from "react-hook-form";
import AdminCard from "@/components/admin/AdminCard/AdminCard";
import AdminField from "@/components/admin/AdminField/AdminField";
import Button from "@/components/controls/Button/Button";
import Input from "@/components/controls/Input/Input";
import Select from "@/components/controls/Select/Select";
import { USER_ROLE_OPTIONS } from "@/entities/admin/users/types";
import type { useCreateUserForm } from "../useCreateUserForm";

interface CreateUserCardProps {
  state: ReturnType<typeof useCreateUserForm>;
}

const BASE_CLASS = "admin-users";

function CreateUserCard({ state }: CreateUserCardProps) {
  const { register, control, formState } = state.form;
  const { errors } = formState;

  return (
    <AdminCard
      title="Новий користувач"
      description="Пароль задаєте ви — покупець може змінити його пізніше."
      actions={
        <Button type="button" variant="ghost" size="sm" onClick={state.close}>
          Згорнути
        </Button>
      }
    >
      <form className={`${BASE_CLASS}_form`} onSubmit={state.submit}>
        <AdminField
          htmlFor="user-first-name"
          label="Імʼя"
          error={errors.first_name?.message}
        >
          <Input id="user-first-name" {...register("first_name")} />
        </AdminField>

        <AdminField
          htmlFor="user-last-name"
          label="Прізвище"
          error={errors.last_name?.message}
        >
          <Input id="user-last-name" {...register("last_name")} />
        </AdminField>

        <AdminField
          htmlFor="user-email"
          label="E-mail"
          error={errors.email?.message}
        >
          <Input id="user-email" type="email" {...register("email")} />
        </AdminField>

        <AdminField
          htmlFor="user-password"
          label="Пароль"
          hint="Мінімум 8 символів"
          error={errors.password?.message}
        >
          <Input
            id="user-password"
            type="password"
            autoComplete="new-password"
            {...register("password")}
          />
        </AdminField>

        <AdminField htmlFor="user-role" label="Роль">
          <Controller
            control={control}
            name="role"
            render={({ field }) => (
              <Select
                value={field.value}
                options={[...USER_ROLE_OPTIONS]}
                onChange={field.onChange}
                aria-label="Роль"
              />
            )}
          />
        </AdminField>

        <Button type="submit" loading={state.isSaving}>
          Створити
        </Button>
      </form>
    </AdminCard>
  );
}

export default CreateUserCard;
