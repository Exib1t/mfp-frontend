import HeroSection from "./parts/HeroSection/HeroSection";
import FeaturedProducts from "./parts/FeaturedProducts/FeaturedProducts";
import UspSection from "./parts/UspSection/UspSection";
import CtaBanner from "./parts/CtaBanner/CtaBanner";

function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturedProducts />
      <UspSection />
      <CtaBanner />
    </main>
  );
}

export default HomePage;
