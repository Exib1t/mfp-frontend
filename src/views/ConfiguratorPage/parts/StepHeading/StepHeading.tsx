import type { ReactNode } from "react";
import Typography from "@/components/controls/Typography/Typography";

import "../../ConfiguratorPage.styles.scss";

interface StepHeadingProps {
  step: number;
  title: ReactNode;
}

const BASE_CLASS = "configurator";

function StepHeading({ step, title }: StepHeadingProps) {
  return (
    <div className={`${BASE_CLASS}_section-heading`}>
      <Typography
        variant="overline"
        color="muted"
        className={`${BASE_CLASS}_section-step`}
      >
        Крок {step}
      </Typography>
      <Typography variant="h4" as="h2">
        {title}
      </Typography>
    </div>
  );
}

export default StepHeading;
