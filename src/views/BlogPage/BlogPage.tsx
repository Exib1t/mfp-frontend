import { BookOpen } from "lucide-react";
import StaticPageLayout from "@/components/common/StaticPageLayout/StaticPageLayout";
import Typography from "@/components/controls/Typography/Typography";

import "./BlogPage.styles.scss";

const BASE_CLASS = "blog-page";

function BlogPage() {
  return (
    <StaticPageLayout title="Блог">
      <div className={BASE_CLASS}>
        <BookOpen size={40} strokeWidth={1.5} aria-hidden="true" />
        <Typography variant="body1" color="muted">
          Тут з'являться натхнення, поради з догляду за текстилем та історії
          наших клієнтів. Слідкуйте за оновленнями.
        </Typography>
      </div>
    </StaticPageLayout>
  );
}

export default BlogPage;
