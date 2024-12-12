import { supabase } from '../supabase.service';
import type { CompanyProfile } from '../../../types/database';

export const companiesService = {
  createProfile: async (userId: string, profile: Partial<CompanyProfile>) => {
    return await supabase
      .from('company_profiles')
      .insert([{ id: userId, ...profile }])
      .select()
      .single();
  },

  updateProfile: async (userId: string, profile: Partial<CompanyProfile>) => {
    return await supabase
      .from('company_profiles')
      .update(profile)
      .eq('id', userId)
      .select()
      .single();
  },

  getProfile: async (userId: string) => {
    return await supabase
      .from('company_profiles')
      .select('*')
      .eq('id', userId)
      .single();
  }
};