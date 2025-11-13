import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { courseCategories } from '../../data/courses';
import { Course } from '../../types/course';

interface RecommendedCoursesProps {
  currentCourseId: string;
}

const RecommendedCourses: React.FC<RecommendedCoursesProps> = ({ currentCourseId }) => {
  const getRandomCourses = (): Course[] => {
    // Flatten all courses from all categories
    const allCourses = courseCategories.flatMap((category) => 
      category.courses.map((course) => ({
        ...course,
        categoryId: category.id
      }))
    );

    // Filter out the current course and ensure we have courses to recommend
    const filteredCourses = allCourses.filter((course) => course.id !== currentCourseId);

    // If there are no other courses, return empty array
    if (filteredCourses.length === 0) {
      return [];
    }

    // If there are 3 or fewer courses, return all of them
    if (filteredCourses.length <= 3) {
      return filteredCourses;
    }

    // Otherwise, return 3 random courses
    return filteredCourses
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
  };

  const recommendedCourses = getRandomCourses();

  // Don't show the section if there are no recommended courses
  if (recommendedCourses.length === 0) {
    return null;
  }

  return (
    <motion.section
      className="mt-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
    >
      <h2 className="text-2xl font-bold mb-8">Recommended Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recommendedCourses.map((course) => (
          <motion.div
            key={course.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <Link to={`/teachings/${course.categoryId}/${course.id}`}>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    {course.instructor.name}
                  </div>
                  <span className="text-red-600 font-semibold">Explore Now →</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default RecommendedCourses;