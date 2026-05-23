import Typography from "@/components/controls/Typography/Typography";
import "./StatsSection.styles.scss";

const BASE_CLASS = "stats-section";

const STATS = [
  { value: "500+", label: "задоволених клієнтів" },
  { value: "3+", label: "роки на ринку" },
  { value: "100%", label: "ручна робота" },
  { value: "UA", label: "Доставка по Україні" },
];

function StatsSection() {
  return (
    <section className={BASE_CLASS}>
      <ul className={`${BASE_CLASS}_list`}>
        {STATS.map(({ value, label }) => (
          <li key={label} className={`${BASE_CLASS}_item`}>
            <Typography variant="h3" as="span" color="primary" className={`${BASE_CLASS}_value`}>
              {value}
            </Typography>
            <Typography variant="body2" color="muted" className={`${BASE_CLASS}_label`}>
              {label}
            </Typography>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default StatsSection;
