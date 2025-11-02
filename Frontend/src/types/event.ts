export interface TicketType {
  type: 'VVIP' | 'VIP' | 'Regular';
  price: number;
  benefits: string[];
  available: number;
}

export interface Event {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  date: string;
  time: string;
  image: string;
  location: string;
  venue: string;
  artist?: string;
  ticketTypes: TicketType[];
  gallery: string[];
}

export interface EventRegistrationData {
  fullName: string;
  email: string;
  phone: string;
  ticketType: 'VVIP' | 'VIP' | 'Regular';
  quantity: number;
  specialRequirements?: string;
}