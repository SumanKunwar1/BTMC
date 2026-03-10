export interface TicketType {
  type: string; // expanded from 'VVIP' | 'VIP' | 'Regular' to support any ticket name
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
  // legacy optional fields (kept for backward compatibility)
  artist?: string;
}

export interface EventRegistrationData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  ticketType: string; // expanded from union type to support any ticket name
  quantity: number;
  specialRequirements?: string;
}