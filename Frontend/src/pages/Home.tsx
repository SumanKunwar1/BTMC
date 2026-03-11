import HeroSection from '../components/home/HeroSection';
import BriefAboutSection from '../components/home/BriefAboutSection';
import ServicesSection from '../components/home/ServicesSection';
import EventsSection from '../components/home/EventsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import StatsSection from '../components/home/StatsSection';
import SponsorsSection from '../components/home/SponsorsSection';
import LocationSection from '../components/home/LocationSection';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <BriefAboutSection />
      <ServicesSection />
      <EventsSection />
      <TestimonialsSection />
      <StatsSection />
      <SponsorsSection />
      <LocationSection />
    </div>
  );
};

export default Home;