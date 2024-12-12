import { supabase } from '../supabase.service';
import type { CandidateProfile, WorkExperience } from '../../../types/database';

export const candidatesService = {
  createProfile: async (userId: string, profile: Partial<CandidateProfile>) => {
    return await supabase
      .from('candidate_profiles')
      .insert([{ id: userId, ...profile }])
      .select()
      .single();
  },

  updateProfile: async (userId: string, profile: Partial<CandidateProfile>) => {
    return await supabase
      .from('candidate_profiles')
      .update(profile)
      .eq('id', userId)
      .select()
      .single();
  },

  getProfile: async (userId: string) => {
    return await supabase
      .from('candidate_profiles')
      .select('*')
      .eq('id', userId)
      .single();
  },

  addWorkExperience: async (userId: string, experience: Partial<WorkExperience>) => {
    return await supabase
      .from('work_experience')
      .insert([{ candidate_id: userId, ...experience }])
      .select()
      .single();
  },

  updateWorkExperience: async (experienceId: string, updates: Partial<WorkExperience>) => {
    return await supabase
      .from('work_experience')
      .update(updates)
      .eq('id', experienceId)
      .select()
      .single();
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
};