import React from 'react';
import SupportHero from '../components/support/SupportHero';
import DonationSection from '../components/support/DonationSection';
import ImpactSection from '../components/support/ImpactSection';
import SupportWays from '../components/support/SupportWays';

const Support = () => {
  return (
    <div className="min-h-screen">
      <SupportHero />
      <DonationSection />
      <ImpactSection />
      <SupportWays />
    </div>
  );
};

export default Support;