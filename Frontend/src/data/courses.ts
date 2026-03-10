import { CourseCategory } from '../types/course';

export const courseCategories: CourseCategory[] = [
  {
    id: 'buddhism',
    title: 'Buddhism',
    description: 'Comprehensive courses covering various aspects of Buddhist philosophy and practice',
    image: 'https://res.cloudinary.com/dihev9qxc/image/upload/v1762066790/a-photograph-of-a-traditional-tibetan-st_5dVQ3zNATyiLh2pw3JHGGQ_UkaTKqtCRcmqWjx05mNKpg_psmdex.jpg',
    courses: [
      {
        id: 'general-buddhism',
        title: 'General Buddhism',
        description: 'Introduction to fundamental Buddhist concepts and practices',
        category: 'Buddhism',
        duration: '3 months',
        language: ['English', 'Nepali', 'Tibetan', 'Hindi'],
        instructor: {
          name: 'Venerable Khen Rinpoche',
          title: 'Senior Buddhist Teacher',
          bio: 'Over 20 years of experience teaching Buddhist philosophy',
          image: 'https://images.unsplash.com/photo-1544476915-ed1370594142?auto=format&fit=crop&q=80'
        },
        highlights: [
          'Understanding Four Noble Truths',
          'Noble Eightfold Path',
          'Buddhist Ethics and Morality',
          'Meditation Techniques'
        ],
        materials: [
          'Course Handouts',
          'Audio/Video Tutorials',
          'Course Certificate'
        ],
        categoryId: undefined
      }
    ]
  },
  
];