import Typography from "@/components/controls/Typography/Typography";

import "./HeroSection.styles.css";

const BASE_CLASS = "hero-section";

const HeroSection = () => {
  return (
    <section className={BASE_CLASS}>
      <Typography variant={"h3"}>Popular products</Typography>
    </section>
  );
};
export default HeroSection;
