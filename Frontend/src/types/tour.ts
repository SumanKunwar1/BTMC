export interface Tour {
  id: string;
  title: string;
  days: number;
  image: string;
  description: string;
  highlights: string[];
  activities: string[];
  inclusions: string[];
  itinerary: { day: number; description: string }[];
}

export interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  participants: number;
  specialRequests?: string;
}