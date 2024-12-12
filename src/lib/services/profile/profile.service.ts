import { db, storage } from '../../firebase';
import { 
  doc, 
  setDoc,
  getDoc,
  serverTimestamp,
  enableNetwork,
  disableNetwork
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { CompanyProfile } from '../../../types/database';
import toast from 'react-hot-toast';

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000;

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const profileService = {
  async uploadCompanyLogo(userId: string, file: File): Promise<string> {
    if (!file.type.startsWith('image/')) {
      throw new Error('Invalid file type. Please upload an image.');
    }
    
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('File size too large. Maximum size is 5MB.');
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `logo-${Date.now()}.${fileExt}`;
    const filePath = `company-logos/${userId}/${fileName}`;
    const storageRef = ref(storage, filePath);
    
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  },

  async saveCompanyProfile(
    userId: string, 
    profile: Partial<CompanyProfile>, 
    logoFile?: File
  ): Promise<boolean> {
    let retries = 0;
    
    while (retries < MAX_RETRIES) {
      try {
        let logoUrl = profile.logo_url;
        
        if (logoFile) {
          try {
            logoUrl = await this.uploadCompanyLogo(userId, logoFile);
          } catch (error) {
            console.error('Logo upload failed:', error);
            toast.error('Failed to upload logo. Profile will be saved without logo update.');
          }
        }

        const docRef = doc(db, 'company_profiles', userId);
        const now = serverTimestamp();
        
        await setDoc(docRef, {
          ...profile,
          logo_url: logoUrl,
          updated_at: now,
          created_at: profile.created_at || now
        }, { merge: true });

        toast.success('Company profile saved successfully');
        return true;

      } catch (error: any) {
        console.error(`Save attempt ${retries + 1} failed:`, error);
        
        if (error.code === 'unavailable') {
          retries++;
          if (retries < MAX_RETRIES) {
            await disableNetwork(db);
            await enableNetwork(db);
            await wait(RETRY_DELAY * retries);
            continue;
          }
        }
        
        toast.error('Failed to save profile. Please try again.');
        return false;
      }
    }

    return false;
  },

  async getCompanyProfile(userId: string): Promise<CompanyProfile | null> {
    let retries = 0;

    while (retries < MAX_RETRIES) {
      try {
        const docRef = doc(db, 'company_profiles', userId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          return { id: docSnap.id, ...docSnap.data() } as CompanyProfile;
        }
        
        return null;

      } catch (error: any) {
        console.error(`Fetch attempt ${retries + 1} failed:`, error);
        
        if (error.code === 'unavailable') {
          retries++;
          if (retries < MAX_RETRIES) {
            await disableNetwork(db);
            await enableNetwork(db);
            await wait(RETRY_DELAY * retries);
            continue;
          }
        }
        
        throw error;
      }
    }

    return null;
  }
};