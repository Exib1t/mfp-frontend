"use client";

import AdminPageHeader from "@/components/admin/AdminPageHeader/AdminPageHeader";
import AdminTabs from "@/components/admin/AdminTabs/AdminTabs";
import ConfirmDialog from "@/components/admin/ConfirmDialog/ConfirmDialog";
import EmptyState from "@/components/controls/EmptyState/EmptyState";
import Skeleton from "@/components/controls/Skeleton/Skeleton";
import Typography from "@/components/controls/Typography/Typography";
import {
  REVIEW_STATUS_LABELS,
  REVIEW_STATUS_ORDER,
} from "@/entities/admin/reviews/types";
import ReviewCard from "./parts/ReviewCard";
import { useReviewsQueue } from "./useReviewsQueue";

import "./AdminReviewsPage.styles.scss";

const BASE_CLASS = "admin-reviews";

const TABS = REVIEW_STATUS_ORDER.map((status) => ({
  id: status,
  label: REVIEW_STATUS_LABELS[status],
}));

function AdminReviewsPage() {
  const state = useReviewsQueue();

  return (
    <div className={BASE_CLASS}>
      <AdminPageHeader
        title="Відгуки"
        description="Нові відгуки не видно покупцям, поки їх не опублікують."
      />

      <AdminTabs tabs={TABS} value={state.status} onChange={state.setStatus} />

      {state.isError && (
        <Typography variant="body2" color="muted">
          Не вдалося завантажити відгуки.
        </Typography>
      )}

      {state.isLoading && <Skeleton />}

      {!state.isLoading && !state.isError && state.reviews.length === 0 && (
        <EmptyState
          title={
            state.status === "pending"
              ? "Немає відгуків на модерації"
              : "Тут порожньо"
          }
        />
      )}

      <div className={`${BASE_CLASS}_list`}>
        {state.reviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            isBusy={state.isModerating}
            onModerate={(status) => state.moderate(review, status)}
            onDelete={() => state.requestDelete(review)}
          />
        ))}
      </div>

      <ConfirmDialog
        open={state.pendingDelete !== null}
        title="Видалити відгук?"
        description={
          state.pendingDelete
            ? `Відгук від ${state.pendingDelete.author_name} буде приховано.`
            : undefined
        }
        isPending={state.isDeleting}
        onConfirm={state.confirmDelete}
        onCancel={state.cancelDelete}
      />
    </div>
  );
}

export default AdminReviewsPage;
