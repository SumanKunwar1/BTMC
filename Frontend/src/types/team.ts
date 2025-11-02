export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
}