import Typography from "@/components/controls/Typography/Typography";
import { ADMIN_NAVIGATION } from "@/config/admin-navigation.config";

export default function AdminDashboardPage() {
  const sections = ADMIN_NAVIGATION.filter((item) => item.href !== "/admin");

  return (
    <>
      <Typography variant="h2" as="h1">
        Огляд
      </Typography>
      <Typography variant="body1" color="muted">
        Розділи адмінпанелі: {sections.map((item) => item.label).join(", ")}.
      </Typography>
    </>
  );
}
