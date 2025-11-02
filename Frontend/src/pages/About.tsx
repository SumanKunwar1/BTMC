import AboutHero from '../components/about/AboutHero';
import AboutContent from '../components/about/AboutContent';
import AboutMission from '../components/about/AboutMission';
import AboutServices from '../components/about/AboutServices';
import AboutVision from '../components/about/AboutVision';

const About = () => {
  return (
    <div className="space-y-16">
      <AboutHero />
      <AboutContent />
      <AboutMission />
      <AboutServices />
      <AboutVision />
    </div>
  );
};

export default About;