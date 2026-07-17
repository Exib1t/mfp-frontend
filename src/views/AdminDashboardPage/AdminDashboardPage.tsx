"use client";

import Typography from "@/components/controls/Typography/Typography";
import { useAuth } from "@/entities/auth/AuthContext";

function AdminDashboardPage() {
  const { user } = useAuth();

  return (
    <div>
      <Typography variant="h3" weight="semibold">
        Вітаємо{user ? `, ${user.first_name}` : ""}!
      </Typography>
      <Typography variant="body1" color="muted">
        Модулі управління товарами, категоріями та замовленнями з'являться тут.
      </Typography>
    </div>
  );
}

export default AdminDashboardPage;
