// ─────────────────────────────────────────────────────────────────────────────
// DONORS DATA
// To add a donor: copy any entry below and fill in the fields.
// All fields except id, name, and supportType are optional.
// supportType covers money, food, accommodation, materials, volunteering, etc.
// ─────────────────────────────────────────────────────────────────────────────

export type SupportCategory =
  | 'Financial'        // cash / bank donation
  | 'Food'             // meals, groceries, supplies
  | 'Accommodation'    // housing, rooms for retreat participants
  | 'Materials'        // books, equipment, stationary, prayer items
  | 'Volunteer'        // time & skills donated
  | 'Transport'        // vehicles, fuel, travel costs
  | 'Medical'          // medicine, health support
  | 'Clothing'         // robes, clothes for monks/students
  | 'Technology'       // computers, AV equipment
  | 'Land & Property'  // donated space or property
  | 'Other';

export interface Donor {
  id: string;
  name: string;
  photo: string | null;          // profile photo URL, or null for initials avatar
  country: string;
  countryFlag: string;           // emoji flag
  supportTypes: SupportCategory[]; // can support in multiple ways
  supportDetail: string;         // human-readable description of their contribution
  contributionYear?: string;     // e.g. '2024' or '2023–2025'
  message?: string;              // optional personal message / dedication
  // Optional social links — only show what's relevant/available
  social?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
    website?: string;
  };
  // Recognition level
  recognition: 'Patron' | 'Benefactor' | 'Supporter' | 'Friend';
}

export const donors: Donor[] = [
  {
    id: 'donor-1',
    name: 'Tenzin Wangchuk',
    photo: null,
    country: 'Nepal',
    countryFlag: '🇳🇵',
    supportTypes: ['Financial', 'Accommodation'],
    supportDetail: 'Donated funds for retreat center renovation and provided free accommodation for 20 international retreat participants',
    contributionYear: '2024',
    message: 'May this support bring peace to all sentient beings. 🙏',
    recognition: 'Patron',
    social: {
      facebook: 'https://facebook.com',
    },
  },
  {
    id: 'donor-2',
    name: 'Meera Devi Sharma',
    photo: null,
    country: 'India',
    countryFlag: '🇮🇳',
    supportTypes: ['Food'],
    supportDetail: 'Sponsors vegetarian meals for all participants of the annual Ngyungne Retreat — feeding over 200 practitioners daily',
    contributionYear: '2023–2024',
    message: 'Food offered with love is the purest form of dana.',
    recognition: 'Benefactor',
    social: {
      instagram: 'https://instagram.com',
    },
  },
  {
    id: 'donor-3',
    name: 'Robert & Susan Chen',
    photo: null,
    country: 'USA',
    countryFlag: '🇺🇸',
    supportTypes: ['Financial', 'Materials'],
    supportDetail: 'Donated Dharma books, meditation cushions, and prayer materials for the RDCCK monastic school library',
    contributionYear: '2024',
    message: 'Supporting the next generation of Dharma teachers.',
    recognition: 'Benefactor',
    social: {
      website: 'https://example.com',
    },
  },
  {
    id: 'donor-4',
    name: 'Karma Yangchen',
    photo: null,
    country: 'Bhutan',
    countryFlag: '🇧🇹',
    supportTypes: ['Volunteer', 'Transport'],
    supportDetail: 'Volunteered as translator during international retreats and provided vehicle support for pilgrim transfers',
    contributionYear: '2022–2024',
    recognition: 'Supporter',
    social: {
      facebook: 'https://facebook.com',
    },
  },
  {
    id: 'donor-5',
    name: 'Ananda Gurung',
    photo: null,
    country: 'Nepal',
    countryFlag: '🇳🇵',
    supportTypes: ['Clothing'],
    supportDetail: 'Donated monk robes and winter clothing for 30 residential students at RDCCK Khenpo School',
    contributionYear: '2024',
    message: 'Clothing the sangha is clothing the Dharma.',
    recognition: 'Supporter',
    social: {},
  },
  {
    id: 'donor-6',
    name: 'Hiroshi Nakamura',
    photo: null,
    country: 'Japan',
    countryFlag: '🇯🇵',
    supportTypes: ['Financial'],
    supportDetail: 'Annual financial contribution supporting free retreat programs and meditation teacher honorariums',
    contributionYear: '2021–2024',
    message: 'The Dharma has no borders. May all beings be free.',
    recognition: 'Patron',
    social: {
      website: 'https://example.com',
    },
  },
];