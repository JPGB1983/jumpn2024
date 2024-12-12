// Firebase Timestamp type
export interface Timestamp {
  seconds: number;
  nanoseconds: number;
}

// Base profile interface
interface BaseProfile {
  id: string;
  email: string;
  created_at: Timestamp;
  updated_at: Timestamp;
}

// Candidate related types
export interface Milestone {
  title: string;
  description: string;
  date: string;
  type: 'achievement' | 'award' | 'certification' | 'publication';
}

export interface WorkExperience {
  id: string;
  candidate_id: string;
  company: string;
  role: string;
  location: string;
  website?: string;
  start_date: string;
  end_date?: string;
  description?: string;
  currentlyWorking?: boolean;
  created_at: string;
}

export interface CandidateProfile extends BaseProfile {
  full_name: string;
  role?: string;
  location: string;
  linkedin_url?: string;
  profile_image_url?: string;
  video_url?: string;
  key_points?: string[];
  milestones?: Milestone[];
  work_experience?: WorkExperience[];
}

// Company related types
export interface CompanyProfile extends BaseProfile {
  name: string;
  website?: string;
  description?: string;
  industry?: string;
  size?: string;
  location?: string;
  address?: string;
  logo_url?: string;
  founded_date?: string;
  stripe_customer_id?: string;
}