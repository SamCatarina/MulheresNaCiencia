import FeaturedScientists from "../components/featured-scientists";
import HeroSection from "../components/hero-section";
import StatsSection from "../components/stats-section";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedScientists />
      <StatsSection />
    </div>
  );
}
