export interface PersonalProfile {
  fullName: string;
  dob: string;
  contactNumber: string;
  address: string;
  gender: string;
}

export interface UserProfile {
  education: string;
  location: string;
  skills: string;
  interests: string;
}

export interface Internship {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  requiredSkills: string[];
  sector: string;
  deadline: string; // YYYY-MM-DD format
}
