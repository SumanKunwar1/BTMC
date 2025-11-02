import { DollarSign, Gift, Users, BookOpen } from 'lucide-react';
import { SupportWay } from '../types/support';

export const supportWays: SupportWay[] = [
  {
    icon: DollarSign,
    title: 'One-time Donation',
    description: 'Make a direct impact with a single contribution to support our mission',
    fullDescription: 'Your one-time donation helps us maintain our facilities, support our teachers, and continue providing Buddhist education and meditation programs to our community.',
    image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80',
    benefits: [
      'Immediate impact on our programs and initiatives',
      'Tax-deductible contribution',
      'Recognition in our annual report',
      'Regular updates about the impact of your donation'
    ]
  },
  {
    icon: Gift,
    title: 'Monthly Giving',
    description: 'Become a sustaining supporter with regular monthly donations',
    fullDescription: 'Join our community of monthly donors who provide sustainable support for our ongoing programs and initiatives.',
    image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80',
    benefits: [
      'Sustained support for long-term programs',
      'Special access to member-only events',
      'Monthly newsletter with exclusive updates',
      'Recognition in our donor community'
    ]
  },
  {
    icon: Users,
    title: 'Volunteer',
    description: 'Contribute your time and skills to help our community grow',
    fullDescription: 'Share your skills and time to support our mission. We offer various volunteer opportunities across different areas.',
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80',
    benefits: [
      'Meaningful contribution to the community',
      'Learning opportunities and skill development',
      'Connection with like-minded individuals',
      'Regular appreciation events'
    ]
  },
  {
    icon: BookOpen,
    title: 'Sponsor Programs',
    description: 'Support specific educational programs and events',
    fullDescription: 'Make a targeted impact by sponsoring specific educational programs, events, or initiatives.',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80',
    benefits: [
      'Direct impact on specific programs',
      'Recognition at sponsored events',
      'Detailed impact reports',
      'Special access to sponsored programs'
    ]
  }
];