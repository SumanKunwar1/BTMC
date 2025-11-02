import { Target, Users, Heart } from 'lucide-react';

const missions = [
  {
    icon: Target,
    title: 'The Need for Spiritual Guidance',
    description: 'In recent years, the number of individuals seeking spiritual fulfillment, inner peace, and enlightenment through religion has significantly increased. However, there has been a shortage of qualified teachers and sufficient centers to meet these growing demands.'
  },
  {
    icon: Users,
    title: 'A Mission to Serve',
    description: 'In response to this need, BTMC Foundation was established by our esteemed Guru, Venerable Khen Rinpoche Sonam Gyurme. The foundation aims to serve as a spiritual resource, providing high-quality Buddhist education, meditation training, and community outreach.'
  },
  {
    icon: Heart,
    title: 'A Center for All',
    description: 'The foundations vision is to create a space where people of all backgrounds, whether lay practitioners or ordained monks, can access Buddhist teachings. We are committed to helping individuals achieve their spiritual goals.'
  }
];

const AboutMission = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why BTMC Foundation Was Founded</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {missions.map((mission) => {
            const IconComponent = mission.icon;
            return (
              <div key={mission.title} className="bg-white p-6 rounded-lg shadow-lg">
                <IconComponent className="w-12 h-12 text-red-600 mb-4" />
                <h3 className="text-xl font-semibold mb-4">{mission.title}</h3>
                <p className="text-gray-700">{mission.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutMission;