import { cn } from "@/lib/utils/cn";

import "./Skeleton.styles.scss";

interface SkeletonProps {
  className?: string;
}

const BASE_CLASS = "skeleton";

function Skeleton({ className }: SkeletonProps) {
  return <div className={cn(BASE_CLASS, className)} />;
}

export default Skeleton;
