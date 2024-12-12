import { useState, useEffect } from 'react';
import { useAuth } from '../lib/auth';
import toast from 'react-hot-toast';

export function useSubscription() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [user]);

  return { subscription, isLoading };
}