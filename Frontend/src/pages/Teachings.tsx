import { GraduationCap } from 'lucide-react';
import CategoryCard from '../components/teachings/CategoryCard';
import { courseCategories } from '../data/courses';

const Teachings = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-red-600 to-red-800 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-4">
            <GraduationCap className="w-12 h-12 text-white" />
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Buddhist Teachings & Courses
              </h1>
              <p className="text-red-100 text-lg">
                Explore our comprehensive range of courses and begin your spiritual journey
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courseCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        <div className="mt-16 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Course Information</h2>
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <div>
              <h3 className="text-xl font-semibold mb-2">Class Capacity</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Teaching Center: 30-50 students</li>
                <li>Online Classes with Visuals: 6 students</li>
                <li>Online Classes without Visuals: Unlimited capacity</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Course Materials</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Handouts of related subjects</li>
                <li>Audio/Video tutorials</li>
                <li>Course Certificate upon completion</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Support-Based Model</h3>
              <p>
                BTMC Foundation operates on Buddhist principles. We accept your support rather
                than charging course fees. Your support helps us maintain and improve our
                services, benefiting present and future generations while preserving peace
                and harmony in the world.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teachings;
