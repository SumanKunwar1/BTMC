import { BookOpen, Map, GraduationCap, Globe } from 'lucide-react';

const services = [
  {
    icon: BookOpen,
    title: 'Buddhist Education and Meditation Programs',
    description: 'Long-term and short-term training courses in Buddhist philosophy, meditation, rituals, and prayer for both beginners and advanced students.'
  },
  {
    icon: Map,
    title: 'Pilgrimage Tours',
    description: 'Organized tours to significant Buddhist sites with spiritual teachings and quality services including accommodation and live broadcasting.'
  },
  {
    icon: GraduationCap,
    title: 'Education Beyond Buddhism',
    description: 'Language and grammar training courses in Tibetan, English, and Nepali, enabling deeper understanding of Buddhist texts.'
  },
  {
    icon: Globe,
    title: 'Community Support',
    description: 'Active involvement in social service and disaster relief, providing support during natural calamities and community needs.'
  }
];

const AboutServices = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What BTMC Foundation Does</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div key={service.title} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <IconComponent className="w-12 h-12 text-red-600 mb-4" />
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-700">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutServices;