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
  const { series: latestSeries, loading: latestLoading } = useSeriesList(
    1,
    15,
    "latest",
  );
  const { series: popularSeries, loading: popularLoading } = useSeriesList(
    1,
    15,
    "popular",
  );

  const loading = latestLoading || popularLoading;

  return (
    <main>
      <AnimatedSection>
        <HeroSection series={popularSeries.slice(0, 5)} loading={loading} />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <PopularMangas series={popularSeries.slice(0, 5)} loading={loading} />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <SocialBanner />
      </AnimatedSection>

      <AnimatedSection>
        <AnnouncementBar />
      </AnimatedSection>

      <AnimatedSection>
        <PinnedSeries series={latestSeries.slice(0, 9)} loading={loading} />
      </AnimatedSection>

      <AnimatedSection>
        <LatestUpdates
          series={latestSeries}
          loading={loading}
          icon={<LuBookOpen />}
          showTabs
        />
      </AnimatedSection>

      <AnimatedSection>
        <EditorsChoice series={latestSeries} />
      </AnimatedSection>
    </main>
  );
};

export default Home;
