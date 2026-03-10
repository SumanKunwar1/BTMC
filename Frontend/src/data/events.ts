export interface TicketType {
  type: string;
  price: number;
  benefits: string[];
  available: number;
}

export interface CourseOption {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  day1Title: string;
  day1Items: string[];
  day2Title: string;
  day2Items: string[];
  benefits: string[];
}

export interface Event {
  id: string;
  title: string;
  shortTitle: string;
  shortDescription: string;
  fullDescription: string;
  date: string;
  dateRange?: string;
  time: string;
  venue: string;
  location: string;
  image: string;
  gallery: string[];
  category: string;
  isFree: boolean;
  price?: string;
  ticketTypes: TicketType[];
  highlights: string[];
  courses?: CourseOption[];
  registrationNote?: string;
  tag?: string;
  tagColor?: string;
}

// ─── Shared placeholder images (Cloudinary Buddhist/meditation images) ────────
const HERO_WEEKLY =
  'https://res.cloudinary.com/dihev9qxc/image/upload/v1762066790/a-photograph-of-a-traditional-tibetan-st_5dVQ3zNATyiLh2pw3JHGGQ_UkaTKqtCRcmqWjx05mNKpg_psmdex.jpg';
const HERO_NGYUNGNE =
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80';
const HERO_RIWO =
  'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1200&q=80';
const HERO_DRUBTHOB =
  'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1200&q=80';
const HERO_SRIPADA =
  'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80';

const GALLERY_DEFAULT = [
  'https://res.cloudinary.com/dihev9qxc/image/upload/v1762066790/a-photograph-of-a-traditional-tibetan-st_5dVQ3zNATyiLh2pw3JHGGQ_UkaTKqtCRcmqWjx05mNKpg_psmdex.jpg',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
  'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&q=80',
];

// ─── WEEKLY RETREAT COURSES ───────────────────────────────────────────────────
export const weeklyCourses: CourseOption[] = [
  {
    id: 'course-1',
    icon: '🕊️',
    title: 'Course 1',
    subtitle: 'Anapana Sati & Ngyungne Retreat',
    day1Title: 'Saturday – Anapana Sati Meditation',
    day1Items: [
      'Orientation and Bodhi Cittodpada',
      'Introduction to Mindfulness of Breathing',
      'Sitting & Walking Meditation Sessions',
      'Mindfulness in Daily Life',
      'Group Discussion & Q&A',
      'Evening Dedication Prayers',
    ],
    day2Title: 'Sunday – Ngyungne Retreat',
    day2Items: [
      'Precepts & Retreat Discipline',
      'Avalokiteshvara Practice',
      'Fasting (as per tradition / optional)',
      'Silence, Mantra & Prostration',
      'Dedication for Peace & Compassion',
    ],
    benefits: ['Mental clarity', 'Compassion cultivation', 'Emotional purification'],
  },
  {
    id: 'course-2',
    icon: '🌿',
    title: 'Course 2',
    subtitle: 'Samatha & Vipassana Meditation',
    day1Title: 'Saturday – Samatha (Calm Abiding)',
    day1Items: [
      'Posture, Breath & Concentration Training',
      'Developing Focus & Stability of Mind',
      'Guided Sitting & Walking Meditation',
    ],
    day2Title: 'Sunday – Vipassana (Insight Meditation)',
    day2Items: [
      'Observing Body, Feelings & Mind',
      'Insight into Impermanence & Awareness',
      'Mindful Silence & Reflection',
    ],
    benefits: ['Stress reduction', 'Mental stability', 'Insight & wisdom development'],
  },
  {
    id: 'course-3',
    icon: '🔔',
    title: 'Course 3',
    subtitle: 'Sojong Ngyungne & Noble Silence Retreat',
    day1Title: 'Saturday – Sojong Ngyungne Retreat',
    day1Items: [
      'Confession & Purification Practice',
      'Mahayana & 8 Precepts',
      'Avalokiteshvara Rituals',
      'Ethical Reflection & Renewal',
    ],
    day2Title: 'Sunday – Noble Silence Ngyungne',
    day2Items: [
      'Full Silence Observance',
      'Deep Mantra & Meditation Practice',
      'Inner Healing & Awareness',
      'Closing Dedication Ceremony',
    ],
    benefits: ['Deep karmic purification', 'Ethical discipline', 'Inner silence & peace'],
  },
  {
    id: 'course-4',
    icon: '🔮',
    title: 'Course 4',
    subtitle: 'Group Healing, Aura & Ritual Empowerments',
    day1Title: 'Saturday – Healing & Energy Cleansing',
    day1Items: [
      'Aura Cleansing & Energy Balancing',
      'Psychological Healing Sessions',
      'Mantra & Ritual Therapy',
    ],
    day2Title: 'Sunday – Ritual Healing & Sacred Amulets',
    day2Items: [
      'Empowerment Rituals',
      'Blessing & Amulet Distribution (Long Life, Health, Protection, Prosperity)',
      'Negative Energy Cleansing',
      'Business & Family Protection Rituals',
    ],
    benefits: ['Emotional & mental healing', 'Protection & positivity', 'Spiritual confidence & well-being'],
  },
  {
    id: 'course-5',
    icon: '🗺️',
    title: 'Course 5',
    subtitle: 'Sacred Pilgrimage Puja & Customized Meditation',
    day1Title: 'Day 1 – Puja at Sacred Kathmandu Valley Sites',
    day1Items: [
      'Boudhanath Stupa – Peace, compassion, healing',
      'Swayambhunath Stupa – Wisdom, clarity, obstacle removal',
      'Pharping (Yangleshö & Asura Cave) – Power & accomplishment',
      'Pashupatinath – Long life, purification, prayers for deceased',
      'Mahakala Temple – Protection & business growth',
      'Customized puja: Health, Wealth, Prosperity, Long Life or Deceased',
    ],
    day2Title: 'Day 2 – Customized Meditation Program',
    day2Items: [
      'Mental health & stress relief meditation',
      'Healing & emotional balance',
      'Focus, clarity & mindfulness',
      'Compassion & loving-kindness',
      'Protection & inner strength practices',
    ],
    benefits: [
      'Deep spiritual purification',
      'Mental peace and clarity',
      'Support for health, wealth & protection',
      'Authentic pilgrimage experience',
    ],
  },
];

// ─── EVENTS DATA ──────────────────────────────────────────────────────────────
export const events: Event[] = [
  // ── 1. WEEKLY RETREAT ───────────────────────────────────────────────────────
  {
    id: 'weekly-2-day-retreat',
    title: 'Weekly 2-Day Free Retreat Program',
    shortTitle: 'Weekly Retreat',
    shortDescription:
      'Every Saturday & Sunday — Join our transformational 2-day spiritual retreat in Kathmandu. Meditation, healing, pilgrimage & Dharma teachings. Completely free.',
    fullDescription:
      'BTMC Foundation and Pure Land Tours & Travels proudly introduce Weekly 2-Day Spiritual Tourism Programs, designed for students, office staff, spiritual practitioners, peace lovers, and members of government and non-government organizations from across the world. These programs combine authentic Buddhist meditation, retreat practices, healing rituals, and spiritual tourism — offering deep inner transformation within a short weekend schedule. Participants may choose from five unique course packages each weekend, ranging from Anapana meditation and Ngyungne retreats to sacred pilgrimage pujas and healing empowerments. All programs are offered completely free of cost, reflecting BTMCs commitment to making authentic spiritual practice accessible to all.',
    date: 'Every Saturday & Sunday',
    dateRange: 'Weekly — Ongoing',
    time: '6:00 AM – 8:00 PM',
    venue: 'BTMC Meditation Center, Jorpati',
    location: 'Pragati Marg, Jorpati, Gokarnewar-5, Kathmandu, Nepal',
    image: HERO_WEEKLY,
    gallery: GALLERY_DEFAULT,
    category: 'Retreat',
    isFree: true,
    price: 'Free',
    tag: 'FREE · WEEKLY',
    tagColor: '#16a34a',
    highlights: [
      'Choose from 5 unique course packages each weekend',
      'Residential & non-residential options available',
      'Guided by experienced Buddhist masters',
      'Simple vegetarian meals included',
      'Translation support available',
      'Open to all nationalities & backgrounds',
      'No prior experience required',
      'Bedding & accommodation for residential participants',
    ],
    courses: weeklyCourses,
    ticketTypes: [
      {
        type: 'Non-Residential',
        price: 0,
        benefits: [
          'Full 2-day program access',
          'Guided meditation sessions',
          'Dharma teachings',
          'Vegetarian lunch & tea',
        ],
        available: 100,
      },
      {
        type: 'Residential',
        price: 0,
        benefits: [
          'Full 2-day program access',
          'Overnight accommodation',
          'All vegetarian meals',
          'Bedding & basic facilities',
          'Evening & morning sessions',
        ],
        available: 40,
      },
    ],
    registrationNote:
      'All programs are free of cost. Voluntary donations are welcome and go directly toward sustaining this mission.',
  },

  // ── 2. INTERNATIONAL NGYUNGNE RETREAT ───────────────────────────────────────
  {
    id: '3rd-international-ngyungne-retreat',
    title: '3rd International Ngyungne Retreat & 2nd Potala World Peace Prayers',
    shortTitle: '3rd Ngyungne Retreat',
    shortDescription:
      'Dec 8–24, 2026 · Jorpati, Kathmandu — A sacred 17-day international fasting & purification retreat dedicated to Chenrezig, the Buddha of Compassion. Free of cost.',
    fullDescription:
      'In 2026, BTMC will host the 17-Day 3rd International Ngyungne Retreat and 2nd Potala World Peace Prayers from December 8–24 at its peaceful meditation center in Jorpati, Kathmandu. This sacred event will gather monks, nuns, spiritual masters, and lay practitioners from around the world to practice the powerful Ngyungne fasting and purification retreat dedicated to Chenrezig (Avalokiteshvara), the Buddha of Compassion. The retreat is organized with the noble aspiration of generating compassion, purifying negative karma, and dedicating the accumulated merit for world peace, harmony, prosperity, and the enlightenment of all sentient beings. Through intensive meditation, prayers, prostrations, fasting practices, and Dharma teachings, participants will have a rare opportunity to deepen their spiritual practice in a supportive international environment. In keeping with the compassionate mission of BTMC, this entire retreat is offered completely free of cost — food, accommodation, and all retreat facilities are provided on a voluntary donation basis so that everyone, regardless of financial condition, can participate.',
    date: 'December 8–24, 2026',
    dateRange: '17 Days',
    time: '4:00 AM – 9:00 PM Daily',
    venue: 'BTMC Meditation Center, Jorpati',
    location: 'Pragati Marg, Jorpati, Gokarnewar-5, Kathmandu, Nepal',
    image: HERO_NGYUNGNE,
    gallery: GALLERY_DEFAULT,
    category: 'International Retreat',
    isFree: true,
    price: 'Free (Donation Basis)',
    tag: 'DEC 8–24, 2026',
    tagColor: '#dc2626',
    highlights: [
      '17 days of intensive Ngyungne fasting & purification practice',
      'Dedicated to Chenrezig — the Buddha of Compassion',
      'International gathering of monks, nuns & lay practitioners',
      'Merit dedicated for world peace & enlightenment of all beings',
      'Intensive prostrations, mantra recitation & silent meditation',
      'Dharma teachings by Venerable Dr. Khen Rinpoche Sonam Gyurme',
      'Food, accommodation & retreat facilities included',
      'Live broadcasting available globally',
    ],
    ticketTypes: [
      {
        type: 'Lay Practitioner',
        price: 0,
        benefits: [
          'Full 17-day retreat participation',
          'Accommodation & vegetarian meals',
          'Daily Dharma teachings',
          'Empowerment & blessing ceremonies',
        ],
        available: 200,
      },
      {
        type: 'Monastic Participant',
        price: 0,
        benefits: [
          'Full retreat participation',
          'Monastic accommodation',
          'All meals provided',
          'Dedicated practice schedule',
          'Certificate of participation',
        ],
        available: 100,
      },
    ],
    registrationNote:
      'Offered free of cost on a voluntary donation basis. Early registration recommended as spots are limited.',
  },

  // ── 3. RIWO CHENGA WORLD PEACE PRAYERS — CHINA ─────────────────────────────
  {
    id: '1st-riwo-chenga-world-peace-prayers',
    title: '1st Riwo Chenga World Peace Prayers',
    shortTitle: 'Riwo Chenga — China',
    shortDescription:
      'China — The 1st Riwo Chenga World Peace Prayer event, led by Venerable Dr. Khen Rinpoche Sonam Gyurme. A sacred gathering for global peace, harmony, and compassion.',
    fullDescription:
      'The 1st Riwo Chenga World Peace Prayers is a landmark spiritual event organized by BTMC Foundation at one of the most sacred mountain sites in China. Rooted in the ancient Riwo Chenga (Mountain Smoke Offering) tradition of Tibetan Buddhism, this practice involves the offering of fragrant smoke to local protectors, nagas, and enlightened beings — generating vast merit for world peace, healing of the earth, and the well-being of all sentient beings. Led by Venerable Dr. Khen Rinpoche Sonam Gyurme, this gathering will unite practitioners, spiritual masters, and peace lovers from multiple nations to collectively dedicate prayers for harmony, environmental healing, and global compassion. The ceremony includes large-scale Riwo Chenga offerings, mantra recitation, Dharma teachings, and dedication prayers. BTMC envisions this as the first of many annual international peace prayer events held at significant sacred sites around the world.',
    date: 'TBA — 2026',
    dateRange: 'Date To Be Announced',
    time: 'TBA',
    venue: 'Sacred Mountain Site, China',
    location: 'China (Exact Venue TBA)',
    image: HERO_RIWO,
    gallery: GALLERY_DEFAULT,
    category: 'World Peace Prayers',
    isFree: false,
    price: 'Contact for Details',
    tag: 'CHINA · 2026',
    tagColor: '#7c3aed',
    highlights: [
      'Ancient Riwo Chenga smoke offering tradition',
      'Merit dedicated for world peace & environmental healing',
      'International gathering of spiritual masters',
      'Led by Venerable Dr. Khen Rinpoche Sonam Gyurme',
      'Mantra recitation, Dharma teachings & dedications',
      'First of BTMC\'s annual international peace prayer series',
    ],
    ticketTypes: [
      {
        type: 'Pilgrim Participant',
        price: 0,
        benefits: [
          'Full prayer event participation',
          'Guided pilgrimage support',
          'Dharma teachings',
          'Dedicated merit dedication ceremony',
        ],
        available: 150,
      },
    ],
    registrationNote:
      'Exact dates and registration details to be announced. Contact BTMC Foundation for early expressions of interest.',
  },

  // ── 4. DRUBTHOB GYECHU — MUMBAI ─────────────────────────────────────────────
  {
    id: '1st-drubthob-gyechu-world-peace-prayers',
    title: '1st Drubthob Gyechu World Peace Prayers',
    shortTitle: 'Drubthob Gyechu — Mumbai',
    shortDescription:
      'Nov 1–4, 2026 · Mumbai, India — A powerful 4-day World Peace Prayer event at one of India\'s most sacred Buddhist sites, uniting practitioners for global harmony.',
    fullDescription:
      'The 1st Drubthob Gyechu World Peace Prayers will be held from November 1–4, 2026, in Mumbai, India — organized by BTMC Foundation and its partner organization Padma Sambhava Tri. The Drubthob Gyechu (Gathering of Accomplished Masters) is a profound Vajrayana ceremony invoking the blessings of eighty-four Mahasiddhas — the great accomplished masters of Indian and Tibetan Buddhism. This event will bring together Buddhist masters, monks, nuns, and devoted practitioners from India, Nepal, and beyond for four days of intensive prayers, mantra recitations, fire offerings (Homa/Yajnas), and empowerment ceremonies. The accumulated merit will be dedicated for world peace, the long life of spiritual masters, the health and prosperity of all participants\' families, and the liberation of all sentient beings. Mumbai\'s rich connection to India\'s Buddhist heritage, along with the energy of the Mahasiddha lineage, makes this an extraordinarily auspicious event.',
    date: 'November 1–4, 2026',
    dateRange: '4 Days',
    time: '6:00 AM – 8:00 PM Daily',
    venue: 'Sacred Buddhist Venue, Mumbai',
    location: 'Mumbai, Maharashtra, India',
    image: HERO_DRUBTHOB,
    gallery: GALLERY_DEFAULT,
    category: 'World Peace Prayers',
    isFree: false,
    price: 'Contact for Details',
    tag: 'NOV 1–4, 2026',
    tagColor: '#b45309',
    highlights: [
      'Invocation of the 84 Mahasiddhas — great accomplished masters',
      'Fire offerings (Homa) for peace, prosperity & long life',
      'Empowerment ceremonies & blessing rituals',
      'Merit dedicated for world peace & liberation of all beings',
      'Organized with Padma Sambhava Tri — India',
      'International gathering in India\'s spiritual heartland',
    ],
    ticketTypes: [
      {
        type: 'Standard Participant',
        price: 0,
        benefits: [
          'Full 4-day event participation',
          'Dharma teachings & empowerments',
          'Vegetarian meals during sessions',
          'Blessing ceremony participation',
        ],
        available: 300,
      },
      {
        type: 'Sponsored Participant',
        price: 0,
        benefits: [
          'Full participation with dedicated merit',
          'Personal name in dedication prayers',
          'Blessed ritual items',
          'Certificate of participation',
        ],
        available: 50,
      },
    ],
    registrationNote:
      'Accommodation support available through Pure Land Tours & Travels and Padma Sambhava Tri. Contact BTMC for logistics.',
  },

  // ── 5. SRIPADA WORLD PEACE PRAYERS ──────────────────────────────────────────
  {
    id: '1st-sripada-world-peace-prayers',
    title: '1st Sripada World Peace Prayers',
    shortTitle: 'Sripada Peace Prayers',
    shortDescription:
      'Dec 18–19, 2026 — A sacred 2-day World Peace Prayer event at the revered Sri Pada (Adam\'s Peak) pilgrimage site, a place sacred to Buddhists, Hindus, Muslims & Christians.',
    fullDescription:
      'The 1st Sripada World Peace Prayers will take place on December 18–19, 2026, at Sri Pada (Adam\'s Peak) — one of the most sacred pilgrimage sites in Asia, revered by Buddhists, Hindus, Muslims, and Christians alike. Organized by BTMC Foundation, this unique interfaith World Peace Prayer event harnesses the profound spiritual energy of this multi-faith sacred mountain to generate merit and prayers for universal peace, inter-religious harmony, and compassion across all traditions. Venerable Dr. Khen Rinpoche Sonam Gyurme will lead the Buddhist prayer and meditation sessions, joined by practitioners from multiple traditions in a rare expression of spiritual unity. The program includes the traditional pilgrimage ascent to the sacred footprint shrine, large-scale peace prayers and mantra recitations, offerings and dedications, and a closing ceremony for the well-being of all sentient beings. This event is a powerful statement that peace is the shared aspiration of all humanity.',
    date: 'December 18–19, 2026',
    dateRange: '2 Days',
    time: '3:00 AM – 6:00 PM',
    venue: 'Sri Pada (Adam\'s Peak)',
    location: 'Ratnapura District, Sri Lanka',
    image: HERO_SRIPADA,
    gallery: GALLERY_DEFAULT,
    category: 'World Peace Prayers',
    isFree: false,
    price: 'Contact for Details',
    tag: 'DEC 18–19, 2026',
    tagColor: '#0369a1',
    highlights: [
      'Sacred site revered by Buddhists, Hindus, Muslims & Christians',
      'Rare interfaith World Peace Prayer event',
      'Traditional pilgrimage ascent to the sacred footprint shrine',
      'Led by Venerable Dr. Khen Rinpoche Sonam Gyurme',
      'Merit dedicated for universal peace & inter-religious harmony',
      'Mantra recitations, offerings & closing dedication ceremony',
    ],
    ticketTypes: [
      {
        type: 'Pilgrimage Participant',
        price: 0,
        benefits: [
          'Full 2-day pilgrimage & prayer program',
          'Guided ascent to Sri Pada',
          'Prayer ceremony participation',
          'Dedication & blessing',
        ],
        available: 80,
      },
    ],
    registrationNote:
      'Travel and accommodation support available through Pure Land Tours & Travels. Limited spots — early registration essential.',
  },
];