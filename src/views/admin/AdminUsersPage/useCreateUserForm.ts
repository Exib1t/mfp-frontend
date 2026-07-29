"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/controls/Toast/ToastProvider";
import { useCreateUser } from "@/entities/admin/users/api";

export const CreateUserFormSchema = z.object({
  first_name: z.string().trim().min(1, { error: "Вкажіть імʼя" }),
  last_name: z.string().trim().min(1, { error: "Вкажіть прізвище" }),
  email: z.email({ error: "Некоректний e-mail" }),
  password: z.string().min(8, { error: "Мінімум 8 символів" }),
  role: z.enum(["admin", "user"]),
});

export type CreateUserFormValues = z.infer<typeof CreateUserFormSchema>;

const EMPTY: CreateUserFormValues = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  role: "user",
};

/** The "invite" panel: collapsed by default, resets itself after a success. */
export function useCreateUserForm() {
  const { toast } = useToast();
  const createUser = useCreateUser();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<CreateUserFormValues>({
    resolver: zodResolver(CreateUserFormSchema),
    defaultValues: EMPTY,
  });

  const submit = form.handleSubmit((values) => {
    createUser.mutate(
      { body: values },
      {
        onSuccess: () => {
          toast("Користувача створено", "success");
          form.reset(EMPTY);
          setIsOpen(false);
        },
        onError: () =>
          toast("Не вдалося створити — можливо, e-mail вже зайнятий", "error"),
      },
    );
  });

  return {
    form,
    submit,
    isOpen,
    open: () => setIsOpen(true),
    close: () => {
      form.reset(EMPTY);
      setIsOpen(false);
    },
    isSaving: createUser.isPending,
  };
}
