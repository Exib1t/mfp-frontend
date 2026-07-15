import Typography from "@/components/controls/Typography/Typography";
import { formatPrice } from "@/lib/utils/formatPrice";
import StepHeading from "../StepHeading/StepHeading";

import "../../ConfiguratorPage.styles.scss";

interface NameStepProps {
  name: string;
  namePrice: number;
  onChange: (name: string) => void;
}

const BASE_CLASS = "configurator";

function NameStep({ name, namePrice, onChange }: NameStepProps) {
  const trimmed = name.trim();

  return (
    <section className={`${BASE_CLASS}_section`}>
      <StepHeading
        step={5}
        title={
          <>
            Персоналізація&nbsp;
            <Typography variant="caption" color="muted" as="span">
              (опціонально, +{formatPrice(namePrice)})
            </Typography>
          </>
        }
      />
      <div className={`${BASE_CLASS}_name-field`}>
        <label htmlFor="wigwam-name" className={`${BASE_CLASS}_name-label`}>
          <Typography variant="body2" color="muted">
            Ім'я дитини для вишивки на вігвамі
          </Typography>
        </label>
        <input
          id="wigwam-name"
          type="text"
          className={`${BASE_CLASS}_name-input`}
          placeholder="Наприклад: Соня"
          maxLength={20}
          value={name}
          onChange={(e) => onChange(e.target.value)}
        />
        {trimmed && (
          <Typography variant="caption" color="primary">
            +{formatPrice(namePrice)} за вишивку «{trimmed}»
          </Typography>
        )}
      </div>
    </section>
  );
}

export default NameStep;
