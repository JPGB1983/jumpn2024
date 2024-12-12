import { 
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  query,
  where,
  orderBy,
  getDocs,
  deleteDoc,
  serverTimestamp,
  writeBatch
} from 'firebase/firestore';
import { db } from '../../firebase';
import type { CandidateProfile, CompanyProfile, WorkExperience } from '../../../types/database';
import toast from 'react-hot-toast';

export const databaseService = {
  candidates: {
    async createProfile(userId: string, profile: Partial<CandidateProfile>) {
      try {
        const docRef = doc(db, 'candidate_profiles', userId);
        const data = {
          id: userId,
          ...profile,
          created_at: serverTimestamp(),
          updated_at: serverTimestamp()
        };
        
        await setDoc(docRef, data);
        return { data, error: null };
      } catch (error: any) {
        console.error('Error creating profile:', error);
        return { data: null, error };
      }
    },

    async updateProfile(userId: string, profile: Partial<CandidateProfile>) {
      try {
        const docRef = doc(db, 'candidate_profiles', userId);
        const updates = {
          ...profile,
          updated_at: serverTimestamp()
        };

        await updateDoc(docRef, updates);
        return { data: updates, error: null };
      } catch (error: any) {
        console.error('Error updating profile:', error);
        return { data: null, error };
      }
    },

    async getProfile(userId: string) {
      try {
        const docRef = doc(db, 'candidate_profiles', userId);
        const docSnap = await getDoc(docRef);
        
        if (!docSnap.exists()) {
          return { data: null, error: null };
        }
        
        return { data: docSnap.data() as CandidateProfile, error: null };
      } catch (error: any) {
        console.error('Error getting profile:', error);
        return { data: null, error };
      }
    },

    async addWorkExperience(userId: string, experience: Partial<WorkExperience>) {
      try {
        // First, delete all existing work experience for this user
        const workExpRef = collection(db, 'work_experience');
        const q = query(workExpRef, where('candidate_id', '==', userId));
        const querySnapshot = await getDocs(q);
        
        const batch = writeBatch(db);
        querySnapshot.docs.forEach((doc) => {
          batch.delete(doc.ref);
        });
        
        // Then add the new work experience
        const newDocRef = doc(workExpRef);
        const data = {
          id: newDocRef.id,
          candidate_id: userId,
          ...experience,
          created_at: serverTimestamp()
        };

        batch.set(newDocRef, data);
        await batch.commit();

        return { data, error: null };
      } catch (error: any) {
        console.error('Error adding work experience:', error);
        return { data: null, error };
      }
    },

    async getWorkExperience(userId: string) {
      try {
        const workExpRef = collection(db, 'work_experience');
        const q = query(
          workExpRef, 
          where('candidate_id', '==', userId),
          orderBy('start_date', 'desc')
        );
        
        const querySnapshot = await getDocs(q);
        const experiences = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as WorkExperience[];
        
        return { data: experiences, error: null };
      } catch (error: any) {
        console.error('Error getting work experience:', error);
        return { data: null, error };
      }
    },

    async updateWorkExperience(experienceId: string, updates: Partial<WorkExperience>) {
      try {
        const docRef = doc(db, 'work_experience', experienceId);
        await updateDoc(docRef, updates);
        return { data: updates, error: null };
      } catch (error: any) {
        console.error('Error updating work experience:', error);
        return { data: null, error };
      }
    },

    async deleteWorkExperience(experienceId: string) {
      try {
        const docRef = doc(db, 'work_experience', experienceId);
        await deleteDoc(docRef);
        return { error: null };
      } catch (error: any) {
        console.error('Error deleting work experience:', error);
        return { error };
      }
    }
  },

  companies: {
    async createProfile(userId: string, profile: Partial<CompanyProfile>) {
      try {
        const docRef = doc(db, 'company_profiles', userId);
        const data = {
          id: userId,
          ...profile,
          created_at: serverTimestamp(),
          updated_at: serverTimestamp()
        };
        
        await setDoc(docRef, data);
        return { data, error: null };
      } catch (error: any) {
        console.error('Error creating company profile:', error);
        return { data: null, error };
      }
    },

    async updateProfile(userId: string, profile: Partial<CompanyProfile>) {
      try {
        const docRef = doc(db, 'company_profiles', userId);
        const updates = {
          ...profile,
          updated_at: serverTimestamp()
        };

        await updateDoc(docRef, updates);
        return { data: updates, error: null };
      } catch (error: any) {
        console.error('Error updating company profile:', error);
        return { data: null, error };
      }
    },

    async getProfile(userId: string) {
      try {
        const docRef = doc(db, 'company_profiles', userId);
        const docSnap = await getDoc(docRef);
        
        if (!docSnap.exists()) {
          return { data: null, error: null };
        }
        
        return { data: docSnap.data() as CompanyProfile, error: null };
      } catch (error: any) {
        console.error('Error getting company profile:', error);
        return { data: null, error };
      }
    }
  }
};