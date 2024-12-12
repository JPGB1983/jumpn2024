import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updatePassword,
  onAuthStateChanged,
  type User 
} from 'firebase/auth';
import { auth } from '../../firebase';
import toast from 'react-hot-toast';

export const authService = {
  signIn: async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { data: userCredential.user, error: null };
    } catch (error: any) {
      console.error('Signin error:', error);
      return { data: null, error };
    }
  },

  signUp: async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return { data: userCredential.user, error: null };
    } catch (error: any) {
      console.error('Signup error:', error);
      return { data: null, error };
    }
  },

  signOut: async () => {
    try {
      await firebaseSignOut(auth);
      return { error: null };
    } catch (error: any) {
      console.error('Signout error:', error);
      return { error };
    }
  },

  resetPassword: async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { error: null };
    } catch (error: any) {
      console.error('Reset password error:', error);
      return { error };
    }
  },

  updatePassword: async (newPassword: string) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No authenticated user');
      
      await updatePassword(user, newPassword);
      return { error: null };
    } catch (error: any) {
      console.error('Update password error:', error);
      return { error };
    }
  },

  onAuthStateChange: (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, callback);
  }
};