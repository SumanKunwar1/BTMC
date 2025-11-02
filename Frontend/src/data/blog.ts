import { BlogPost } from '../types/blog';

export const blogPosts: BlogPost[] = [
  {
    id: 'buddhist-meditation-guide',
    title: 'A Comprehensive Guide to Buddhist Meditation',
    excerpt: 'Learn the fundamentals of Buddhist meditation and how to incorporate it into your daily life.',
    content: 'Full content here...',
    author: {
      name: 'Venerable Khen Rinpoche',
      avatar: 'https://images.unsplash.com/photo-1544476915-ed1370594142?auto=format&fit=crop&q=80',
      role: 'Senior Buddhist Teacher'
    },
    date: '2024-03-15',
    image: 'https://images.unsplash.com/photo-1609619385002-f40f1df9b7eb?auto=format&fit=crop&q=80',
    category: 'Meditation',
    tags: ['meditation', 'buddhism', 'mindfulness'],
    readTime: 8
  },
  // Add more blog posts...
];