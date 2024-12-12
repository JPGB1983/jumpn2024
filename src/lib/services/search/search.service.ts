import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import type { CandidateProfile } from '../../../types/database';
import toast from 'react-hot-toast';

interface SearchParams {
  position?: string;
  country?: string;
}

export const searchService = {
  async searchCandidates({ position, country }: SearchParams): Promise<CandidateProfile[]> {
    try {
      const candidatesRef = collection(db, 'candidate_profiles');
      const conditions = [];

      if (position) {
        conditions.push(where('role', '==', position.toLowerCase()));
      }
      
      if (country) {
        conditions.push(where('location', '==', country));
      }

      const q = query(candidatesRef, ...conditions);
      const querySnapshot = await getDocs(q);
      
      const candidates = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as CandidateProfile));

      if (candidates.length === 0) {
        toast.error('No candidates found matching your criteria');
      }

      return candidates;
    } catch (error: any) {
      console.error('Search failed:', error);
      toast.error('Failed to search candidates. Please try again.');
      return [];
    }
  }
};