import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';
import { STORAGE_LIMITS } from '../../config/constants';
import toast from 'react-hot-toast';

export const storageService = {
  uploadProfileImage: async (userId: string, file: File) => {
    try {
      if (!file.type.startsWith('image/')) {
        throw new Error('Please upload an image file');
      }

      if (file.size > STORAGE_LIMITS.IMAGE_MAX_SIZE) {
        throw new Error('Image size should be less than 5MB');
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `profile-${Date.now()}.${fileExt}`;
      const filePath = `profile-images/${userId}/${fileName}`;
      const storageRef = ref(storage, filePath);

      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      
      return { url, error: null };
    } catch (error: any) {
      console.error('Error uploading profile image:', error);
      return { url: null, error: error.message };
    }
  },

  uploadCompanyLogo: async (userId: string, file: File) => {
    try {
      if (!file.type.startsWith('image/')) {
        throw new Error('Please upload an image file');
      }

      if (file.size > STORAGE_LIMITS.IMAGE_MAX_SIZE) {
        throw new Error('Image size should be less than 5MB');
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `logo-${Date.now()}.${fileExt}`;
      const filePath = `company-logos/${userId}/${fileName}`;
      const storageRef = ref(storage, filePath);

      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      
      return { url, error: null };
    } catch (error: any) {
      console.error('Error uploading company logo:', error);
      return { url: null, error: error.message };
    }
  },

  uploadVideo: async (userId: string, blob: Blob) => {
    try {
      if (blob.size > STORAGE_LIMITS.VIDEO_MAX_SIZE) {
        throw new Error('Video size should be less than 50MB');
      }

      const fileName = `intro-${Date.now()}.webm`;
      const filePath = `intro-videos/${userId}/${fileName}`;
      const storageRef = ref(storage, filePath);

      const snapshot = await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(snapshot.ref);
      
      return { url, error: null };
    } catch (error: any) {
      console.error('Error uploading video:', error);
      return { url: null, error: error.message };
    }
  }
};