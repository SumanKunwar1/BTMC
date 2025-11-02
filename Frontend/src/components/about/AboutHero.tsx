import { Scroll } from 'lucide-react';

const AboutHero = () => {
  return (
    <section className="bg-gradient-to-r from-red-600 to-red-800 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center space-x-4">
          <Scroll className="w-8 h-8 text-white" />
          <div>
            <h1 className="text-3xl font-bold text-white">About BTMC Foundation</h1>
            <p className="text-red-100 mt-1">
              Spreading Buddhist wisdom and fostering spiritual growth since 2003
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;