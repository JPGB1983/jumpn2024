import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';
import toast from 'react-hot-toast';

export const storageUtils = {
  async uploadProfileImage(userId: string, file: File) {
    try {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('Please upload an image file');
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('Image size should be less than 5MB');
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `profile-${Date.now()}.${fileExt}`;
      const filePath = `profile-images/${userId}/${fileName}`;
      const storageRef = ref(storage, filePath);

      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      return { path: url };
    } catch (error: any) {
      console.error('Error uploading profile image:', error);
      toast.error(error.message || 'Failed to upload profile image');
      throw error;
    }
  },

  async uploadCompanyLogo(userId: string, file: File) {
    try {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('Please upload an image file');
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('Image size should be less than 5MB');
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `logo-${Date.now()}.${fileExt}`;
      const filePath = `company-logos/${userId}/${fileName}`;
      const storageRef = ref(storage, filePath);

      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      return { path: url };
    } catch (error: any) {
      console.error('Error uploading company logo:', error);
      toast.error(error.message || 'Failed to upload company logo');
      throw error;
    }
  },

  async uploadVideo(userId: string, blob: Blob) {
    try {
      // Validate file size (50MB max)
      if (blob.size > 50 * 1024 * 1024) {
        throw new Error('Video size should be less than 50MB');
      }

      const fileName = `intro-${Date.now()}.webm`;
      const filePath = `intro-videos/${userId}/${fileName}`;
      const storageRef = ref(storage, filePath);

      await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);
      return { path: url };
    } catch (error: any) {
      console.error('Error uploading video:', error);
      toast.error(error.message || 'Failed to upload video');
      throw error;
    }
  }
};

export { storageUtils as storage };