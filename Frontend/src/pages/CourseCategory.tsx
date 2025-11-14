import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Book, CheckCircle } from 'lucide-react';
import { courseCategories } from '../data/courses';

const CourseCategory = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = courseCategories.find((cat) => cat.id === categoryId);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Category Not Found</h2>
          <Link to="/teachings" className="text-red-600 hover:text-red-700">
            Back to Teachings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div
        className="bg-gradient-to-r from-red-600 to-red-800 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.h1
            className="text-4xl font-bold text-white mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {category.title}
          </motion.h1>
          <motion.p
            className="text-red-100 text-lg"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {category.description}
          </motion.p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {category.courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {category.courses.map((course) => (
              <motion.div
                key={course.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Link to={`/teachings/${categoryId}/${course.id}`}>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                    <p className="text-gray-600 mb-4">{course.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Book className="w-4 h-4 mr-1" />
                        <span>{course.language.join(', ')}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-red-600 font-semibold">Learn More</span>
                      <motion.div
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <CheckCircle className="w-5 h-5 text-red-600" />
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">
              Courses for this category will be available soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCategory;