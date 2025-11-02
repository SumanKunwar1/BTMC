import { Event } from '../types/event';

export const events: Event[] = [
  {
    id: 'sajja-maharjan-live-2024',
    title: 'Live Music Concert of Sajja Maharjan',
    shortDescription: 'Experience the soulful melodies of Sajja Maharjan live in concert.',
    fullDescription: `Join us for an unforgettable evening of music with the renowned artist Sajja Maharjan. 
    This exclusive concert will feature his greatest hits and new compositions in an intimate setting. 
    Don't miss this opportunity to experience his magical performance live.`,
    date: 'March 30, 2024',
    time: '6:00 PM',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80',
    location: 'Kathmandu, Nepal',
    venue: 'Army Officers Club',
    artist: 'Sajja Maharjan',
    ticketTypes: [
      {
        type: 'VVIP',
        price: 5000,
        benefits: [
          'Front row seating',
          'Meet & Greet with artist',
          'Exclusive merchandise',
          'Complimentary refreshments',
          'Priority parking'
        ],
        available: 50
      },
      {
        type: 'VIP',
        price: 3000,
        benefits: [
          'Premium seating',
          'Complimentary refreshments',
          'Event merchandise'
        ],
        available: 100
      },
      {
        type: 'Regular',
        price: 1500,
        benefits: [
          'General seating',
          'Standard amenities'
        ],
        available: 200
      }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&q=80'
    ]
  }
];