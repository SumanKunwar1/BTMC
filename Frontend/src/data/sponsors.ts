// ─────────────────────────────────────────────────────────────────────────────
// SPONSORS DATA
// Each tier has a label and a list of sponsors.
// To add a sponsor: copy any entry and fill in the fields.
// logo: URL to their logo image (can be null to show initials fallback)
// website: their URL — shown as a clickable link
// ─────────────────────────────────────────────────────────────────────────────

export interface Sponsor {
  id: string;
  name: string;
  tagline?: string;           // short one-liner about them
  logo: string | null;        // logo image URL, or null for initials fallback
  website: string;            // clickable link
  country?: string;           // e.g. 'Nepal', 'India', 'USA'
  countryFlag?: string;       // emoji flag e.g. '🇳🇵'
}

export interface SponsorTier {
  id: string;
  label: string;              // display name of the tier
  description: string;        // short description of what this tier means
  accentColor: string;        // color used for this tier's badge/border
  badgeIcon: string;          // emoji icon for the tier
  sponsors: Sponsor[];
}

export const sponsorTiers: SponsorTier[] = [
  {
    id: 'title',
    label: 'Title Sponsor',
    description: 'Our highest honour — the primary patron of BTMC Foundation',
    accentColor: '#d97706',   // gold
    badgeIcon: '👑',
    sponsors: [
      {
        id: 'title-1',
        name: 'BTMC Foundation',
        tagline: 'Spreading Buddhist wisdom and compassion since 2003',
        logo: 'https://rdcck.org/img/BTMC%20FINAL%20LOGO%20.png',
        website: 'https://btmcfoundation.org/',
        country: 'Nepal',
        countryFlag: '🇳🇵',
      },
    ],
  },
  {
    id: 'platinum',
    label: 'Platinum Sponsors',
    description: 'Pillars of our mission — sustaining programs year-round',
    accentColor: '#94a3b8',   // platinum / silver-blue
    badgeIcon: '💎',
    sponsors: [
      {
        id: 'plat-1',
        name: 'Pure Land Tours & Travels',
        tagline: 'Spiritual journeys & pilgrimage services',
        logo: 'https://catalog.wlimg.com/4/1834597/other-images/54852.jpg',
        website: 'https://www.purelandtravels.com.np/',
        country: 'Nepal',
        countryFlag: '🇳🇵',
      },
      {
        id: 'plat-2',
        name: 'Padma Sambhava Trip',
        tagline: 'Sacred pilgrimage tours across India',
        logo: 'https://res.cloudinary.com/dihev9qxc/image/upload/v1768991877/453207561_122102729312441160_4787222294410407220_n-removebg-preview_voy795.png',
        website: 'https://padmasambhavatrip.com/',
        country: 'India',
        countryFlag: '🇮🇳',
      },
    ],
  },
  {
    id: 'gold',
    label: 'Gold Sponsors',
    description: 'Generous supporters enabling our events and retreats',
    accentColor: '#b45309',   // warm gold
    badgeIcon: '🥇',
    sponsors: [
      {
        id: 'gold-1',
        name: 'Dharma Television',
        tagline: 'Broadcasting Dharma to the world',
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdYysfqrvalS-TerkBDcijeup1P4ez5WSPkg&s',
        website: 'https://dharmatelevision.tv/',
        country: 'Nepal',
        countryFlag: '🇳🇵',
      },
      {
        id: 'gold-2',
        name: 'RDCCK School',
        tagline: 'Nurturing young monks in wisdom & discipline',
        logo: 'https://rdcck.org/img/logo.png',
        website: 'https://rdcck.org/',
        country: 'Nepal',
        countryFlag: '🇳🇵',
      },
    ],
  },
  {
    id: 'silver',
    label: 'Silver Sponsors',
    description: 'Valued partners supporting our community programs',
    accentColor: '#9ca3af',   // silver
    badgeIcon: '🥈',
    sponsors: [
      {
        id: 'silver-1',
        name: 'Add Your Organization',
        tagline: 'Become a Silver Sponsor today',
        logo: null,
        website: '/contact',
        country: 'Your Country',
        countryFlag: '🌏',
      },
    ],
  },
  {
    id: 'supported-by',
    label: 'Supported By',
    description: 'Organizations and institutions that back our vision',
    accentColor: '#b91c1c',   // site red
    badgeIcon: '🤝',
    sponsors: [
      {
        id: 'sup-1',
        name: 'Noble Enlightened Association',
        tagline: 'Community welfare inspired by Buddhist values',
        logo: null,
        website: '#',
        country: 'Nepal',
        countryFlag: '🇳🇵',
      },
    ],
  },
  {
    id: 'associate',
    label: 'Associate Sponsors',
    description: 'Our growing network of collaborative partners',
    accentColor: '#7c3aed',   // purple
    badgeIcon: '🌸',
    sponsors: [
      {
        id: 'assoc-1',
        name: 'Your Organization Here',
        tagline: 'Partner with us for a meaningful cause',
        logo: null,
        website: '/contact',
        country: 'Global',
        countryFlag: '🌍',
      },
    ],
  },
  {
    id: 'media',
    label: 'Media Partners',
    description: 'Amplifying our message to the world',
    accentColor: '#0891b2',   // cyan
    badgeIcon: '📡',
    sponsors: [
      {
        id: 'media-1',
        name: 'Dharma Television',
        tagline: 'Satellite & online Dharma broadcasting',
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdYysfqrvalS-TerkBDcijeup1P4ez5WSPkg&s',
        website: 'https://dharmatelevision.tv/',
        country: 'Nepal',
        countryFlag: '🇳🇵',
      },
    ],
  },
];