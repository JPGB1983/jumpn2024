import { supabase } from '../supabase';
import { toast } from 'react-hot-toast';

export const storageService = {
  async uploadProfileImage(userId: string, file: File) {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/profile.${fileExt}`;

      const { data, error } = await supabase.storage
        .from('profile-images')
        .upload(fileName, file, { upsert: true });

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('profile-images')
        .getPublicUrl(fileName);

      return { url: publicUrl, error: null };
    } catch (error: any) {
      console.error('Error uploading profile image:', error);
      return { url: null, error: error.message };
    }
  },

  async uploadCompanyLogo(userId: string, file: File) {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/logo.${fileExt}`;

      const { data, error } = await supabase.storage
        .from('company-logos')
        .upload(fileName, file, { upsert: true });

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('company-logos')
        .getPublicUrl(fileName);

      return { url: publicUrl, error: null };
    } catch (error: any) {
      console.error('Error uploading company logo:', error);
      return { url: null, error: error.message };
    }
  }
};