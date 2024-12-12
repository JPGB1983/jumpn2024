export interface Database {
  public: {
    Tables: {
      candidate_profiles: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          role?: string;
          linkedin_url?: string;
          profile_image_url?: string;
          video_url?: string;
          key_points?: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name: string;
          email: string;
          role?: string;
          linkedin_url?: string;
          profile_image_url?: string;
          video_url?: string;
          key_points?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          full_name?: string;
          email?: string;
          role?: string;
          linkedin_url?: string;
          profile_image_url?: string;
          video_url?: string;
          key_points?: string[];
          updated_at?: string;
        };
      };
      work_experience: {
        Row: {
          id: string;
          candidate_id: string;
          company: string;
          role: string;
          location: string;
          website?: string;
          start_date: string;
          end_date?: string;
          description?: string;
          created_at: string;
        };
        Insert: {
          candidate_id: string;
          company: string;
          role: string;
          location: string;
          website?: string;
          start_date: string;
          end_date?: string;
          description?: string;
          created_at?: string;
        };
        Update: {
          company?: string;
          role?: string;
          location?: string;
          website?: string;
          start_date?: string;
          end_date?: string;
          description?: string;
        };
      };
      company_profiles: {
        Row: {
          id: string;
          name: string;
          email: string;
          website?: string;
          description?: string;
          industry?: string;
          size?: string;
          location?: string;
          address?: string;
          logo_url?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          email: string;
          website?: string;
          description?: string;
          industry?: string;
          size?: string;
          location?: string;
          address?: string;
          logo_url?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          email?: string;
          website?: string;
          description?: string;
          industry?: string;
          size?: string;
          location?: string;
          address?: string;
          logo_url?: string;
          updated_at?: string;
        };
      };
    };
  };
}