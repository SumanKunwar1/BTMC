export const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    username: '@johndoe',
    email: 'john@example.com',
    phone: '+1 234 567 890',
    role: 'Admin',
    status: 'Active',
    joinedDate: 'Jan 15, 2024',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 2,
    name: 'Jane Smith',
    username: '@janesmith',
    email: 'jane@example.com',
    phone: '+1 234 567 891',
    role: 'User',
    status: 'Active',
    joinedDate: 'Feb 1, 2024',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    username: '@mikej',
    email: 'mike@example.com',
    phone: '+1 234 567 892',
    role: 'Moderator',
    status: 'Inactive',
    joinedDate: 'Mar 10, 2024',
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
];

export const mockCourses = [
  {
    id: 1,
    title: 'Introduction to Buddhism',
    instructor: 'Dr. Sarah Chen',
    duration: '8 weeks',
    enrolled: 156,
    rating: 4.8,
    status: 'Active'
  },
  // Add more mock courses...
];

export const mockDonations = [
  {
    id: 1,
    donor: 'Anonymous',
    amount: 1000,
    type: 'One-time',
    date: 'Mar 15, 2024',
    status: 'Completed'
  },
  // Add more mock donations...
];

export const mockTours = [
  {
    id: 1,
    title: 'Sacred Buddhist Sites Tour',
    duration: '10 days',
    participants: 25,
    startDate: 'Apr 1, 2024',
    status: 'Upcoming'
  },
  // Add more mock tours...
];