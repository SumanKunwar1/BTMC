import SupportHero from '../components/support/SupportHero';
import DonationSection from '../components/support/DonationSection';
import ImpactSection from '../components/support/ImpactSection';
import SupportWays from '../components/support/SupportWays';

const Support = () => {
  return (
    <div style={{ background: '#0a0505', minHeight: '100vh' }}>
      <SupportHero />
      <DonationSection />
      <ImpactSection />
      <SupportWays />
    </div>
  );
};

export default Support;