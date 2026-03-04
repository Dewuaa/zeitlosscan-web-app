import HeroSection from "../components/HeroSection";
import PopularMangas from "../components/PopularMangas";
import SocialBanner from "../components/SocialBanner";
import AnnouncementBar from "../components/AnnouncementBar";
import PinnedSeries from "../components/PinnedSeries";
import LatestUpdates from "../components/LatestUpdates";
import EditorsChoice from "../components/EditorsChoice";
import AnimatedSection from "../components/AnimatedSection";
import { useSeriesList } from "../hooks/useSeriesList";
import { LuBookOpen } from "react-icons/lu";

const Home = () => {
  const { series, loading } = useSeriesList(1, 9);

  return (
    <main>
      <AnimatedSection>
        <HeroSection />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <PopularMangas />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <SocialBanner />
      </AnimatedSection>

      <AnimatedSection>
        <AnnouncementBar />
      </AnimatedSection>

      <AnimatedSection>
        <PinnedSeries series={series} loading={loading} />
      </AnimatedSection>

      <AnimatedSection>
        <LatestUpdates
          series={series}
          loading={loading}
          icon={<LuBookOpen />}
          showTabs
        />
      </AnimatedSection>

      <AnimatedSection>
        <EditorsChoice />
      </AnimatedSection>
    </main>
  );
};

export default Home;
