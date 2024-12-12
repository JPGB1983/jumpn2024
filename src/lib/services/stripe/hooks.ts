import { useState, useEffect } from 'react';
import { useAuth } from '../../auth';
import { stripeApi } from './api';
import type { SubscriptionResponse } from './types';
import toast from 'react-hot-toast';

export function useSubscription() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<SubscriptionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadSubscription() {
      if (!user) return;

      try {
        const data = await stripeApi.getSubscription(user.uid);
        setSubscription(data);
        setError(null);
      } catch (err) {
        console.error('Error loading subscription:', err);
        setError(err as Error);
        toast.error('Failed to load subscription details');
      } finally {
        setIsLoading(false);
      }
    }

    loadSubscription();
  }, [user]);

  return { subscription, isLoading, error };
}