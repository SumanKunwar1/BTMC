import { CourseCategory } from '../types/course';

export const courseCategories: CourseCategory[] = [
  {
    id: 'buddhism',
    title: 'Buddhism',
    description: 'Comprehensive courses covering various aspects of Buddhist philosophy and practice',
    image: 'https://images.unsplash.com/photo-1519833547756-d27ac120e3e6?auto=format&fit=crop&q=80',
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
  {
    id: 'practical-buddhism',
    title: 'Practical Buddhism',
    description: 'Learn to apply Buddhist principles in daily life',
    image: 'https://images.unsplash.com/photo-1519682577862-22b62b24e493?auto=format&fit=crop&q=80',
    courses: []
  },
  {
    id: 'individual-courses',
    title: 'Individual Courses',
    description: 'Specialized courses tailored to specific aspects of Buddhist practice',
    image: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&q=80',
    courses: []
  },
  {
    id: 'other-teachings',
    title: 'Other Course Base Teachings',
    description: 'Additional Buddhist teachings and specialized topics',
    image: 'https://images.unsplash.com/photo-1533669955142-6a73332af4db?auto=format&fit=crop&q=80',
    courses: []
  },
  {
    id: 'buddhist-history',
    title: 'Buddhist History',
    description: 'Explore the rich history of Buddhism across different regions',
    image: 'https://images.unsplash.com/photo-1609619385002-f40f1df9b7eb?auto=format&fit=crop&q=80',
    courses: []
  },
  {
    id: 'languages',
    title: 'Languages',
    description: 'Learn Himalayan languages for deeper understanding of Buddhist texts',
    image: 'https://images.unsplash.com/photo-1456081445129-830eb8d4bfc6?auto=format&fit=crop&q=80',
    courses: []
  },
  {
    id: 'grammar',
    title: 'Grammar',
    description: 'Master Himalayan grammar for authentic text interpretation',
    image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80',
    courses: []
  },
  {
    id: 'ritual-teachings',
    title: 'Ritual Teachings and Trainings',
    description: 'Learn traditional Buddhist rituals and ceremonies',
    image: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&q=80',
    courses: []
  },
  {
    id: 'astrology',
    title: 'Astrology',
    description: 'Study Buddhist astrology and its applications',
    image: 'https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?auto=format&fit=crop&q=80',
    courses: []
  }
];