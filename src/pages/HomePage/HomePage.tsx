import HeroSection from "./parts/HeroSection/HeroSection";
import StatsSection from "./parts/StatsSection/StatsSection";
import FeaturedProducts from "./parts/FeaturedProducts/FeaturedProducts";
import UspSection from "./parts/UspSection/UspSection";
import CtaBanner from "./parts/CtaBanner/CtaBanner";

function HomePage() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <FeaturedProducts />
      <UspSection />
      <CtaBanner />
    </main>
  );
}

export default HomePage;
