import { supabase } from '../supabase';
import { toast } from 'react-hot-toast';
import type { CandidateProfile, CompanyProfile } from '../../types/database';

export const profileService = {
  async saveCandidate(userId: string, profileData: Partial<CandidateProfile>) {
    try {
      const { data, error } = await supabase
        .from('candidate_profiles')
        .upsert({
          id: userId,
          ...profileData,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Error saving candidate profile:', error);
      return { data: null, error: error.message };
    }
  },

  async saveCompany(userId: string, profileData: Partial<CompanyProfile>) {
    try {
      const { data, error } = await supabase
        .from('company_profiles')
        .upsert({
          id: userId,
          ...profileData,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Error saving company profile:', error);
      return { data: null, error: error.message };
    }
  },

  async getProfile(userId: string, type: 'candidate' | 'company') {
    try {
      const table = type === 'candidate' ? 'candidate_profiles' : 'company_profiles';
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Error loading profile:', error);
      return { data: null, error: error.message };
    }
  }
};