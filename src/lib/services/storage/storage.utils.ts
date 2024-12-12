import { STORAGE_LIMITS } from '../../config/constants';

export const validateImageFile = (file: File) => {
  if (!file.type.startsWith('image/')) {
    throw new Error('Please upload an image file');
  }

  if (file.size > STORAGE_LIMITS.IMAGE_MAX_SIZE) {
    throw new Error('Image size should be less than 5MB');
  }
};

export const validateVideoFile = (blob: Blob) => {
  if (blob.size > STORAGE_LIMITS.VIDEO_MAX_SIZE) {
    throw new Error('Video size should be less than 50MB');
  }
};