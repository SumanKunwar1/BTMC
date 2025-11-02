import { LucideIcon } from 'lucide-react';

export interface SupportWay {
  icon: LucideIcon;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  benefits: string[];
}

export interface DonationFormData {
  name: string;
  email: string;
  amount: string;
  frequency: 'one-time' | 'monthly';
}