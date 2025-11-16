import { Request } from 'express';
import { Document, Types } from 'mongoose';
import { IUser } from '../models/User';

// Re-export IUser for consistency
export { IUser };

export interface ICourse extends Document {
  title: string;
  description: string;
  shortDescription: string;
  duration: string;
  language: string[];
  instructor: {
    name: string;
    title: string;
    bio: string;
    image: string;
  };
  highlights: string[];
  materials: string[];
  category: string;
  image: string;
  price: number;
  enrolled: number;
  rating: number;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

export interface IEvent extends Document {
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  date: Date;
  time: string;
  venue: string;
  ticketTypes: {
    type: string;
    price: number;
    benefits: string[];
    available: number;
    sold: number;
  }[];
  gallery: string[];
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

export interface ITour extends Document {
  title: string;
  description: string;
  image: string;
  days: number;
  duration: string;
  startDate: Date;
  participants: number;
  maxParticipants: number;
  status: 'active' | 'inactive' | 'upcoming';
  highlights: string[];
  itinerary: Array<{
    day: number;
    description: string;
  }>;
  inclusions: string[];
  price: number;
  location: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IEnrollment extends Document {
  user: Types.ObjectId;
  course?: Types.ObjectId;
  tour?: Types.ObjectId;
  event?: Types.ObjectId;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  preferredLanguage: string;
  message?: string;
  status: 'pending' | 'approved' | 'rejected';
  enrollmentDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDonation extends Document {
  user: Types.ObjectId;
  type: 'One-time Donation' | 'Monthly Giving' | 'Volunteer' | 'In-Kind Donation';
  name: string;
  email: string;
  amount?: number;
  frequency?: 'one-time' | 'monthly';
  screenshot: string;
  status: 'pending' | 'verified' | 'rejected';
  submittedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthRequest extends Request {
  user?: IUser;
}

export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  message: string;
  data?: T;
  token?: string;
}

// Global type for mongoose cache
declare global {
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}