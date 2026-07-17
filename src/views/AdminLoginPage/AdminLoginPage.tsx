"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "@/components/controls/Button/Button";
import Input from "@/components/controls/Input/Input";
import Typography from "@/components/controls/Typography/Typography";
import { useAuth } from "@/entities/auth/AuthContext";

import "./AdminLoginPage.styles.scss";

const loginFormSchema = z.object({
  email: z.string().trim().email("Некоректний email"),
  password: z.string().min(1, "Введіть пароль"),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const BASE_CLASS = "admin-login-page";

function AdminLoginPage() {
  const { login, isReady, isAuthenticated } = useAuth();
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    if (isReady && isAuthenticated) router.replace("/admin");
  }, [isReady, isAuthenticated, router]);

  const onSubmit = async (values: LoginFormValues) => {
    setFormError(null);
    try {
      await login(values.email, values.password);
      router.push("/admin");
    } catch {
      setFormError("Невірний email, пароль або немає доступу до панелі");
    }
  };

  return (
    <div className={BASE_CLASS}>
      <form
        className={`${BASE_CLASS}_form`}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Typography variant="h4" weight="semibold">
          Вхід до панелі
        </Typography>

        <div className={`${BASE_CLASS}_field`}>
          <Input
            type="email"
            placeholder="Email"
            autoComplete="username"
            {...register("email")}
          />
          {errors.email && (
            <Typography variant="caption" color="error">
              {errors.email.message}
            </Typography>
          )}
        </div>

        <div className={`${BASE_CLASS}_field`}>
          <Input
            type="password"
            placeholder="Пароль"
            autoComplete="current-password"
            {...register("password")}
          />
          {errors.password && (
            <Typography variant="caption" color="error">
              {errors.password.message}
            </Typography>
          )}
        </div>

        {formError && (
          <Typography variant="caption" color="error">
            {formError}
          </Typography>
        )}

        <Button type="submit" size="lg" fullWidth loading={isSubmitting}>
          Увійти
        </Button>
      </form>
    </div>
  );
}

export default AdminLoginPage;
