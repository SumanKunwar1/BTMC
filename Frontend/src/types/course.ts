export interface CourseCategory {
  id: string;
  title: string;
  description: string;
  image: string;
  courses: Course[];
}

export interface Course {
  categoryId: any;
  id: string;
  title: string;
  description: string;
  category: string;
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
}

export interface EnrollmentFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  preferredLanguage: string;
  message?: string;
}