"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCard } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import Button from "@/components/controls/Button/Button";
import Input from "@/components/controls/Input/Input";
import Select from "@/components/controls/Select/Select";
import Typography from "@/components/controls/Typography/Typography";

import "../../CartPage.styles.scss";

export const checkoutFormSchema = z.object({
  guest_name: z.string().trim().min(1, "Введіть ім'я та прізвище"),
  guest_email: z.string().trim().email("Некоректний email"),
  guest_phone: z.string().trim().min(10, "Некоректний номер телефону"),
  address: z.string().trim().min(1, "Введіть адресу доставки"),
  payment_method: z.enum(["cash_on_delivery", "online"]),
  notes: z.string().trim(),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

const DEFAULT_VALUES: CheckoutFormValues = {
  guest_name: "",
  guest_email: "",
  guest_phone: "",
  address: "",
  payment_method: "cash_on_delivery",
  notes: "",
};

const PAYMENT_OPTIONS: {
  value: CheckoutFormValues["payment_method"];
  label: string;
}[] = [
  { value: "cash_on_delivery", label: "Оплата при отриманні" },
  { value: "online", label: "Оплата онлайн" },
];

interface CheckoutFormProps {
  onSubmit: (values: CheckoutFormValues) => void;
  isPending: boolean;
}

const BASE_CLASS = "cart-page";

function CheckoutForm({ onSubmit, isPending }: CheckoutFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: DEFAULT_VALUES,
  });

  return (
    <form
      className={`${BASE_CLASS}_form`}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className={`${BASE_CLASS}_field`}>
        <Input placeholder="Ім'я та прізвище *" {...register("guest_name")} />
        {errors.guest_name && (
          <Typography variant="caption" color="error">
            {errors.guest_name.message}
          </Typography>
        )}
      </div>

      <div className={`${BASE_CLASS}_field`}>
        <Input
          type="email"
          placeholder="Email *"
          {...register("guest_email")}
        />
        {errors.guest_email && (
          <Typography variant="caption" color="error">
            {errors.guest_email.message}
          </Typography>
        )}
      </div>

      <div className={`${BASE_CLASS}_field`}>
        <Input
          type="tel"
          placeholder="Телефон * (+380…)"
          {...register("guest_phone")}
        />
        {errors.guest_phone && (
          <Typography variant="caption" color="error">
            {errors.guest_phone.message}
          </Typography>
        )}
      </div>

      <div className={`${BASE_CLASS}_field`}>
        <Input placeholder="Адреса доставки *" {...register("address")} />
        {errors.address && (
          <Typography variant="caption" color="error">
            {errors.address.message}
          </Typography>
        )}
      </div>

      <Controller
        name="payment_method"
        control={control}
        render={({ field }) => (
          <Select
            value={field.value}
            options={PAYMENT_OPTIONS}
            onChange={field.onChange}
            aria-label="Спосіб оплати"
          />
        )}
      />

      <Input
        as="textarea"
        placeholder="Коментар до замовлення"
        rows={2}
        {...register("notes")}
      />

      <Button type="submit" size="lg" fullWidth loading={isPending}>
        <CreditCard size={18} strokeWidth={2} />
        Підтвердити замовлення
      </Button>
    </form>
  );
}

export default CheckoutForm;
