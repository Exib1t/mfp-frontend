import CtaBanner from "./parts/CtaBanner/CtaBanner";
import FeaturedProducts from "./parts/FeaturedProducts/FeaturedProducts";
import HeroSection from "./parts/HeroSection/HeroSection";
import StatsSection from "./parts/StatsSection/StatsSection";
import UspSection from "./parts/UspSection/UspSection";

function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturedProducts />
      <UspSection />
      <CtaBanner />
    </>
  );
}

export default HomePage;
