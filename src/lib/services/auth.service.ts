import { supabase } from '../supabase';

export const authService = {
  signIn: async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({ email, password });
  },

  signUp: async (email: string, password: string) => {
    return await supabase.auth.signUp({ email, password });
  },

  signOut: async () => {
    return await supabase.auth.signOut();
  },

  resetPassword: async (email: string) => {
    return await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });
  },

  updatePassword: async (newPassword: string) => {
    return await supabase.auth.updateUser({ password: newPassword });
  },

  onAuthStateChange: (callback: Function) => {
    return supabase.auth.onAuthStateChange(callback);
  },

  getSession: () => {
    return supabase.auth.getSession();
  }
};