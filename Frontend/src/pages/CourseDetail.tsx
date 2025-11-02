import  { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Book, GraduationCap, Calendar, Globe, CheckCircle } from 'lucide-react';
import { courseCategories } from '../data/courses';
import EnrollmentForm from '../components/teachings/EnrollmentForm';
import RecommendedCourses from '../components/teachings/RecommendedCourses';
import { EnrollmentFormData } from '../types/course';

const CourseDetail = () => {
  const { categoryId, courseId } = useParams<{ categoryId: string; courseId: string }>();
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const category = courseCategories.find((cat) => cat.id === categoryId);
  const course = category?.courses.find((c) => c.id === courseId);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
          <Link to="/teachings" className="text-red-600 hover:text-red-700">
            Back to Teachings
          </Link>
        </div>
      </div>
    );
  }

  const handleEnrollment = (data: EnrollmentFormData) => {
    console.log('Enrollment data:', data);
    setIsEnrollmentOpen(false);
    setShowThankYou(true);
    setTimeout(() => setShowThankYou(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div
        className="relative h-[60vh]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={category?.image ?? ''}
          alt={course?.title ?? ''}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 text-white">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {course.title}
            </motion.h1>
            <motion.div
              className="flex items-center gap-6 flex-wrap"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center">
                <Book className="w-5 h-5 mr-2" />
                <span>{course.language.join(', ')}</span>
              </div>
              <div className="flex items-center">
                <GraduationCap className="w-5 h-5 mr-2" />
                <span>{course.instructor.name}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold mb-4">About the Course</h2>
              <p className="text-gray-700">{course.description}</p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-4">Course Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-2 text-gray-700"
                  >
                    <CheckCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold mb-4">Course Materials</h2>
              <div className="space-y-4">
                {course.materials.map((material, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 text-gray-700"
                  >
                    <Book className="w-5 h-5 text-red-600" />
                    <span>{material}</span>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg sticky top-24"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-4">Instructor</h3>
                  <div className="flex items-center space-x-4">
                    <img
                      src={course.instructor.image}
                      alt={course.instructor.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">{course.instructor.name}</p>
                      <p className="text-gray-600 text-sm">{course.instructor.title}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-700">{course.instructor.bio}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-gray-700">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      <span>Start Date</span>
                    </div>
                    <span>Flexible</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-700">
                    <div className="flex items-center">
                      <Globe className="w-5 h-5 mr-2" />
                      <span>Mode</span>
                    </div>
                    <span>Online/Offline</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsEnrollmentOpen(true)}
                  className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Enroll Now
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        <RecommendedCourses currentCourseId={courseId ?? ''} />
      </div>

      <EnrollmentForm
        isOpen={isEnrollmentOpen}
        onClose={() => setIsEnrollmentOpen(false)}
        onSubmit={handleEnrollment}
        courseTitle={course.title}
      />

      {showThankYou && (
        <motion.div
          className="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
        >
          Thank you for enrolling! We'll contact you soon.
        </motion.div>
      )}
    </div>
  );
};

export default CourseDetail;