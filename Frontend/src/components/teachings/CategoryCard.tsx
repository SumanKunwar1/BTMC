import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { CourseCategory } from '../../types/course';

interface CategoryCardProps {
  category: CourseCategory;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  // If it's Buddhism category and has courses, link directly to the first course
  const linkTo = category.id === 'buddhism' && category.courses.length > 0
    ? `/teachings/${category.id}/${category.courses[0].id}`
    : `/teachings/${category.id}`;

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={linkTo}>
        <div className="relative h-48">
          <img
            src={category.image}
            alt={category.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">{category.title}</h3>
          <p className="text-gray-600 mb-4">{category.description}</p>
          <div className="flex items-center text-red-600 font-semibold group">
            <span>Explore Courses</span>
            <motion.div
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight className="w-5 h-5 ml-2" />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;