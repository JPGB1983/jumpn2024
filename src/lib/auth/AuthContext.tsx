import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'firebase/auth';
import { authService } from '../services/auth/auth.service';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      const { error } = await authService.signUp(email, password);
      if (error) throw error;
      toast.success('Account created successfully!');
      return { error: null };
    } catch (error: any) {
      toast.error(error.message);
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await authService.signIn(email, password);
      if (error) throw error;
      toast.success('Welcome back!');
      return { error: null };
    } catch (error: any) {
      toast.error(error.message);
      return { error };
    }
  };

  const handleSignOut = async () => {
    try {
      await authService.signOut();
      toast.success('Signed out successfully');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user,
      loading, 
      signIn, 
      signUp, 
      signOut: handleSignOut 
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}