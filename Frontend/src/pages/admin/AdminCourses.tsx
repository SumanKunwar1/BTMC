import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, BookOpen, Clock, Users, Edit, Trash2, Eye, X, CheckCircle, Upload } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import Modal from '../../components/shared/Modal';

// Types
interface Instructor {
  name: string;
  title: string;
  bio: string;
  image: string;
  imageFile?: File;
}

interface Course {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  duration: string;
  language: string[];
  instructor: Instructor;
  highlights: string[];
  materials: string[];
  categoryId: string;
  enrolled: number;
  rating: number;
  status: 'active' | 'inactive';
  image: string;
  imageFile?: File;
}

interface CourseFormData {
  title: string;
  description: string;
  shortDescription: string;
  duration: string;
  language: string[];
  instructor: Instructor;
  highlights: string[];
  materials: string[];
  categoryId: string;
  image: string;
  imageFile?: File;
  instructorImageFile?: File;
}

interface CourseFormProps {
  course?: Course;
  onSubmit: (courseData: CourseFormData) => void;
  onCancel: () => void;
}

interface CourseDetailsProps {
  course: Course;
  onClose: () => void;
}

// Mock data - in real app, this would come from API
const initialCourses: Course[] = [
  {
    id: '1',
    title: 'Introduction to Meditation',
    shortDescription: 'Learn basic meditation techniques for beginners',
    description: 'This comprehensive course introduces you to the fundamental practices of meditation. You will learn various techniques to calm your mind, reduce stress, and improve focus in your daily life.',
    duration: '8 weeks',
    language: ['English', 'Nepali'],
    instructor: {
      name: 'Ven. Tenzin Chodron',
      title: 'Senior Meditation Teacher',
      bio: 'With over 20 years of teaching experience, Ven. Tenzin has guided thousands of students in their meditation practice.',
      image: '/api/placeholder/100/100'
    },
    highlights: [
      'Daily guided meditations',
      'Personalized feedback',
      'Community support',
      'Lifetime access to materials'
    ],
    materials: [
      'Guided meditation audio files',
      'Course handbook',
      'Supplementary reading materials',
      'Practice worksheets'
    ],
    categoryId: 'meditation',
    enrolled: 245,
    rating: 4.8,
    status: 'active',
    image: '/api/placeholder/400/200'
  },
  {
    id: '2',
    title: 'Buddhist Philosophy Fundamentals',
    shortDescription: 'Explore core Buddhist teachings and principles',
    description: 'Dive deep into the essential teachings of Buddhism, including the Four Noble Truths, the Eightfold Path, and the concept of dependent origination.',
    duration: '12 weeks',
    language: ['English'],
    instructor: {
      name: 'Dr. Rajesh Sharma',
      title: 'Buddhist Studies Professor',
      bio: 'Dr. Sharma has a PhD in Buddhist Philosophy and has taught at various universities for 15 years.',
      image: '/api/placeholder/100/100'
    },
    highlights: [
      'Comprehensive curriculum',
      'Weekly Q&A sessions',
      'Access to rare texts',
      'Certificate of completion'
    ],
    materials: [
      'Course textbook',
      'Video lectures',
      'Discussion forum access',
      'Supplementary articles'
    ],
    categoryId: 'philosophy',
    enrolled: 178,
    rating: 4.9,
    status: 'active',
    image: '/api/placeholder/400/200'
  }
];

// Image Upload Component
interface ImageUploadProps {
  label: string;
  currentImage: string;
  onImageChange: (file: File | null, imageUrl: string) => void;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ label, currentImage, onImageChange, className }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      onImageChange(file, imageUrl);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onImageChange(null, e.target.value);
  };

  const clearImage = () => {
    onImageChange(null, '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      
      {/* Image Preview */}
      {currentImage && (
        <div className="mb-3">
          <div className="relative inline-block">
            <img
              src={currentImage}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg border"
            />
            <button
              type="button"
              onClick={clearImage}
              className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Upload Methods */}
      <div className="space-y-3">
        {/* File Upload */}
        <div
          className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
            dragOver 
              ? 'border-red-500 bg-red-50' 
              : 'border-gray-300 hover:border-red-400 hover:bg-red-50'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600">
            Drag & drop an image or click to browse
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Supports JPG, PNG, WebP (Max 5MB)
          </p>
        </div>

        {/* OR Separator */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">OR</span>
          </div>
        </div>

        {/* URL Input */}
        <div>
          <label className="block text-xs text-gray-600 mb-1">Enter Image URL</label>
          <div className="flex gap-2">
            <input
              type="url"
              className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
              placeholder="https://example.com/image.jpg"
              value={currentImage.startsWith('blob:') ? '' : currentImage}
              onChange={handleUrlChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminCourses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [viewingCourse, setViewingCourse] = useState<Course | null>(null);

  // Filter courses based on search term
  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateCourse = (courseData: CourseFormData) => {
    const newCourse: Course = {
      ...courseData,
      id: Date.now().toString(),
      enrolled: 0,
      rating: 0,
      status: 'active'
    };
    setCourses([...courses, newCourse]);
    setIsFormOpen(false);
  };

  const handleEditCourse = (courseData: CourseFormData) => {
    if (editingCourse) {
      setCourses(courses.map(course => 
        course.id === editingCourse.id ? { ...courseData, id: course.id, enrolled: course.enrolled, rating: course.rating, status: course.status } : course
      ));
      setEditingCourse(null);
    }
  };

  const handleDeleteCourse = (id: string) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(course => course.id !== id));
    }
  };

  const handleToggleStatus = (id: string) => {
    setCourses(courses.map(course =>
      course.id === id 
        ? { ...course, status: course.status === 'active' ? 'inactive' : 'active' }
        : course
    ));
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <motion.h1 
            className="text-2xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Courses Management
          </motion.h1>
          <motion.button
            onClick={() => setIsFormOpen(true)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Course
          </motion.button>
        </div>

        <motion.div 
          className="bg-white rounded-lg shadow-sm p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search courses by title, instructor, or description..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-3 font-semibold text-gray-600">Course</th>
                  <th className="pb-3 font-semibold text-gray-600">Instructor</th>
                  <th className="pb-3 font-semibold text-gray-600">Duration</th>
                  <th className="pb-3 font-semibold text-gray-600">Enrolled</th>
                  <th className="pb-3 font-semibold text-gray-600">Rating</th>
                  <th className="pb-3 font-semibold text-gray-600">Status</th>
                  <th className="pb-3 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((course) => (
                  <tr key={course.id} className="border-b hover:bg-gray-50">
                    <td className="py-4">
                      <div className="flex items-center">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-12 h-12 rounded-lg object-cover mr-3"
                        />
                        <div>
                          <p className="font-medium">{course.title}</p>
                          <p className="text-sm text-gray-500 line-clamp-1">{course.shortDescription}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="text-gray-600">{course.instructor.name}</span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{course.duration}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        <span>{course.enrolled}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="text-yellow-500">★</span>
                      <span className="text-gray-600 ml-1">{course.rating}</span>
                    </td>
                    <td className="py-4">
                      <button
                        onClick={() => handleToggleStatus(course.id)}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          course.status === 'active' 
                            ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {course.status === 'active' ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setViewingCourse(course)}
                          className="text-blue-600 hover:text-blue-700 p-1"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingCourse(course)}
                          className="text-green-600 hover:text-green-700 p-1"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCourse(course.id)}
                          className="text-red-600 hover:text-red-700 p-1"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredCourses.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No courses found. {searchTerm && 'Try adjusting your search.'}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Create/Edit Course Modal */}
      <Modal
        isOpen={isFormOpen || !!editingCourse}
        onClose={() => {
          setIsFormOpen(false);
          setEditingCourse(null);
        }}
        title={editingCourse ? 'Edit Course' : 'Create New Course'}
      >
        <CourseForm
          course={editingCourse || undefined}
          onSubmit={editingCourse ? handleEditCourse : handleCreateCourse}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingCourse(null);
          }}
        />
      </Modal>

      {/* View Course Details Modal */}
      <Modal
        isOpen={!!viewingCourse}
        onClose={() => setViewingCourse(null)}
        title="Course Details"
      >
        {viewingCourse && (
          <CourseDetails course={viewingCourse} onClose={() => setViewingCourse(null)} />
        )}
      </Modal>
    </AdminLayout>
  );
};

// Course Form Component
const CourseForm: React.FC<CourseFormProps> = ({ course, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<CourseFormData>({
    title: course?.title || '',
    description: course?.description || '',
    shortDescription: course?.shortDescription || '',
    duration: course?.duration || '',
    language: course?.language || ['English'],
    instructor: course?.instructor || {
      name: '',
      title: '',
      bio: '',
      image: ''
    },
    highlights: course?.highlights || [''],
    materials: course?.materials || [''],
    categoryId: course?.categoryId || 'meditation',
    image: course?.image || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleCourseImageChange = (file: File | null, imageUrl: string) => {
    setFormData({
      ...formData,
      image: imageUrl,
      imageFile: file || undefined
    });
  };

  const handleInstructorImageChange = (file: File | null, imageUrl: string) => {
    setFormData({
      ...formData,
      instructor: {
        ...formData.instructor,
        image: imageUrl,
        imageFile: file || undefined
      }
    });
  };

  const handleLanguageChange = (index: number, value: string) => {
    const updatedLanguages = [...formData.language];
    updatedLanguages[index] = value;
    setFormData({ ...formData, language: updatedLanguages });
  };

  const addLanguage = () => {
    setFormData({
      ...formData,
      language: [...formData.language, '']
    });
  };

  const removeLanguage = (index: number) => {
    const updatedLanguages = formData.language.filter((_, i) => i !== index);
    setFormData({ ...formData, language: updatedLanguages });
  };

  const handleHighlightChange = (index: number, value: string) => {
    const updatedHighlights = [...formData.highlights];
    updatedHighlights[index] = value;
    setFormData({ ...formData, highlights: updatedHighlights });
  };

  const addHighlight = () => {
    setFormData({
      ...formData,
      highlights: [...formData.highlights, '']
    });
  };

  const removeHighlight = (index: number) => {
    const updatedHighlights = formData.highlights.filter((_, i) => i !== index);
    setFormData({ ...formData, highlights: updatedHighlights });
  };

  const handleMaterialChange = (index: number, value: string) => {
    const updatedMaterials = [...formData.materials];
    updatedMaterials[index] = value;
    setFormData({ ...formData, materials: updatedMaterials });
  };

  const addMaterial = () => {
    setFormData({
      ...formData,
      materials: [...formData.materials, '']
    });
  };

  const removeMaterial = (index: number) => {
    const updatedMaterials = formData.materials.filter((_, i) => i !== index);
    setFormData({ ...formData, materials: updatedMaterials });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            value={formData.shortDescription}
            onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Description</label>
          <textarea
            required
            rows={4}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
            <input
              type="text"
              required
              placeholder="e.g., 8 weeks"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
            >
              <option value="meditation">Meditation</option>
              <option value="philosophy">Philosophy</option>
              <option value="yoga">Yoga</option>
              <option value="retreat">Retreat</option>
            </select>
          </div>
        </div>
      </div>

      {/* Course Image Upload */}
      <ImageUpload
        label="Course Image"
        currentImage={formData.image}
        onImageChange={handleCourseImageChange}
      />

      {/* Instructor Information */}
      <div className="border-t pt-4">
        <h4 className="font-medium text-gray-700 mb-3">Instructor Information</h4>
        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instructor Name</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                value={formData.instructor.name}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  instructor: { ...formData.instructor, name: e.target.value }
                })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instructor Title</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                value={formData.instructor.title}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  instructor: { ...formData.instructor, title: e.target.value }
                })}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Instructor Bio</label>
            <textarea
              required
              rows={3}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              value={formData.instructor.bio}
              onChange={(e) => setFormData({ 
                ...formData, 
                instructor: { ...formData.instructor, bio: e.target.value }
              })}
            />
          </div>
          
          {/* Instructor Image Upload */}
          <ImageUpload
            label="Instructor Image"
            currentImage={formData.instructor.image}
            onImageChange={handleInstructorImageChange}
          />
        </div>
      </div>

      {/* Languages */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="block text-sm font-medium text-gray-700">Languages</label>
          <button
            type="button"
            onClick={addLanguage}
            className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded"
          >
            Add Language
          </button>
        </div>
        <div className="space-y-2">
          {formData.language.map((lang, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                required
                className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                value={lang}
                onChange={(e) => handleLanguageChange(index, e.target.value)}
                placeholder="Language"
              />
              {formData.language.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeLanguage(index)}
                  className="text-red-600 hover:text-red-700 px-2"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Highlights */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="block text-sm font-medium text-gray-700">Course Highlights</label>
          <button
            type="button"
            onClick={addHighlight}
            className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded"
          >
            Add Highlight
          </button>
        </div>
        <div className="space-y-2">
          {formData.highlights.map((highlight, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                required
                className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                value={highlight}
                onChange={(e) => handleHighlightChange(index, e.target.value)}
                placeholder="Course highlight"
              />
              {formData.highlights.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeHighlight(index)}
                  className="text-red-600 hover:text-red-700 px-2"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Materials */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="block text-sm font-medium text-gray-700">Course Materials</label>
          <button
            type="button"
            onClick={addMaterial}
            className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded"
          >
            Add Material
          </button>
        </div>
        <div className="space-y-2">
          {formData.materials.map((material, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                required
                className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                value={material}
                onChange={(e) => handleMaterialChange(index, e.target.value)}
                placeholder="Course material"
              />
              {formData.materials.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeMaterial(index)}
                  className="text-red-600 hover:text-red-700 px-2"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          {course ? 'Update Course' : 'Create Course'}
        </button>
      </div>
    </form>
  );
};

// Course Details Component
const CourseDetails: React.FC<CourseDetailsProps> = ({ course, onClose }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-start space-x-4">
        <img
          src={course.image}
          alt={course.title}
          className="w-20 h-20 rounded-lg object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold">{course.title}</h3>
          <p className="text-gray-600">{course.shortDescription}</p>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-2">Full Description</h4>
        <p className="text-gray-700">{course.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium mb-2">Duration</h4>
          <p className="text-gray-600">{course.duration}</p>
        </div>
        <div>
          <h4 className="font-medium mb-2">Languages</h4>
          <p className="text-gray-600">{course.language.join(', ')}</p>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3">Instructor</h4>
        <div className="flex items-center space-x-3">
          <img
            src={course.instructor.image}
            alt={course.instructor.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-medium">{course.instructor.name}</p>
            <p className="text-sm text-gray-600">{course.instructor.title}</p>
          </div>
        </div>
        <p className="mt-2 text-gray-700 text-sm">{course.instructor.bio}</p>
      </div>

      <div>
        <h4 className="font-medium mb-2">Course Highlights</h4>
        <ul className="space-y-2">
          {course.highlights.map((highlight, index) => (
            <li key={index} className="flex items-start space-x-2 text-gray-700">
              <CheckCircle className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-medium mb-2">Course Materials</h4>
        <ul className="space-y-2">
          {course.materials.map((material, index) => (
            <li key={index} className="flex items-center space-x-2 text-gray-700">
              <BookOpen className="w-4 h-4 text-red-600" />
              <span>{material}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AdminCourses;