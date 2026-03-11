// Support.tsx
import SupportHero from '../components/support/SupportHero';
import DonationSection from '../components/support/DonationSection';
import ImpactSection from '../components/support/ImpactSection';
import SupportWays from '../components/support/SupportWays';

const Support = () => (
  <div style={{ background:'#fdf8f3', minHeight:'100vh' }}>
    <SupportHero/>
    <DonationSection/>
    <ImpactSection/>
    <SupportWays/>
  </div>
);

export default Support;