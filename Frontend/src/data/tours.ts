import { Tour } from '../types/tour';

export const tours: Tour[] = [
  {
    id: 'usa-canada-tour',
    title: '10-days USA & Canada Tour',
    days: 10,
    image: 'https://images.unsplash.com/photo-1501435764075-903868ebb179?auto=format&fit=crop&q=80',
    description: 'Experience the spiritual journey through sacred Buddhist sites in North America, including temples, meditation centers, and cultural landmarks.',
    highlights: [
      'Visit major Buddhist temples in New York',
      'Meditation retreat in Canadian wilderness',
      'Cultural exchange with local Buddhist communities',
      'Guided tours with Buddhist scholars'
    ],
    activities: [
      'City Tours',
      'Meditation Sessions',
      'Cultural Workshops',
      'Community Gatherings'
    ],
    inclusions: [
      'All accommodations',
      'Daily vegetarian meals',
      'Transportation',
      'Expert guides',
      'Meditation sessions',
      'Entry fees to temples'
    ],
    itinerary: [
      { day: 1, description: 'Arrival in New York - Welcome ceremony and orientation' },
      { day: 2, description: 'Visit to New York Buddhist temples and meditation centers' },
      { day: 3, description: 'Travel to Toronto - Evening meditation session' }
    ]
  },
  {
    id: 'tibet-mansarovar',
    title: '15-days Tibet Mansarovar Tour',
    days: 15,
    image: 'https://images.unsplash.com/photo-1513023840371-dd774153c90d?auto=format&fit=crop&q=80',
    description: 'A spiritual pilgrimage to Mount Kailash and Lake Mansarovar, combining meditation, teaching, and sacred site visits.',
    highlights: [
      'Mount Kailash Parikrama',
      'Lake Mansarovar meditation',
      'Visit to ancient monasteries',
      'High-altitude spiritual retreat'
    ],
    activities: [
      'Hiking',
      'Meditation',
      'Temple Visits',
      'Cultural Immersion'
    ],
    inclusions: [
      'Tibet travel permits',
      'Accommodation in hotels and camps',
      'All meals',
      'Experienced guides',
      'Oxygen support',
      'Transportation'
    ],
    itinerary: [
      { day: 1, description: 'Arrival in Lhasa - Acclimatization and welcome ceremony' },
      { day: 2, description: 'Visit to Potala Palace and Jokhang Temple' },
      { day: 3, description: 'Drive to Shigatse - Visit Tashilhunpo Monastery' }
    ]
  }
];