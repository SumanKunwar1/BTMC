import { Sparkles } from 'lucide-react';

const AboutVision = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-red-600 to-red-800 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <Sparkles className="w-12 h-12 mb-6" />
          <h2 className="text-3xl font-bold mb-6">Vision of BTMC Foundation</h2>
          <p className="text-lg max-w-3xl">
            Our vision is to create a world where individuals live in peace, compassion, and wisdom. 
            We strive to be a leading center for Buddhist education and spiritual growth, where people 
            from all walks of life can come to learn, practice, and grow in their spiritual journey. 
            Through our teachings, pilgrimage tours, and community outreach, we aim to foster a sense 
            of global unity, understanding, and collective well-being.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutVision;