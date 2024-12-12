import { supabase } from './supabase.service';

export const databaseService = {
  candidates: {
    createProfile: async (userId: string, profile: any) => {
      return await supabase
        .from('candidate_profiles')
        .insert([{ id: userId, ...profile }]);
    },
    updateProfile: async (userId: string, profile: any) => {
      return await supabase
        .from('candidate_profiles')
        .update(profile)
        .eq('id', userId);
    },
    getProfile: async (userId: string) => {
      return await supabase
        .from('candidate_profiles')
        .select('*')
        .eq('id', userId)
        .single();
    },
    addWorkExperience: async (userId: string, experience: any) => {
      return await supabase
        .from('work_experience')
        .insert([{ candidate_id: userId, ...experience }]);
    },
    updateWorkExperience: async (experienceId: string, updates: any) => {
      return await supabase
        .from('work_experience')
        .update(updates)
        .eq('id', experienceId);
    },
    getWorkExperience: async (userId: string) => {
      return await supabase
        .from('work_experience')
        .select('*')
        .eq('candidate_id', userId)
        .order('start_date', { ascending: false });
    },
    deleteWorkExperience: async (experienceId: string) => {
      return await supabase
        .from('work_experience')
        .delete()
        .eq('id', experienceId);
    }
  },
  companies: {
    createProfile: async (userId: string, profile: any) => {
      return await supabase
        .from('company_profiles')
        .insert([{ id: userId, ...profile }]);
    },
    updateProfile: async (userId: string, profile: any) => {
      return await supabase
        .from('company_profiles')
        .update(profile)
        .eq('id', userId);
    },
    getProfile: async (userId: string) => {
      return await supabase
        .from('company_profiles')
        .select('*')
        .eq('id', userId)
        .single();
    }
  }
};